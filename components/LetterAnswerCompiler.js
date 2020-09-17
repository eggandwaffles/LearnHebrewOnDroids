var { RandInt } = require("./RandInt.js")
var unicodes = require('/assets/hebrewUnicode.json');

function getUnicode(letter) {
    return unicodes.find(unicode => unicode.name === letter)
}