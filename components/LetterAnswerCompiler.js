var { RandInt } = require("./RandInt.js")
var unicodes = require('/assets/hebrewUnicode.json');
var fakeAnswers = require('../assets/assortedNames.json');
var letters = require('/assets/hebrewLetters.json');


function getFullLetterData(letter) {
    var unicode = unicodes.find(unicode => unicode.name === letter).char
    var rawChar = letters.find(letter => letter.name === letter).char.split('')
    var polishChar = []
    for (let i = 0; i < rawChar.length; i++) {
        polishChar.push(rawChar.pop())
    }
    return {"name" : letter, "unicode" : unicode, "char" : polishChar.join('')}
}

