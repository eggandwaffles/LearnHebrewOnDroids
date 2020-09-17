var temp = []
var loops = 0
var abort = false
var pulses = 0
var input = []
var formattedOutput = []

var fs = require('fs')
/* var raw =  ('hebrewLetters["Aleph"]   = "\u{05D0}"' +
'hebrewLetters["Bet"]     = "\u{FB31}"' +
'hebrewLetters["Vet"]     = "\u{05D1}"' +
'hebrewLetters["Gimel"]   = "\u{05D2}"' +
'hebrewLetters["Dalet"]   = "\u{05D3}"' +
'hebrewLetters["He"]      = "\u{05D4}"' +
'hebrewLetters["Vav"]     = "\u{05D5}"' +
'hebrewLetters["Zayin"]   = "\u{05D6}"' +
'hebrewLetters["Het"]     = "\u{05D7}"' +
'hebrewLetters["Tet"]     = "\u{05D8}"' +
'hebrewLetters["Yud"]     = "\u{05D9}"' +
'hebrewLetters["Kaf"]     = "\u{05DB}"' +
'hebrewLetters["Lamed"]   = "\u{05DC}"' +
'hebrewLetters["Mem"]     = "\u{05DE}"' +
'hebrewLetters["Nun"]     = "\u{05E0}"' +
'hebrewLetters["Samech"]  = "\u{05E1}"' +
'hebrewLetters["Ayin"]    = "\u{05E2}"' +
'hebrewLetters["Pay"]      = "\u{FB44}"' +
'hebrewLetters["Phe"]      = "\u{05E4}"' +
'hebrewLetters["Tsadi"]   = "\u{05E6}"' +
'hebrewLetters["Kof"]     = "\u{05E7}"' +
'hebrewLetters["Resh"]    = "\u{05E8}"' +
'hebrewLetters["Shin"]    = "\u{0FB2A}"' +
'hebrewLetters["Sin"]     = "\u{0FB2D}"' +
'hebrewLetters["Tav"]     = "\u{05EA}"' +
'hebrewLetters["F-Nun"]   = "\u{05DF}"' +
'hebrewLetters["F-Mem"]   = "\u{05DD}"' +
'hebrewLetters["F-Kaf"]   = "\u{05DA}\u{05B0}"' +
'hebrewLetters[""]        = ""' +
'hebrewLetters[" "]       = ""' +
'hebrewLetters["Vav-Dagesh"] = "\u{FB35}"')
*/
function Delay (milliseconds) {
    var timeEnd = Date.now() + milliseconds
    while (Date.now() < timeEnd) {
    
    }
}

console.log("Launching")

var raw = fs.readFileSync('./toConvert.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('Read Complete')
    return data
})




var input = (raw.split(''))
var archiveInput = (raw.split(''))
var output = [] 
function Scanner (scanning, trigger, debug, catchTrig) {
    console.log('Scan Begun')
    var i = 1
    var record = []
    while (i=1) {
        console.log(`First letter is ${scanning[0]}`)
        if (scanning[0] === trigger) {
            if (catchTrig) {
                record.push(scanning[0])
            }
            
            console.log(`Record is ${record}`)
            var dump = [record.join(''), scanning.length]
            record = []
            scanning.splice(0, 1);
            i=0
            console.log(dump)
            return dump

        } else {
            console.log('Scan Pulse')
            debug ++
            record.push(scanning[0])
            scanning.splice(0, 1);
        }
    }

}

while (input.length > 0 && !abort) {
    temp = Scanner(input, '"', pulses, true)

    temp = Scanner(input, '"', pulses, false)
    output.push(temp[0])
    var letterName = temp[0]
    
    temp = Scanner(input, '"', pulses, true)

    temp = Scanner(input, '"', pulses, false)
    output.push(temp[0])
    var letterChar = temp[0]
    if(formattedOutput.length > 0) {
        formattedOutput.push(`,\n{\n` +
        `"name" : "${letterName}",\n` +
        `"char" : "${letterChar}"\n` +
        `}`
        )
    } else {
        formattedOutput.push(`{\n` +
        `"name" : "${letterName}",\n` +
        `"char" : "${letterChar}"\n` +
        `}`
        )
    }

    
    
    console.log(loops)
    loops ++
    if (loops > 1769) { 
        console.log('FRUIT LOOPS!')
        abort = true
    }
}

console.log("[\n" + formattedOutput.join('') + "\n]")