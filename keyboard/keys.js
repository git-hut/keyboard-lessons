const numberKeys = (function() {

  let numberNames = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"]

  return numberNames.map((value, index) => {

    return { set: "number", code: String(index), name: value, display: String(index) }

  })

})()

const alphabetKeys = (function() {

  letters = [...Array(26)].map((value, index) => String.fromCharCode(index + 65))

  return letters.map(letter => {

    return { set: "alphabet", code: letter.toLowerCase(), name: letter.toUpperCase(), display: letter.toUpperCase() }

  })

})()

const specialKeys = [

  { set: "special", code: "backspace", name: "Backspace", display: "⌫" },
  { set: "special", code: "tab", name: "Tab", display: "⇥" },
  { set: "special", code: "capslock", name: "Caps Lock", display: "⇪" },
  { set: "special", code: "enter", name: "Enter", display: "↲" },
  { set: "special", code: "shift", name: "Shift", display: "⇧" },
  { set: "special", code: "control", name: "Control", display: "⌃" },
  { set: "special", code: "alt", name: "Option", display: "⌥" },
  { set: "special", code: "meta", name: "Command", display: "⌘" },
  { set: "special", code: "space", name: "Space", display: "Space" },
  { set: "special", code: "arrowleft", name: "Left Arrow", display: "←" },
  { set: "special", code: "arrowright", name: "Right Arrow", display: "→" },
  { set: "special", code: "arrowup", name: "Up Arrow", display: "↑" },
  { set: "special", code: "arrowdown", name: "Down Arrow", display: "↓" }

]

const symbolKeys = [

  { set: "symbol", code: "~", name: "Tilde", display: "~" },
  { set: "symbol", code: "-", name: "Minus", display: "-" },
  { set: "symbol", code: "+", name: "Plus", display: "+" },
  { set: "symbol", code: "[", name: "Open Square Bracket", display: "[" },
  { set: "symbol", code: "]", name: "Closed Square Bracket", display: "]" },
  { set: "symbol", code: "\\", name: "Backslash", display: "\\" },
  { set: "symbol", code: ";", name: "Semicolon", display: ";" },
  { set: "symbol", code: "'", name: "Single Quote", display: "'" },
  { set: "symbol", code: ",", name: "Comma", display: "," },
  { set: "symbol", code: ".", name: "Period", display: "." },
  { set: "symbol", code: "/", name: "Slash", display: "/" }

]