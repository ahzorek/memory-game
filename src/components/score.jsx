import { useAtom } from 'jotai'

import { turns, pointsAtt, completed, pointsAgg, scoreState } from '../utils/score_store'

export function Score() {
  const [t, setTurns] = useAtom(turns)
  const [p, setPoints] = useAtom(pointsAtt)
  const [c, setCompleted] = useAtom(completed)
  const [pX, setPointsAgg] = useAtom(pointsAgg)
  const [score, setScoreState] = useAtom(scoreState)

  function handlePropery(key, value){
    setScoreState(p => ({
      ...p,
      [key]: p[key] + value
    }))
  }

  return (
    <>
      <div style={{display: 'flex', gap: '1rem', justifyContent: 'space-around'}}>
        <span>turns: {t}</span>
        <span>value-points: {p}</span>
        <span>completed: {c}</span>
        <span>total-points: {pX}</span>
      </div>
      {/* <div style={{display: 'flex', gap: '1rem', justifyContent: 'space-around'}}>
        {JSON.stringify(score)}

        <button onClick={() => setScoreState(prev => ({
          ...prev,
          correct: prev.correct + 2
        }))} >MESS WITH THE SCORE OBJECT</button>
        <button onClick={() => handlePropery('correct', -5)} >MESS WITH THE SCORE OBJECT a little more</button>
      </div> */}


    </>

  )
}