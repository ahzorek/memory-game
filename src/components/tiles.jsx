import React, { useState } from 'react'

const Tiles = ({items}) => {
  const [game, setGame] = useState({
    state: "idle",
    comparingValue: null,
    address: null
  })

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

  function gotRight(firstValue, secondValue) {
    alert("You got that RIGHT!")

    firstValue.className = 'cards correct_card'
    secondValue.className = 'cards correct_card'
    firstValue.disabled = true
    secondValue.disabled = true
  }

  function gotWrong(firstValue, secondValue) {
    alert("You got that WRONG!")

    firstValue.className = 'hidden cards'
    secondValue.className = 'hidden cards'
    firstValue.disabled = false
    secondValue.disabled = false
  }

  function handleGameLogic(e) {
    if (game.state === "idle") {
      selectFirst(e.target)
      return
    } else if (game.state === "ongoing") {
      e.target.className = 'cards selected_card'
      setTimeout(() => {
        if(e.target.value === game.comparingValue) {
          gotRight(e.target, game.address)
        }else {
          gotWrong(e.target, game.address)
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
