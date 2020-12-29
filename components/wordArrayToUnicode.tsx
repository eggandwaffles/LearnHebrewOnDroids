var unicodes = require('../assets/hebrewUnicode.json');
var vowels = require('../assets/hebrewVowels.json');
function convArr(wordArr, vowelArr) {
    var hebrewWord = []
    for(let i = 0; i < wordArr.length; i++) {
        hebrewWord.push(unicodes.find(unicode => unicode.name === wordArr[i]).char)
        hebrewWord.push(vowels.find(vowel => vowel.name === vowelArr[i]).char)
    };
    return hebrewWord.join('')
};
module.exports = { convArr }