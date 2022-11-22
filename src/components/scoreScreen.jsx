import { useAtom } from 'jotai'
import { useState, useEffect } from 'react'
import { scoreState } from '../utils/score_store'

import { DisplayScoreBoard } from './displayScoreBoard'

const ScoreScreen = () =>{  
  const [score] = useAtom(scoreState)
  const [scoreBoard, setScoreboard] = useState([])

  useEffect(() => {
    const getScoreboard = async () => {
      const __board = await fetchScoreBoard()
      setScoreboard(__board)
    }
    getScoreboard()
    return () => {}
  }, [])


  async function fetchScoreBoard(){
    const url = "https://main--beamish-palmier-c6a0bb.netlify.app/.netlify/functions/score_board"
    //const dev__url = "http://localhost:8888/.netlify/functions/score_board"
    const res = await fetch(url)
    const body = await res.json()
    return body.data
  }
  
  return (
    <>  
      <div>
        <h1>Parabéns! 😄</h1>
        <h2>Você marcou {score.totalPoints} pontos em {score.turnsTaken} tentativas.</h2>
      </div>
      <DisplayScoreBoard scoreBoardData={scoreBoard}/>
      {}
      {}
    </>
  )
}

export default ScoreScreen        

