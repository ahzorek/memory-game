import { createClient } from '@supabase/supabase-js'

  const URL = process.env.SUPABASE_PROJECT_URL
  const KEY = process.env.SUPABASE_PROJECT_KEY

  const supabase = createClient(URL, KEY)

exports.handler = async (event, context) => {
  try {
    const { data, error } = await supabase
      .from('memory-game-scoreboard')
      .select()
      .order('score', { ascending: false })

      if(error){ return { statusCode: 500, body: JSON.stringify({ error: 'Failed fetching data' })} }

      return { statusCode: 200, body: JSON.stringify({ data }) }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    }
  }
}