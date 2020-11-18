var { convArr } = require('../wordArrayToUnicode.tsx');
var wordData = require("./assets/wordData.json");
console.log(convArr(wordData[3].letters, wordData[3].vowels))