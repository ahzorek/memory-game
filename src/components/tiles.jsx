import React, { useState, useEffect } from 'react'
import gotRight from '../utils/gotRight.js'
import gotWrong from '../utils/gotWrong.js'
import { useAtom } from 'jotai'
import { scoreState } from '../utils/score_store.js'
import { isFinished } from '../utils/finished_store.js'

const Tiles = ({items}) => {
  //LOAD SOUNDS
  const positive = new Audio("./positive.wav")
  const negative = new Audio("./negative.wav")
  const success = new Audio("./success.wav")

  //INITIALIZE ATOM STATES
  const [mainScoreState, setScoreState] = useAtom(scoreState)
  const [finished, setAsFinished] = useAtom(isFinished)

  //INITIALIZE GAME OBJECT STATE
  const [game, setGame] = useState({
    isStart: true,
    state: "idle",
    comparingValue: null,
    comparingValueIndex: null,
    address: null
  })
  
  //CHANGES CARDS INITIAL STATE AFTER 5SEC
  useEffect(() => {
    setTimeout(() => {
      setGame(prev => ({
        ...prev,
        isStart: false
      }))
    }, 4800)
    return () => {
    //cleanup
    }
  }, [])
  
  //FLIP CARD (toggle action)
  const flipCard = (ref, prop) => {
    const cardId = items[ref]
    cardId[prop] = !cardId[prop]
  }

  //INCREASES SCORE WHEN RIGHT
  const handleScoreState = (key, value) => {
    setScoreState(prev => ({
    ...prev,
    [key]: prev[key] + value
    }))
  }

  //CLEARS GAME BETWEEN ROUNDS
  const clearGame = (status) => {
    setGame({
      state: status,
      comparingValue: null,
      comparingValueIndex: null,
      address: null
    })
  }

  //CHOOSES FIRST CARD IN NEW ROUND
  const selectFirst = (firstPick) => {
    //firstPick.className = 'cards selected_card'
    firstPick.disabled = true

    flipCard(firstPick.id, 'isShowingCard')
    
    setGame({
      state: "ongoing",
      comparingValue: firstPick.value,
      comparingValueIndex: firstPick.id,
      address: firstPick
    })
  }
     
  //STARTING GAME LOGIC
  function handleGameLogic(e) {
    if (game.state === "idle") {
    // STARTING NEW ROUND
      selectFirst(e.target)
      return

    } else if (game.state === "ongoing") {
      // SECOND CARD IS PICK

        const prevValue = game.comparingValueIndex
        const currValue = e.target.id
        const arrValues = [prevValue, currValue]
        
        flipCard(currValue, 'isShowingCard')
        handleScoreState('turnsTaken', 1)

        //INITIATE TIMED COMPARE
        setTimeout(() => {
          
          if(e.target.value === game.comparingValue) {

            //SECOND CARD IS CORRECT
            gotRight(e.target, game.address, positive)
            arrValues.map(v => {
              flipCard(v, 'isCompletedCard')
            })

            handleScoreState('correct', 1)
            handleScoreState('totalPoints', mainScoreState.pointsGiven)
            
          } else {

            //SECOND CARD IS INCORRECT

            arrValues.map(v => flipCard(v, 'isShowingCard'))

            gotWrong(e.target, game.address, negative)
            setScoreState(p => ({
              ...p,
              pointsGiven: p.pointsGiven === 10 ? p.pointsGiven : p.pointsGiven - 10
            }))
            
          }
          clearGame("idle")
        }, 250)
    }
  }

  if(!finished){
    if(mainScoreState.correct === 8){    
      setTimeout(() => {
        setAsFinished(true)
        success.play()
      }, 330)  
    }
  }
  return (
    <div className='tiles'>
        {items.map(({title, isShowingCard, isCompletedCard, numId}) => {
          
          let cssClassName;

          if (finished || (isShowingCard && isCompletedCard)) {
             cssClassName = 'cards correct_card'
          } else if (isShowingCard && !isCompletedCard) {
              cssClassName = 'cards selected_card'
          } else if (!isShowingCard && !isCompletedCard && !game.isStart) {
              cssClassName = 'hidden cards'
          } else { cssClassName = 'start cards' }

          const slug = title.toLowerCase()
            return (
              <button
                onClick={e => handleGameLogic(e)}
                id={numId}
                value={slug}
                key={`__${slug}-${numId}`}
                className={cssClassName}
              >
                <img src={`/${slug}.jpg`} />
              </button>  
            )
          })}
      </div>
  )
}

export default Tiles
