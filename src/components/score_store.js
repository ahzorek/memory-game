import { atom } from 'jotai'

const turns = atom(0)
const pointsAtt = atom(100)
const completed = atom(0)
const pointsAgg = atom(0)

export {turns, pointsAtt, completed, pointsAgg}