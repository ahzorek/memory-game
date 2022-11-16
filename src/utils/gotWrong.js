export default function gotWrong(firstValue, secondValue) {
  //alert("You got that TERRIBLY WRONG!")
  
  const audio = new Audio("./negative.wav")
  audio.play()

  firstValue.className = 'hidden cards'
  secondValue.className = 'hidden cards'
  firstValue.disabled = false
  secondValue.disabled = false
}