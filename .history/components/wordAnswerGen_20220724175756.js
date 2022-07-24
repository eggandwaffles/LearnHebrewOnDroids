//const { resolveUri } = require("expo-asset/build/AssetSources");
const { resolveTypeReferenceDirective } = require("typescript");
import AsyncStorage from '@react-native-async-storage/async-storage';
//var wordData = require("../assets/wordData.json");
var { RandInt } = require("./RandInt.js")
var {convArr} = require("./wordArrayToUnicode.tsx")
import { getWordDataGlobal, setWordDataGlobal } from '../components/wordDataManager.js';
 
const loadWordData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('wordData')
      console.log("Loaded wordData. First 100 chars are: " + jsonValue.substring(0,100) + " Timestamp: " + Date.now())
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
      // read error
    }
  
    console.log('Done.')
  
  }
 

//Function 1: produce list of words in selected category
function catWords (categories) {
    /*
    try {
        console.log("attempting wordData collection...")
        var wordData = loadWordData()
        
      } catch (error) {
        console.error(error)
      }*/
      var wordData = getWordDataGlobal()
    if (categories === "all") {
        return wordData
    }
    
    //var wordData = global.wordData
    var WordsInCat = []
    for (let i = 0; i < wordData.length; i++) {
        var doesFit = false
        for (let i1 = 0; i1 < categories.length; i1++) {
            if (wordData[i].categories.includes(categories[i1])) {
                doesFit = true
                //console.log("A matching word has been found!")
            }
            
        }
        if (doesFit) {
            WordsInCat.push(wordData[i])
        }
    }
    return WordsInCat
}
//Function 2: pick a word, any word
function wheelOfMisfortune (categories) {
    var pieSlices = catWords(categories)
    return pieSlices[RandInt(0, pieSlices.length)]
}
//Function 3: shuffle an array
function shuffleArr (unshuffledArr, length) {
    var pool = [...unshuffledArr]
    //console.log("Pool initialized as " + pool)
    if (length > unshuffledArr.length) {
        console.error(`ERROR: requested length exceeds source length. Trace information: \nRequested length: ${length}\nSource length: ${unshuffledArr.length}\nUnshuffled array: unshuffledArr`)
        return pool
        
    }
    var shuffled = []
    for (let i2 = 0; i2 < length; i2++) {
        var choice = pool.splice(RandInt(0, pool.length), 1)
        shuffled.push(choice.join(""))
        //console.log("Pool is now " + pool + ". Shuffled is now " + shuffled + ".")
    }
    return shuffled
}
//Interlude 1: standard template for word questions
const AnswerContainer = {
    "letters" : "",
    "TranslitOptions" : [],
    "CorrectTranslit" : "",
    "TranslateOptions" : [],
    "CorrectTranslate" : "",
    "hint" : ""
}

//Interlude 2: Testing function
function testFuncs (reps) {
    var arcReps = reps
    var results = []
    
    //build data
    while (reps>0) {
        var midres = ({
            "input" : null, 
            "output" : null
        })
        
        var testArr = wheelOfMisfortune((["intro", "wine"])).close_transliterations
        midres.input = testArr
        var shufTest = shuffleArr(testArr, 5)
        midres.output = shufTest
        results.push(midres)
        reps--
    }
    //test data
    var matches = {
        "Place1" : 0,
        "Place2" : 0,
        "Place3" : 0,
        "Place4" : 0,
        "Place5" : 0
    }
    function percentaverage(datasum, trials) {
        return (((datasum/trials)*100) + "%")
    }
    for (let tI = 0; tI < results.length; tI++) {
        
        if(results[tI].input[0] === results[tI].output[0]) {matches.Place1++}
        if(results[tI].input[1] === results[tI].output[1]) {matches.Place2++}
        if(results[tI].input[2] === results[tI].output[2]) {matches.Place3++}
        if(results[tI].input[3] === results[tI].output[3]) {matches.Place4++}
        if(results[tI].input[4] === results[tI].output[4]) {matches.Place5++}
    }

    console.clear()
    console.log("Frequencies are:\nPlace 1: " + percentaverage(matches.Place1, arcReps) + "\nPlace 2: " + percentaverage(matches.Place2, arcReps) + "\nPlace 3: " + percentaverage(matches.Place3, arcReps) + "\nPlace 4: " + percentaverage(matches.Place4, arcReps) + "\nPlace 5: " + percentaverage(matches.Place5, arcReps) + "\nAnalysis Complete!")
}
//Function 4: inject a correct answer and format an AnswerContainer
function finalAnswer (categories) { 
    var exportableAnswer = Object.create(AnswerContainer)
    //Select spelling
    try {
        const selection = wheelOfMisfortune(categories)
        exportableAnswer.letters = convArr(selection.letters, selection.vowels)
        //Select transliterations
        exportableAnswer.CorrectTranslit = selection.transliteration
        exportableAnswer.TranslitOptions = shuffleArr(selection.close_transliterations, 5)
        exportableAnswer.TranslitOptions[RandInt(0,5)] = exportableAnswer.CorrectTranslit
        //Select translations
        exportableAnswer.CorrectTranslate = selection.translation
        exportableAnswer.TranslateOptions = shuffleArr(selection.close_translations, 5)
        exportableAnswer.TranslateOptions[RandInt(0,5)] = exportableAnswer.CorrectTranslate
        //select hint
        exportableAnswer.hint = selection.hint    
        //return!!!!
        return exportableAnswer
    } catch {
        console.error("Failed to generate an answer. Timestamps: " + Date.now())
        var errorSelection = Object.create(AnswerContainer)
        errorSelection.letters = convArr(['Aleph','Resh','Resh'], ['eh','uh',''])
        errorSelection.CorrectTranslit = 'ERROR'
        errorSelection.TranslateOptions = ['ERROR','ERROR','ERROR','ERROR','ERROR']
        errorSelection.CorrectTranslate = 'ERROR'
        errorSelection.TranslitOptions = ['ERROR','ERROR','ERROR','ERROR','ERROR']
        errorSelection.hint = 'Sorry!'
        return errorSelection
    }
    
}
module.exports = { finalAnswer, catWords }
