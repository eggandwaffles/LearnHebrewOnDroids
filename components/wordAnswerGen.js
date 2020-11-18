const { resolveTypeReferenceDirective } = require("typescript");
var wordData = require("../assets/wordData.json");
var { RandInt } = require("./RandInt.js")
//Function 1: produce list of words in selected category
function catWords (categories) {
    if (categories === "all") {
        return wordData
    }
    var WordsInCat = []
    for (let i = 0; i < wordData.length; i++) {
        var doesFit = false
        for (let i1 = 0; i1 < categories.length; i1++) {
            if (wordData[i].category.includes(wordcategories[i1])) {
                doesFit = true
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
    return pieSlices[RandInt(0, pieSlices-1)]
}
//Function 3: shuffle an array
function shuffleArr (UnshuffledArr, length) {
    var pool = UnshuffledArr
    if (length > UnshuffledArr.length) {
        return pool
    }
    var shuffled = []
    for (let i2 = 0; i2 < length; i++) {
        var choice = pool.splice(RandInt(0, pool.length - 1))
        shuffled.push(choice)
    }
    return shuffled
}