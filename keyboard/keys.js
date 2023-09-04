const alphabetKeys = (function() {

  letters = [...Array(26)].map((value, index) => String.fromCharCode(index + 65))

  return letters.map(letter => {

    return { code: letter.toLowerCase(), name: letter.toUpperCase(), display: letter.toUpperCase() }

  })

})()

const numberKeys = (function() {

  let numberNames = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']

  return numberNames.map((value, index) => {

    return { code: String(index), name: value, display: String(index) }

  })

})()

const specialKeys = [

  {code: "backspace", name: "Backspace", display: "⌫"},
  {code: "tab", name: "Tab", display: "⇥"},
  {code: "capslock", name: "Caps Lock", display: "⇪"},
  {code: "enter", name: "Enter", display: "↲"},
  {code: "shift", name: "Shift", display: "⇧"},
  {code: "control", name: "Control", display: "⌃"},
  {code: "alt", name: "Option", display: "⌥"},
  {code: "meta", name: "Command", display: "⌘"},
  {code: "space", name: "Space", display: "Space"},
  {code: "arrowleft", name: "Left Arrow", display: "←"},
  {code: "arrowright", name: "Right Arrow", display: "→"},
  {code: "arrowup", name: "Up Arrow", display: "↑"},
  {code: "arrowdown", name: "Down Arrow", display: "↓"}

]