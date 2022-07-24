var wordData = require('../../assets/wordData.json')
var checkout = true
for (let i=0;i<wordData.length;i++) {
    //check 1: translit array
    var check1ideal = 5
    if (wordData[i].close_transliterations.length !== check1ideal) {
        console.log("CHECK 1 EXCEPTION DETECTED ON INDEX " + i)
        checkout = false
    }
    //check 2: translate array
    var check2ideal = 5
    if (wordData[i].close_translations.length !== check2ideal) {
        console.log("CHECK 2 EXCEPTION DETECTED ON INDEX " + i)
        checkout = false
    }
        //check 3: hint presence
    var check3ideal = true
    if (wordData[i].hint.length == 0) {
        console.log("CHECK 3 EXCEPTION DETECTED ON INDEX " + i)
        checkout = false
    }
}
if (checkout) {
    console.log("WordData passes all tests")
} else {
    console.log("ONE OR MORE ELEMENTS FAILED TO PASS CHECKS.")
}