import React, { useState } from 'react'
import gotRight from '../utils/gotRight.js'
import gotWrong from '../utils/gotWrong.js'
import { useAtom } from 'jotai'
import { turns, completed, pointsAtt, pointsAgg } from './score_store.js'

const Tiles = ({items}) => {
  const [t, setTurns] = useAtom(turns)
  const [c, setCompleted] = useAtom(completed)
  const [p, setPoints] = useAtom(pointsAtt)
  const [pX, setPointsAgg] = useAtom(pointsAgg)


  const [game, setGame] = useState({
    state: "idle",
    comparingValue: null,
    address: null
  })

const positive = new Audio("./positive.wav")
const negative = new Audio("./negative.wav")

  function clearGame() {
    setGame({
      state: "idle",
      comparingValue: null,
      address: null
    })
  }

  function selectFirst(firstValue) {
    firstValue.className = 'cards selected_card'
    firstValue.disabled = true
    setGame({
      state: "ongoing",
      comparingValue: firstValue.value,
      address: firstValue
    })
  }

  function handleGameLogic(e) {
    if (game.state === "idle") {
      selectFirst(e.target)
      return
    } else if (game.state === "ongoing") {
      e.target.className = 'cards selected_card'

      setTurns(t => t+1)

      setTimeout(() => {
        if(e.target.value === game.comparingValue) {
          gotRight(e.target, game.address, positive)
          setCompleted(c => c + 1)
          setPointsAgg(pX => pX + p)
        }else {
          gotWrong(e.target, game.address, negative)
          setPoints((p) => p === 10 ? p : p -10)
        }
      }, 300)
      clearGame()
    }
  }

  return (
    <div className='tiles'>
        {items.map(({title}, index) => {
          const slug = title.toLowerCase()
            return (
              <button
                onClick={e => handleGameLogic(e)}
                value={slug}
                key={`__${slug}-${index}`}
                className='start cards'
              >
                <img src={`/${slug}.jpg`} />
              </button>  
            )
          })}
      </div>
  )
}

export default Tiles
