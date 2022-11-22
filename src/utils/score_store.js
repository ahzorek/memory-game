import { atom } from 'jotai'

const scoreState = atom({
  turnsTaken: 0,
  pointsGiven: 100,
  correct: 0,
  totalPoints: 0
})

export {scoreState}