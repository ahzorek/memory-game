export default function shuffledPairs(items) {
    const dupeIt = [...items, ...items]
    const shuffled = dupeIt.sort(() => Math.random() - 0.4)
    return shuffled
  }