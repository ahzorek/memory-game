import { createClient } from '@supabase/supabase-js'

export default function SupaButton(){

  const URL = import.meta.env.VITE_SUPABASE_PROJECT_URL
  const KEY = import.meta.env.VITE_SUPABASE_PROJECT_KEY

  const supabase = createClient(URL, KEY)

  async function sendInfoHome(){
    const { error } = await supabase
      .from('memory-game-scoreboard')
      .insert({ name: 'marco polo', score: 450, ip_address: '0.0.0.0' })
      console.error(error)
    return 
  }

  async function callHome(){
    const { data, error } = await supabase
      .from('memory-game-scoreboard')
      .select()
      console.log(data)
  }
  return (
    <>
      <button onClick={callHome}>GET</button>
      <button onClick={sendInfoHome}>SEND</button>
    </>
  ) 
}