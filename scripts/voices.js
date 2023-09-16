const utterance = new Utterance()

voices = [

  {name: "Alex", volume: 1, pitch: 1, rate: 0.85},
  {name: "Rishi", volume: 1, pitch: 1, rate: 1},
  {name: "Samantha", volume: 1, pitch: 1, rate: 0.95},
  {name: "", volume: 1, pitch: 1, rate: 1}

]

setTimeout(() => {

  for (var voice of voices) {

    if (utterance.setVoice(voice.name)) {

      utterance.setVolume(voice.volume)
      utterance.setPitch(voice.pitch)
      utterance.setRate(voice.rate)

      break

    }

  }

}, 100)