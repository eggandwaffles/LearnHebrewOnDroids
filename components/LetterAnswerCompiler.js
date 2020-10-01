var { RandInt } = require("./RandInt.js")
var unicodes = require('../assets/hebrewUnicode.json');
var fakeAnswers = require('../assets/assortedNames.json');
var letters = require('../assets/hebrewLetters.json');


function getFullLetterData(letter) {
    var unicode = unicodes.find(unicode => unicode.name === letter).char
    var rawChar = letters.find(item => item.name === letter).char.split('')
    var polishChar = []
    for (let i = 0; i < rawChar.length; i++) {
        polishChar.push(rawChar.pop())
    }
    return {"name" : letter, "unicode" : unicode, "char" : polishChar.join('')}
}

function fetchRandom (blacklist) {
    //blacklist should be an array of the letter names that have been pulled so far.
    var index = RandInt(0, letters.length - 1)
    var fetched = letters[index]
    var blacklisted = blacklist.includes(fetched.name)
    while (blacklisted === true) {
        if (blacklist.includes(fetched.name)) {
            index = RandInt(0, letters.length)
            fetched = letters[index]
        } else {
            blacklisted = false
        }
    }
    return getFullLetterData(fetched.name)
}

function compileLetterArray () {
    var logs = []
    var readLetters = []
    var output = []
    var fakedOut = false
    var chosen = false
    logs.push("Beginning cycle.\n")
    for (let i = 0; i < 5; i++) {
        if (RandInt(1, 3) === 2 && !fakedOut && i != 4) {
            //Generate a fake answer
            logs.push("Creating a fake answer.\n")
            fakedOut = true
            var fakeName = fakeAnswers[RandInt(0, fakeAnswers.length - 1)]
            output.push({ "name" : fakeName, "unicode" : null, "sound" : fakeName, "isRight" : false })
        } else {
            if ((RandInt(1, 5) === 3 || i === 4) && !chosen) {
                //Generate a correct answer
                logs.push("Creating a correct answer.\n")
                chosen = true
                var correctAnswer = fetchRandom(readLetters)
                readLetters.push(correctAnswer.name)
                output.push({ "name" : correctAnswer.name, "unicode" : correctAnswer.unicode, "sound" : correctAnswer.char, "isRight" : true })
            } else {
                    //Generate an incorrect answer
                    logs.push("Creating an incorrect answer.\n")
                    var wrongAnswer = fetchRandom(readLetters)
                    readLetters.push(wrongAnswer.name)
                    output.push({ "name" : wrongAnswer.name, "unicode" : wrongAnswer.unicode, "sound" : wrongAnswer.char, "isRight" : false })
            }
        }
        if (i===0) {
            logs.push((i+1) + " cycle complete.\n")
        } else {
            logs.push((i+1) + " cycles complete.\n")
        }
    }
    logs.push("Cycles complete.")
return { output, logs }
}

function RockPolisher () {
    var raw = compileLetterArray().output
    var polish = {"prompt" : "", "answer" : "", "buttons" : []}
    for  (let i = 0; i < 5; i++) {
        polish.buttons.push(raw[i].sound)
    }
    var correctAnswer = raw.find(item => item.isRight)
    polish.prompt = correctAnswer.unicode
    polish.answer = correctAnswer.sound
    return polish
}
module.exports = { RockPolisher }