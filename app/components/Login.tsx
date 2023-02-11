import { useSupabase } from "~/hooks/useSupabase"

export function Login(){
    const supabase = useSupabase()
    
    const handleLogOut = async () =>{
        const {error} = await supabase.auth.signOut()
        if(error) console.log('Error al cerrar sesión', error)
    }

    const handleLogIn = async () => {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: 'github'
        })
        if(error) console.log('Error al iniciar sesión', error)
    }

    return (
        <div style={{display: 'flex', gap: '12px'}}>
            <button onClick={handleLogIn}>Iniciar sesión</button>
            <button onClick={handleLogOut}>Cerrar sesión</button>
        </div>
    )
}