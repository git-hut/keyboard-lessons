const alphabetKeys = (function() {

  letters = [...Array(26)].map((value, index) => String.fromCharCode(index + 65))

  return letters.map(letter => {

    return { key: letter.toLowerCase(), name: letter.toUpperCase() }

  })

})()

const numberKeys = (function() {

  let numberNames = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']

  return numberNames.map((value, index) => {

    return { key: String(index), name: value }

  })

})()