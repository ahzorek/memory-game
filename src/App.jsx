import './App.css'
import Tiles from './components/tiles'

import seed from './utils/itemsSeed'
import shuffledPairs from './utils/shuffledPairs'

function App() {
  const gameItems = shuffledPairs(seed)
  
  return (
    <div className="App">
      {/* <h1>Memory Game</h1> */}
      <div className="group">
        {!gameItems ? "Loading..." : <Tiles items={gameItems}/>}
      </div>
    </div>
  )
}

export default App
