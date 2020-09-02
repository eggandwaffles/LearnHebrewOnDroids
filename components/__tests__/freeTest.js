var raw = ( 
    'hebrewLetters["Aleph"]   = "\u{05D0}"' +
    'hebrewLetters["Bet"]     = "\u{FB31}"' +
    'hebrewLetters["Vet"]     = "\u{05D1}"' +
    'hebrewLetters["Gimel"]   = "\u{05D2}"'
    )
var arr = raw.split('')
var str = arr.join('')

function Delay (milliseconds) {
    var timeEnd = Date.now() + milliseconds
    var animationTick = 100
    while (Date.now() < timeEnd) {
        console.clear()
        var nextTick = Date.now() + animationTick
        console.log(`<           >`)
        while (Date.now() < nextTick) {
            
        }
        console.clear()
        var nextTick = Date.now() + animationTick
        console.log(`<H          >`)
        while (Date.now() < nextTick) {
            
        }
        console.clear()
        var nextTick = Date.now() + animationTick
        console.log(`<HE         >`)
        while (Date.now() < nextTick) {
            
        }
        console.clear()
        var nextTick = Date.now() + animationTick
        console.log(`<HEL        >`)
        while (Date.now() < nextTick) {
            
        }
        console.clear()
        var nextTick = Date.now() + animationTick
        console.log(`<HELL       >`)
        while (Date.now() < nextTick) {
            
        }
        console.clear()
        var nextTick = Date.now() + animationTick
        console.log(`<HELLO      >`)
        while (Date.now() < nextTick) {
            
        }
        console.clear()
        console.clear()
        var nextTick = Date.now() + animationTick
        console.log(`<HELLO      >`)
        while (Date.now() < nextTick) {
            
        }
        console.clear()
        var nextTick = Date.now() + animationTick
        console.log(`<HELLO W    >`)
        while (Date.now() < nextTick) {
            
        }
        console.clear()
        var nextTick = Date.now() + animationTick
        console.log(`<HELLO WO   >`)
        while (Date.now() < nextTick) {
            
        }
        console.clear()
        var nextTick = Date.now() + animationTick
        console.log(`<HELLO WOR  >`)
        while (Date.now() < nextTick) {
            
        }
        console.clear()
        var nextTick = Date.now() + animationTick
        console.log(`<HELLO WORL >`)
        while (Date.now() < nextTick) {
            
        }
        console.clear()
        var nextTick = Date.now() + animationTick
        console.log(`<HELLO WORLD>`)
        while (Date.now() < nextTick) {
            
        }
        console.clear()
    }
}

Delay(1)
console.log(arr[0])
