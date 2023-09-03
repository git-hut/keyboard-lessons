$(function() {

  $("#start").click(async function() {

    $("#start").css("display", "none")
    $("#keyboard").css("display", "inline-grid")

    let welcome = "Hello Micky and welcome to your Keyboard Lesson!"
    let question = "Lets start with the 'A' key, can you click or press the 'A' key?"

    await speak(welcome)

    $("#question p").text(question)

    await sleep(500)

    await speak(question)

    $(".key").click(function(event) {
      processEvent(event)
    })

    $("body").keydown(function(event) {
      processEvent(event)
    })

  })

  processEvent = function(event) {

    event.preventDefault()
    event.stopPropagation()

    if (event.type == "keydown") {

      key = event.key.toLowerCase()

    } else if (event.type == "click") {

      key = event.target.id.toLowerCase()

    }

  }

})

speak = function(text = "") {

  let voice = window.speechSynthesis.getVoices()[0]
  let utterance = new SpeechSynthesisUtterance()

  utterance.voice = voice
  utterance.text = text

  window.speechSynthesis.speak(utterance)

  return new Promise(resolve => {
    return utterance.onend = resolve
  })

}

sleep = function(time) {
  return new Promise(resolve => {
    return window.setTimeout(resolve, time)
  })
}