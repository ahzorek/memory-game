import { useAtom } from 'jotai'
import { useState } from 'react'

import Tiles from './components/tiles'
import seed from './utils/itemsSeed'
import shuffledPairs from './utils/shuffledPairs'
import ScoreScreen from './components/scoreScreen'
import { Score } from './components/score'
import { isFinished } from './utils/finished_store'

import './App.css'

function App() {
  const [finished, setFinished] = useAtom(isFinished)

  const gameItems = shuffledPairs(seed)
  
  return (
    <div className="App">
      <h1>Memory 🧠</h1>
      <Score/>
      <div className="group">
        {!gameItems ? "Loading..." : <Tiles items={gameItems} />}
      </div>
      {/* <button onClick={() => setFinished(true)} >test me</button> */}
      { finished ?   <div className="overlay"><ScoreScreen/></div> :   null }
    </div>
  )
}

export default App
