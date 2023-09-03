$(function() {

  var restart
  var questions
  var questionSet
  var questionIndex
  var questionCount

  let name = "Micky"

  const canvas = document.getElementById("canvas")

  const celebrate = confetti.create(canvas, {
    useWorker: true,
    resize: true
  })

  const celebrateOptions = {
    particleCount: 1000,
    spread: 360
  }

  const start = async function() {

    questions = []
    questionIndex = 0
    questionCount = 10
    questionSet = alphabetKeys

    $("#question p").text("")
    $("#start").css("display", "none")
    $("#keyboard").css("display", "inline-grid")

    while (questions.length < questionCount) {

      random = Math.floor(Math.random() * questionSet.length)

      if (questions.indexOf(random) == -1) questions.push(random)

    }

    if (!restart) {

      await speak("Hello " + name + " and welcome to your Keyboard Lesson!")

    } else {

      await speak("Welcome back " + name + "!")

    }

    await sleep(500)

    askQuestion()

  }

  const askQuestion = async function(key = questionSet[questions[questionIndex]]) {

    let question = ""

    let keyCode = key.code
    let keyName = key.name

    if (Math.floor(questionCount / 2) == questionIndex ) {

      await speak("You're doing great, keep it up!")

      await sleep(500)

    }

    if (questionIndex == 0) {

      question = "Lets start with the '" + keyName + "' key, can you click or press the '" + keyName + "' key?"

    } else if (questionIndex == questionCount - 1) {

      question = "Last one! Can you show me the '" + keyName + "' key?"

    } else if (questionIndex == 1) {

      question = "Now lets try the '" + keyName + "' key, can you click or press the '" + keyName + "' key?"

    } else if (questionIndex == 2) {

      question = "It's the '" + keyName + "' key this time, give it your best shot!"

    } else {

      question = "Select the '" + keyName + "' key this time, please."

    }

    $("#question p").text(question)

    await speak(question)

    addKeyboardEvents()

  }

  const processEvent = async function(event) {

    removeKeyboardEvents()

    event.preventDefault()
    event.stopPropagation()

    if (event.type == "keydown") {

      key = event.key.toLowerCase()

    } else if (event.type == "click") {

      key = event.target.id.toLowerCase()

    }

    if (key == " ") key = "space"

    if (key == questionSet[questions[questionIndex]].code) {

      $("#question p").text("")

      celebrate(celebrateOptions)

      $(document.getElementById(key)).addClass("success")
      $(document.getElementsByClassName(key)).addClass("success")

      await speak("Yes! You got it!")

      questionIndex += 1

      await sleep(500)

      if (questionIndex != questionCount) {

        askQuestion()

      } else {

        end()

      }

    } else {

      $(document.getElementById(key)).addClass("fail")
      $(document.getElementsByClassName(key)).addClass("fail")

      await speak("Sorry, that's not quite right, try again!")

      addKeyboardEvents()

    }

    $(".key").removeClass("success")
    $(".key").removeClass("fail")

  }

  const addKeyboardEvents = function() {

    $(".key").click(function(event) {
      processEvent(event)
    })

    $("body").keydown(function(event) {
      processEvent(event)
    })

  }

  const removeKeyboardEvents = function() {

    $(".key").off("click")
    $("body").off("keydown")

  }

  const end = async function() {

    let message = "All done! You did great! Click the 'Restart' button above if you want to keep going!"

    $("#keyboard").css("display", "none")
    $("#start").css("display", "block")

    $("#start h3").text("Restart")
    $("#question p").text(message)

    await speak(message)

    restart = true

  }

  $("#start").click(function() {

    start()

  })

})

const speak = function(text = "") {

  let voice = window.speechSynthesis.getVoices()[0]
  let utterance = new SpeechSynthesisUtterance()

  utterance.voice = voice
  utterance.text = text

  window.speechSynthesis.speak(utterance)

  return new Promise(resolve => {
    return utterance.onend = resolve
  })

}

const sleep = function(time) {
  return new Promise(resolve => {
    return window.setTimeout(resolve, time)
  })
}