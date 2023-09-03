$(function() {

  const utterance = new SpeechSynthesisUtterance()
  utterance.voice = window.speechSynthesis.getVoices()[0]
  welcome = "Hello Micky and welcome to your Keyboard Lesson!"

  $("#intro #start").click(function() {

    utterance.text = welcome

    $("#intro").css("display", "none")
    $("#keyboard").css("display", "grid")

    window.speechSynthesis.speak(utterance)

  })

})