var unicodes = require(/assets/hebrewUnicode.json);
export function convArr(wordArr) {
    var hebrewWord = []
    for(let i = wordArr.length; i > 0; i--) {
        hebrewWord.push(unicodes.find(unicode => unicode.name === wordArr[i-1]).char)
    };
    return hebrewWord.join('')
};