//This is a tool to convert data from the format found in the iOS app to a JSON format. It takes input from a file name toConvert.txt placed at this level.
//JSON is output to the ConverterOutput.json file placed at this same level. This program cost me a lot of time but gosh it's useful
var temp = []
var loops = 0
var abort = false
var pulses = 0
var input = []
var formattedOutput = []
var fs = require('fs')

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
fs.writeFile('./ConverterOutput.json', "[\n" + formattedOutput.join('') + "\n]", "utf8", () => {
    console.log("Done writing to file")
})
//console.log("[\n" + formattedOutput.join('') + "\n]")