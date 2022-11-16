import React, {useState} from 'react';
import '../App.css'

const Tiles = ({items}) => {
  const [game, setGame] = useState({
    state: "idle",
    value1: null,
    address: null
  })

  function clearGame() {
    setGame({
      state: "idle",
      value1: null,
      address: null
    })
  }

  function firstPass(v1) {
    console.log("RUNNING ON THE FIRST PASS: ", v1)
      v1.className = 'cards selected_card'
      v1.disabled = true
      setGame({
        state: "ongoing",
        value1: v1.value,
        address: v1
      })
  }

  function gotRight(v1, v2) {
    alert("You got that RIGHT!")
    v1.className = 'cards correct_card'
    v2.className = 'cards correct_card'
    v1.disabled = true
    v2.disabled = true
  }

  function gotWrong(v1, v2) {
    alert("You got that WRONG!")
    v1.className = 'hideagain cards'
    v2.className = 'hideagain cards'
    v1.disabled = false
    v2.disabled = false
  }


  function handleGameLogic(e) {
    if (game.state === "idle") {
      firstPass(e.target)
    }
    else if (game.state === "ongoing") {
      e.target.className = 'cards selected_card'
      setTimeout(() => {
        if(e.target.value === game.value1) {
          gotRight(e.target, game.address)
          clearGame()
        }
        else {
          console.log(e.target, game.address)
          gotWrong(e.target, game.address)
          clearGame()
        }
      }, 200);

    }
  }

  return (
    <div className='tiles'>
        {
          items.map(({title}, index) => {
            return (
              <button
                onClick={(e) => handleGameLogic(e)}
                value={title.toLowerCase()}
                key={`__${title}__${index}`}
                className='start cards'
              >
                {/* <h3>{title}</h3> */}
                <img src={`/${title.toLowerCase()}.jpg`} />
              </button>  
            )
          })
        }
      </div>
  )
}

export default Tiles;
