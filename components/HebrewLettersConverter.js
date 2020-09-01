var temp = []
var loops = 0
var abort = false
input = []
var raw = ( 
'hebrewLetters["Aleph"]   = "\u{05D0}"' +
'hebrewLetters["Bet"]     = "\u{FB31}"' +
'hebrewLetters["Vet"]     = "\u{05D1}"' +
'hebrewLetters["Gimel"]   = "\u{05D2}"'
)
console.log(raw.split(''))
var input = raw.split('')
var archiveInput = input
var output = [] 

function Delay (milliseconds) {
    var timeEnd = Date.now() + milliseconds
    while (Date.now() < timeEnd) {
    
    }
}

function Scanner (scanning, trigger) {
    console.log('Scan Begun')
    var i = 1
    var record = []
    while (i=1) {

        if (scanning[0] = trigger) {
            var dump = [record.join(), scanning.length]
            record = []
            scanning.splice(0, 1);
            i=0
            return dump

        } else {
            console.log('Scan Pulse')
            record.push(scanning[0])
            scanning.splice(0, 1);
        }
        Delay(50)
    }

}
Delay(1000)
while (input.length > -1 && !abort) {
    temp = Scanner(input, '"')
    input.splice(0, input.length - temp[1])
    temp = Scanner(input, '"')
    output.push(temp[0])
    input.splice(0, input.length - temp[1])
    console.log(loops)
    loops ++
    if (loops > 1769) {
        console.log('FRUIT LOOPS!')
        abort = true
    }
}
console.log(`Raw input was ${raw}`)
console.log(`That was parsed to "${archiveInput}"`)
console.log(`The derived result is ${output}`)