# Keyboard Lessons

### Intro

This app is a tool for kids to learn about the keyboard. It visually and verbally prompts them to select various keys and celebrates there success when the correct key is chosen.

### Challenges

#### Keyboard Layout

The most difficult part of designing a keyboard lesson is that keyboard layout can vary from one computer to another. In an attempt to cater to the widest possible audience the keyboard in this app has been design to replicate the US Mac keyboard. If you would be interested in designing alternative layouts take a look at [this open issue](https://github.com/git-hut/keyboard-lessons/issues/1).

#### Voice Prompt

The next most challenging part is the verbal voice prompt. Not all computers come equipped with the same synth voices and settings. If your not happy with the way the voice sounds on your computer you can edit the [voices.js](https://github.com/git-hut/keyboard-lessons/blob/main/scripts/voices.js) file to select a different voice or modify the [volume](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/volume), [pitch](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/pitch) and [rate](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance/rate). Take a look at [this CodePen repo](https://codepen.io/matt-west/pen/DpmMgE) if you want to experiment with all the different voices available to your browser. There may even be a way to [adjust the voice settings through the UI](https://github.com/git-hut/keyboard-lessons/issues/2) in the future.

### Credit

 - Thanks goes to [Raj Suhail](https://github.com/irajsuhail) for his [CodePen repository](https://codepen.io/irajsuhail/pen/mYMZVm) that provided the original keyboard design for this app!
 - Thanks goes to [Matt West](https://github.com/matt-west) for his [Speech Synthesis Demo](https://codepen.io/matt-west/pen/DpmMgE) that helped me get the voice prompt working!
 - Thanks goes to [Kiril Vatev](https://github.com/catdad) for his [confetti gun](https://github.com/catdad/canvas-confetti) tool!