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
        console.log(`Alert! Timer started with ${this.time} seconds.`)
        this.loopIterator(callback)
    },
    stopTimer : function() {
        console.log(`Alert! Timer stopped with ${this.time} seconds.`)
        clearTimeout(this.activeCallback)
        this.activeCallback = null
        this.active = false
        return "done"
    },
    new : function() {
        //Deprecate, replace with constructor
        console.error("globalTimer.new is deprecated; please use the constructor instead")
        return new Object(this)
    },
    loopIterator : function(callback) {
        this.activeCallback = setTimeout( () => {
            if (this.time>1) {
                this.time--
                this.loopIterator(callback)
            } else {
                this.time = 0
                this.active = false
                callback()
            }
        },1000)
    }
}
function Timer (name) {
    this.name = name
    this.time = 0
    this.active = false
    this.activeCallback = null
    this.startTimer = (setTime, callback) => {
        this.time = setTime
        this.active = true
        console.log(`Alert! ${this.name} started with ${this.time} seconds.`)
        this.loopIterator(callback)
    }
    this.stopTimer = () => {
        console.log(`Alert! ${this.name} stopped with ${this.time} seconds.`)
        clearTimeout(this.activeCallback)
        this.activeCallback = null
        this.active = false
        return "done"
    }
    this.loopIterator = (callback) => {
        this.activeCallback = setTimeout( () => {
            if (this.time>1) {
                this.time--
                this.loopIterator(callback)
            } else {
                console.log(`${this.name} expired!`)
                this.time = 0
                this.active = false
                callback()
            }
        },1000)
    }

}
module.exports = { globalTimer, Timer }

//test
/*
myTimer = globalTimer.new()
var setPoint = 12
var initTime = Date.now()
myTimer.startTimer(setPoint, ()=>{
    const diff = (Date.now() - initTime)
    console.log("Timer done @ " + diff + "ms. Deviation is " + (diff - 1000 * setPoint) + "ms.")
})
*/