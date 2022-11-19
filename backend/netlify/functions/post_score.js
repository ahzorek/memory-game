import { createClient } from '@supabase/supabase-js'

  const URL = process.env.SUPABASE_PROJECT_URL
  const KEY = process.env.SUPABASE_PROJECT_KEY

  const supabase = createClient(URL, KEY)

exports.handler = async (event, context) => {
  try {
    const ip_address = event.headers['client-ip']
    const body = JSON.parse(event.body)

    const newScore = {
      name: body.name,
      score: body.score,
      ip_address
    }
    console.log("POSTING: " + newScore)

    const { error } = await supabase
      .from('memory-game-scoreboard')
      .insert(newScore)
    
      return { statusCode: 200, body: JSON.stringify({ newScore }) }   
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed posting data' }),
    }
  }
}