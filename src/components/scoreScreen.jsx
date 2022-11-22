import { useAtom } from 'jotai'
import { scoreState } from '../utils/score_store'

const ScoreScreen = () =>{
  const [score, setScoreState] = useAtom(scoreState)

  return <h1>Parabéns! Você marcou {score.totalPoints} pontos em {score.turnsTaken} tentativas!</h1>
}

export default ScoreScreen