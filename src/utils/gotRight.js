export default function gotRight(firstValue, secondValue, audio) {
  audio.play()

  //alert("You got that DAMN RIGHT!")


  firstValue.className = 'cards correct_card'
  secondValue.className = 'cards correct_card'
  firstValue.disabled = true
  secondValue.disabled = true
}