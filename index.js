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
    questionCount = 25
    questionSet = [].concat(numberKeys, alphabetKeys, specialKeys, symbolKeys)

    utterance.interrupt()

    $("#question p").text("")
    $("#start").css("display", "none")
    $("title").text("Keyboard Lesson")
    $("#title").text("Keyboard Lesson")
    $("#keyboard").css("display", "inline-grid")

    while (questions.length < questionCount) {

      random = Math.floor(Math.random() * questionSet.length)

      if (questions.indexOf(random) == -1) questions.push(random)

    }

    if (!restart) {

      await utterance.speak("Hello " + name + " and welcome to your Keyboard Lesson!")

    } else {

      await utterance.speak("Welcome back " + name + "!")

    }

    await utterance.wait(500)

    askQuestion()

  }

  const askQuestion = async function(questionKey = questionSet[questions[questionIndex]]) {

    let question = ""

    let keySet = questionKey.set
    let keyCode = questionKey.code
    let keyName = questionKey.name
    let keyDisplay = questionKey.display

    if (Math.floor(questionCount / 2) == questionIndex ) {

      await utterance.speak("You're doing great, keep it up!")

      await utterance.wait(500)

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

    addKeyboardEvents()

    $("#question p").text(question)
    $("#example").css("display", "block")
    $("#example .key h1").text(keyDisplay)

    await utterance.speak(question)

  }

  const processEvent = async function(event, questionKey = questionSet[questions[questionIndex]]) {

    removeKeyboardEvents()

    event.preventDefault()
    event.stopPropagation()

    $(".key").removeClass("fail")
    $(".key").removeClass("success")

    if (event.type == "keydown") {

      key = event.key.toLowerCase()

    } else if (event.type == "click") {

      key = event.target.id.toLowerCase()

    }

    if (key == " ") key = "space"
    if (key.includes("-") && key.length > 1) key = key.split("-")[1]

    if (!(questionKey.set == "symbol" && key == "shift")) {

      if (key == questionSet[questions[questionIndex]].code) {

        $("#example").css("display", "none")
        $("#question p").text("")

        celebrate(celebrateOptions)

        $(document.getElementById(key)).addClass("success")
        $(document.getElementsByClassName(key)).addClass("success")

        congratulatoryWords = ["Awesome", "Nice", "Yeah", "Yes", "Wahoo", "Wow"]

        await utterance.speak("" + congratulatoryWords.random() + "! You got it!")

        questionIndex += 1

        await utterance.wait(500)

        $(".key").removeClass("success")

        if (questionIndex != questionCount) {

          askQuestion()

        } else {

          end()

        }

      } else {

        addKeyboardEvents()

        $(document.getElementById(key)).addClass("fail")
        $(document.getElementsByClassName(key)).addClass("fail")

        await utterance.speak("Sorry, that's not quite right, try again!")

        $(".key").removeClass("fail")

      }

    } else {

      addKeyboardEvents()

    }

  }

  const addKeyboardEvents = function() {

    $(".key").click(function(event) {
      utterance.interrupt()
      processEvent(event)
    })

    $("body").keydown(function(event) {
      utterance.interrupt()
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

    utterance.speak(message)

    restart = true

  }

  $(window).on("beforeunload", function() {

    utterance.interrupt()

  })

  $("#start").click(function() {

    start()

  })

})