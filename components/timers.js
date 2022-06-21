const { isThisTypeNode } = require("typescript")
//import * as React from 'react';
//const [variable, setterFunction ] = React.useState(value)

const globalTimer = {
    "time" : 0,
    "active" : false,
    "activeCallback" : null,
    startTimer: function(setTime, callback) {
        this.time = setTime
        this.active = true
        this.loopIterator(callback)
    },
    stopTimer : function() {
        clearTimeout(this.activeCallback)
        this.activeCallback = null
        this.active = false
        return "done"
    },
    new : function() {
        return new Object(this)
    },
    loopIterator : function(callback) {
        this.activeCallback = setTimeout( () => {
            if (this.time>1) {
                this.time--
                this.loopIterator(callback)
            } else {
                callback()
            }
        },1000)
    }
}
module.exports = { globalTimer }

//test

myTimer = globalTimer.new()
var setPoint = 12
var initTime = Date.now()
myTimer.startTimer(setPoint, ()=>{
    const diff = (Date.now() - initTime)
    console.log("Timer done @ " + diff + "ms. Deviation is " + (diff - 1000 * setPoint) + "ms.")
})
