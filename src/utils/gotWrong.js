export default function gotWrong(firstValue, secondValue, audio) {
  audio.play()
  
  //alert("You got that TERRIBLY WRONG!")

  firstValue.className = 'hidden cards'
  secondValue.className = 'hidden cards'
  firstValue.disabled = false
  secondValue.disabled = false
}