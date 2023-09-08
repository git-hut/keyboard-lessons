class Utterance {

  constructor(args = {lang: "en-US", voice: "Alex", volume: 1, pitch: 1, rate: 1}) {

    this.utterance = new SpeechSynthesisUtterance() // Help: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
    this.synth = window.speechSynthesis // Help: https://developer.mozilla.org/en-US/docs/Web/API/Window/speechSynthesis

    if (args.lang == null) args.lang = "en-US"
    if (args.voice == null) args.voice = "Alex"
    if (args.volume == null) args.volume = 1
    if (args.pitch == null) args.pitch = 1
    if (args.rate == null) args.rate = 1

    this.synth.onvoiceschanged = () => {

      this.setLanguage(args.lang)
      this.setVoice(args.voice)
      this.setVolume(args.volume)
      this.setPitch(args.pitch)
      this.setRate(args.rate)

    }

  }

  getLanguages() {

    return this.synth.getVoices().map((voice) => voice.lang).unique().sort()

  }

  getLanguage() {

    return this.utterance.lang

  }

  // Help: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/lang
  setLanguage(lang = "en-US") {

    this.utterance.lang = lang

  }

  getVoices(lang = this.utterance.lang) {

    let voices = this.synth.getVoices()

    if (lang) voices.exclude((voice) => voice.lang.includes(lang) != true)

    return voices

  }

  getVoice() {

    return this.utterance.voice

  }

  // Help: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/voice
  setVoice(name = "Alex", lang = "") {

    let voices = this.getVoices(lang)

    if (name) voices.exclude((voice) => voice.name.toLocaleLowerCase() != name.toLocaleLowerCase())

    if (!voices.empty()) {

      let voice = voices[0]

      if (voice.lang != this.utterance.lang) {

        this.setLanguage(voice.lang)

      }

      this.utterance.voice = voice

    }

  }

  getVolume() {

    return this.utterance.volume

  }

  // Help: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/volume
  setVolume(volume = 1) {

    this.utterance.volume = Number(volume)

  }

  getPitch() {

    return this.utterance.pitch

  }

  // Help: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/pitch
  setPitch(pitch = 1) {

    this.utterance.pitch = Number(pitch)

  }

  getRate() {

    return this.utterance.rate

  }

  // Help: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/rate
  setRate(rate = 1) {

    this.utterance.rate = Number(rate)

  }

  // Help: https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/text
  speak(text = "", callback = null, args = []) {

    this.utterance.text = text

    this.synth.speak(this.utterance)

    return new Promise(resolve => {

      if (callback) {

        callback(resolve, ...args)

      }

      return this.utterance.onend = resolve

    })

  }

  pause() {

    if (this.synth.speaking) {

      this.synth.pause()

    }

  }

  resume() {

    if (this.synth.paused) {

      this.synth.resume()

    }

  }

  interrupt() {

    if (this.synth.speaking) {

      this.synth.cancel()

    }

  }

  wait(time = 1000) {

    return new Promise(resolve => {

      return window.setTimeout(resolve, time)

    })

  }

}