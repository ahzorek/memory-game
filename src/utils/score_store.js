import { atom } from 'jotai'

const turns = atom(0)
const pointsAtt = atom(100)
const completed = atom(0)
const pointsAgg = atom(0)

const scoreState = atom({
  turnsTaken: 0,
  pointGiven: 100,
  correct: 0,
  totalPoints: 0
})

export {turns, pointsAtt, completed, pointsAgg, scoreState}