import { useAtom } from 'jotai'
import { scoreState } from '../utils/score_store'

export function Score() {
  const [score] = useAtom(scoreState)

  return (
      <div className='wrapper_score'>
        <div>
          <h2>Tentativas</h2>
          <div>{score.turnsTaken}</div>
        </div>
        <div>
          <h2>Valendo</h2>
          <div>{score.pointsGiven}</div>
        </div>
        <div>
          <h2>Corretas</h2>
          <div>{score.correct} / 8</div>
        </div>
        <div>
          <h2>Pontos</h2>
          <div>{score.totalPoints}</div>
        </div>
      </div>

  )
}
