import { Form, useLoaderData } from "@remix-run/react";
import {json, LoaderArgs, ActionArgs} from "@remix-run/node"

import { createSupabaseServerClient } from "~/utils/supabase.server";
import {Login} from "~/components/Login";
import { RealTimeMessages } from "~/components/RealTimeMessages";

//Loader de datos en el SERVER
export const loader = async ({ request }: LoaderArgs) => {
  const response = new Response()
  const supabase = createSupabaseServerClient({ request, response })
  const { data } = await supabase.from('messages').select()
  return json({ messages: data ?? [] }, {headers: response.headers})
}

//action es la funcion que se ejecuta cuando
//se hace submit en el formulario del componente
export const action = async ({request }: ActionArgs) => {
  const response = new Response()
  const supabase = createSupabaseServerClient({request, response})

  const formData = await request.formData()
  const {message} = Object.fromEntries(formData)

  await supabase.from('messages').insert({content: String(message)})

  return json({message: 'ok'}, {headers: response.headers})
}


export default function Index() {
  const {messages} = useLoaderData<typeof loader>()

  return (
    <main>
      <h1>Retrochat</h1>
      <Login />


      <Form method="post">
        <input type='text' name="message" />
        <button type="submit">Enviar mensaje</button>
      </Form>


      <RealTimeMessages serverMessages={messages} />
    </main>
  );
}
