var { RandInt } = require("./RandInt.js")
var unicodes = require('../assets/hebrewUnicode.json');
var fakeAnswers = require('../assets/assortedNames.json');
var vowels = require('../assets/HebrewVowels.json')
var letters = require('../assets/hebrewLetters.json');
var fakeVowels = ["ii","og","eek","ama","reck","eft","oops"]

function getFullLetterData(letter) {
    var unicode = unicodes.find(unicode => unicode.name === letter).char
    var rawChar = letters.find(item => item.name === letter).char//add a .split('')
    var polishChar = rawChar //make array
    /*
    for (let i = 0; i < rawChar.length; i++) {
        polishChar.push(rawChar.pop())
    }
    */ //uncomment
    return {"name" : letter, "unicode" : unicode, "char" : polishChar} //add a .join('')
}
//The above comments were notes in case I needed to undo a change. Luckily, the change worked.
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
function getSomeVowels (real) {
    var toReturn = {"name" : null, "unicode" : null}
    if (real) {
        var pickerIndex = RandInt(0, vowels.length - 1)
        toReturn.name = vowels[pickerIndex].name
        toReturn.unicode = vowels[pickerIndex].char
    } else {

    }
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
                if (output.some(item => item.sound === correctAnswer.char)) {
                    var correctAnswer = fetchRandom(readLetters)
                    readLetters.push(correctAnswer.name)
                }
                
                output.push({ "name" : correctAnswer.name, "unicode" : correctAnswer.unicode, "sound" : correctAnswer.char, "isRight" : true })
            } else {
                    //Generate an incorrect answer
                    logs.push("Creating an incorrect answer.\n")
                    var wrongAnswer = fetchRandom(readLetters)
                    readLetters.push(wrongAnswer.name)
                    if (output.some(item => item.sound === wrongAnswer.char)) {
                        i--
                    } else {
                        output.push({ "name" : wrongAnswer.name, "unicode" : wrongAnswer.unicode, "sound" : wrongAnswer.char, "isRight" : false })
                    }

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

function VowelPolisher () {
    var raw = compileLetterArray().output
    var polish = {"prompt" : "", "answer" : "", "buttons" : []}
    for  (let i = 0; i < 5; i++) {
        polish.buttons.push(raw[i])
    }
    for  (let i = 0; i < 5; i++) {
        if (polish.buttons[i].unicode !== null) {
            var flipped = polish.buttons[i].sound
            var flippedArr = flipped.split('')
            var niceArr = []
            while (flippedArr.length !== 0) {
                var current = flippedArr.pop()
                niceArr.push(current)
            }
            polish.buttons[i].sound = niceArr.join('')
        }
    }
    var correctAnswerTwo = raw.find(item => item.isRight)
    polish.prompt = correctAnswerTwo.unicode
    polish.answer = correctAnswerTwo.sound
    return polish
}
module.exports = { VowelPolisher }
console.log(VowelPolisher())