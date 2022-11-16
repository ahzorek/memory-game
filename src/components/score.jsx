import { useAtom } from 'jotai'

import { turns, pointsAtt, completed, pointsAgg } from './score_store'

export function Score() {
  const [t, setTurns] = useAtom(turns)
  const [p, setPoints] = useAtom(pointsAtt)
  const [c, setCompleted] = useAtom(completed)
  const [pX, setPointsAgg] = useAtom(pointsAgg)

  return (
    <div style={{display: 'flex', gap: '1rem', justifyContent: 'space-around'
    }}>
      <span>turns: {t}</span>
      <span>value-points: {p}</span>
      <span>completed: {c}</span>
      <span>total-points: {pX}</span>
    </div>
  )
}