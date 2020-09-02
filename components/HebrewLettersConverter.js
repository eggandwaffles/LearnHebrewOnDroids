var temp = []
var loops = 0
var abort = false
var pulses = 0
var input = []
var raw = ( 
'hebrewLetters[\"Aleph\"]   = \"\u{05D0}\"' +
'hebrewLetters[\"Bet\"]     = \"\u{FB31}\"' +
'hebrewLetters[\"Vet\"]     = \"\u{05D1}\"' +
'hebrewLetters[\"Gimel\"]   = \"\u{05D2}\"'
)
//console.log(raw.split(''))
var input = (raw.split(''))
var archiveInput = (raw.split(''))
console.log(archiveInput)
var output = [] 

function Delay (milliseconds) {
    var timeEnd = Date.now() + milliseconds
    while (Date.now() < timeEnd) {
    
    }
}

function Scanner (scanning, trigger, debug) {
    console.log('Scan Begun')
    var i = 1
    var record = []
    while (i=1) {
        console.log(`First letter is ${scanning[0]}`)
        if (scanning[0] = trigger) {
            console.log(scanning)
            record.push(scanning[0])
            var dump = [record.join(''), scanning.length]
            record = []
            scanning.splice(0, 1);
            i=0
            console.log(dump)
            return dump

        } else {
            console.log('Scan Pulse')
            debug ++
            record.push(scanning[1])
            scanning.splice(0, 1);
        }
    }

}

Delay(2000)

while (input.length > 0 && !abort) {
    temp = Scanner(input, '"', pulses)
//    input.splice(0, input.length - temp[1])
    temp = Scanner(input, '"', pulses)
    output.push(temp[0])
//    input.splice(0, input.length - temp[1])
    output.push(temp[0])
    console.log(loops)
    loops ++
    if (loops > 1769) { 
        console.log('FRUIT LOOPS!')
        abort = true
    }
    console.log(input)
}
//console.log(`Raw input was ${raw}`)
//Delay(2000)
//console.log(`which was parsed to ${archiveInput}`)
//Delay(2000)
//console.log(`The derived result is ${output.join('')}`)
//Delay(2000)
console.log(`${pulses} pulses were completed`)
console.log(output.join(''))