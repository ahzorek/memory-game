import Tiles from './components/tiles'
import seed from './utils/itemsSeed'
import shuffledPairs from './utils/shuffledPairs'

import './App.css'
import { Score } from './components/score'

//import SupaButton from './components/supabase_check'

function App() {
  const gameItems = shuffledPairs(seed)
  
  return (
    <div className="App">
      <h1>Memory 🧠</h1>
      <Score/>
      <div className="group">
        {!gameItems ? "Loading..." : <Tiles items={gameItems}/>}
      </div>
      {/* <SupaButton/> */}
    </div>
  )
}

export default App
