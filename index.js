$(function() {

  var restart
  var questions
  var questionSet
  var questionIndex
  var questionCount

  let name = ""

  const canvas = document.getElementById("canvas")

  const celebrate = confetti.create(canvas, {
    useWorker: true,
    resize: true
  })

  const celebrateOptions = {
    particleCount: 1000,
    spread: 360
  }

  const keySetIds = ["numberKeys", "alphabetKeys", "specialKeys", "symbolKeys"]

  const keySets = { numberKeys, alphabetKeys, specialKeys, symbolKeys }

  const loadSettings = function() {

    const savedName = localRead("name")
    if (savedName !== null) $("#name-input").val(savedName)

    keySetIds.forEach(function(id) {
      const saved = localRead(id)
      if (saved !== null) $("#" + id).prop("checked", saved)
    })

  }

  const saveSettings = function() {

    localWrite("name", $("#name-input").val().trim())
    keySetIds.forEach(function(id) {
      localWrite(id, $("#" + id).is(":checked"))
    })

  }

  const start = async function() {

    name = $("#name-input").val().trim()

    const selectedSets = []
    keySetIds.forEach(function(id) {
      if ($("#" + id).is(":checked")) selectedSets.push(...keySets[id])
    })

    if (selectedSets.length === 0) {
      $("#question p").text("Please select at least one key set to start!")
      return
    }

    saveSettings()

    questions = []
    questionIndex = 0
    questionCount = selectedSets.length
    questionSet = selectedSets

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

    const greeting = name
      ? "Hello " + name + " and welcome to your Keyboard Lesson!"
      : "Hello and welcome to your Keyboard Lesson!"

    const welcomeBack = name ? "Welcome back " + name + "!" : "Welcome back!"

    if (!restart) {

      await utterance.speak(greeting)

    } else {

      await utterance.speak(welcomeBack)

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

    $("#start-button h3").text("Restart")
    $("#question p").text(message)

    utterance.speak(message)

    restart = true

  }

  $(window).on("beforeunload", function() {

    utterance.interrupt()

  })

  loadSettings()

  $("#start-button").click(function() {

    start()

  })

})