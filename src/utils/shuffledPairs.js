export default function shuffledPairs(items) {
    let dupeIt = [...items, ...items]
    let shuffled = dupeIt.sort(() => Math.random() - 0.5)
    return shuffled
  }