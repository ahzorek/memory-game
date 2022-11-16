import React, { useState } from 'react'
import gotRight from '../utils/gotRight.js'
import gotWrong from '../utils/gotWrong.js'



const Tiles = ({items}) => {
  const [game, setGame] = useState({
    state: "idle",
    comparingValue: null,
    address: null
  })

const positive = new Audio("./positive.wav")
const negative = new Audio("./negative.wav")

  const positive = new Audio("./positive.wav")


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
      setTimeout(() => {
        if(e.target.value === game.comparingValue) {
          gotRight(e.target, game.address, positive)
        }else {
          gotWrong(e.target, game.address, negative)
        }
      }, 200)
      clearGame()
    }
  }

  return (
    <div className='tiles'>
        {items.map(({title}, index) => {
            return (
              <button
                onClick={(e) => handleGameLogic(e)}
                value={title.toLowerCase()}
                key={`__${title.toLowerCase()}__${index}`}
                className='start cards'
              >
                <img src={`/${title.toLowerCase()}.jpg`} />
              </button>  
            )
          })}
      </div>
  )
}

export default Tiles
