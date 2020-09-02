var test = ["Aleph", "Tav","He"]
var unicodes = require('C:/users/ad3ll/v1/assets/hebrewUnicode.json');
function convArr(wordArr) {
    var hebrewWord = []
    for(let i = wordArr.length; i > 0; i--) {
        hebrewWord.push(unicodes.find(unicode => unicode.name === wordArr[i-1]).char)
    };
    return hebrewWord.join('')
};
console.log(convArr(test))