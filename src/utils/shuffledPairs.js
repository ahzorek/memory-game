export default function shuffledPairs(items) {   
    const dupeIt = [...items, ...items]
    const shuffled = dupeIt.sort(() => Math.random() - 0.5)
    const withNumId = shuffled.map ((each, index) => {
      return ({
        ...each,
        numId: index,
        isShowingCard: false,
        isCompletedCard: false
      })
    })

    return withNumId
  }