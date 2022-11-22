import { createClient } from '@supabase/supabase-js'

  const URL = process.env.SUPABASE_PROJECT_URL
  const KEY = process.env.SUPABASE_PROJECT_KEY

  const supabase = createClient(URL, KEY)

    const headers = {
    "Access-Control-Allow-Origin": "*", 
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
    "Access-Control-Allow-Methods" : "POST"
  }

exports.handler = async (event, context) => {
  try {
    const ip_address = event.headers['client-ip']
    const body = JSON.parse(event.body)

    const newScore = {
      name: body.name,
      score: body.score,
      ip_address,
      turns_taken: body.turns_taken
    }
    console.log("POSTING: " + newScore)

    const { error } = await supabase
      .from('memory-game-scoreboard')
      .insert(newScore)
    
      return { statusCode: 200, headers }   
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed posting data' }),
      headers
    }
  }
}