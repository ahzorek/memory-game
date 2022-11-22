import { useAtom } from 'jotai'
import { scoreState } from '../utils/score_store'
import { useState } from 'react'

export function DisplayScoreBoard ({scoreBoardData}) {
    const [score] = useAtom(scoreState)
    const [playerName, setPlayer] = useState('')
    const [buttonText, setButtonText] = useState('ENVIAR PONTUAÇÃO')
    const [postCompleted, setPostCompleted] = useState(false)

    if(!scoreBoardData.length) { return <div>não há nada para se exibir</div>}
    
    const newScore = {
      id: 'new__data',
      name: playerName,
      score: score.totalPoints,
      turns_taken: score.turnsTaken
    }
    const withNewScores = [...scoreBoardData, newScore ].sort((a, b) => a.score - b.score).reverse()

    function testName(name){
      const regName = /^[a-zA-Z]+$/
      if(name.length >= 3){
        if(regName.test(playerName)){
          return false
        }
      } else return true
    }

    async function handleSubmit(){
      setPostCompleted(true)
      const url = "https://main--beamish-palmier-c6a0bb.netlify.app/.netlify/functions/post_score"
      const dev__url = "http://localhost:8888/.netlify/functions/post_score"
      const settings = {
        method: 'POST',
        body: JSON.stringify(newScore)
    }
      try {
        const fetchResponse = await fetch(url, settings);
        console.log(fetchResponse.statusText)
        setButtonText("ENVIADO")
    } catch (e) {
        console.error("ERRO AQUI:: " + e)
        setPostCompleted(false)

    } 
  }

  function refresh(){
    window.location.reload();
  }

    return (
        <>
          <table>
            <thead>
              <tr>
                <th>Jogador</th>
                <th>Pontos</th>
                <th>Tentativas</th>
              </tr>
            </thead>
            <tbody>
              {withNewScores.map(({name, score, turns_taken, id}) => {
                return (
                  <tr key={id} className={id === 'new__data' ? 'new_entry' : 'api_entries'}>
                    <td>{id === 'new__data'  
                          ? <input 
                              onChange={(e) => setPlayer(e.target.value)}
                              placeholder='Insira seu nome' 
                              value={playerName}
                              type="text"
                            />
                          : name
                        }
                    </td>
                    <td>{score}</td>
                    <td>{turns_taken}</td>
                  </tr>
                  )
                })}
            </tbody>
          </table>
          <div>
            <button 
              className='button send'
              disabled={testName(playerName) || postCompleted } 
              onClick={handleSubmit}
            >
              {buttonText}
            </button>
            <button onClick={refresh} className='button reset'>REINICIAR</button>

          </div>
        </>

    )     
   }