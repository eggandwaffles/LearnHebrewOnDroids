import AsyncStorage from '@react-native-async-storage/async-storage';

var progressData = []
var currentScore = 0
var sessionScore = 0
function LogProgress (correct, answerString, time, hebrewData, type) {
    this.correctAnswer = correct
    var sum = 0
        for (let i = 0; i<answerString.length;i++) {
            sum += Number.parseFloat(answerString[i])
        }
    this.guesses = sum
    this.timeRemaining = time
    this.depiction = hebrewData
    this.questionType = type
    progressData.push(this)
}

function LogScore (deltaScore) {
    currentScore += deltaScore
    crossCheckHighScore(currentScore)
} 

function getCurrentScore () {
    return currentScore
}

function getSessionScore () {
    return sessionScore
}


const refreshHighScore = async () => {
    try {
      var stringScore = await AsyncStorage.getItem('highScore')
      sessionScore = Number.parseFloat(stringScore)

    } catch(e) {
      // read error
    }
}

const crossCheckHighScore = async (comparable) => {
    try {
      var stringScore = await AsyncStorage.getItem('highScore')
      var numScore = Number.parseFloat(stringScore)
      console.log("Current high score: " + numScore + " Current score: " + comparable)
      if (comparable > numScore || !numScore) {
        await AsyncStorage.setItem('highScore', comparable.toString())
        console.log("Set high score to " + comparable)
      } 
      refreshHighScore()
    } catch(e) {
      // read error
    }
}
const overrideSetScore = async (set) => {
    await AsyncStorage.setItem('highScore', set.toString())
}

function getProgressData () {
    return progressData
}
module.exports = { LogProgress, LogScore, overrideSetScore, getCurrentScore, getSessionScore, refreshHighScore, getProgressData }