import AsyncStorage from '@react-native-async-storage/async-storage';

var progressData = []
var currentScore = 0
function LogProgress (correct, answerString, time, hebrewData, type) {
    this.correctAnswer = correct
    this.guesses = () => {
        var sum = 0
        for (let i = 0; i<answerString.length;i++) {
            sum += Number.parseFloat(answerString[i])
        }
        return sum
    }
    this.timeRemaining = time
    this.depiction = hebrewData
    this.questionType = type
    progressData.push(this)
}

function LogScore (deltaScore) {
    currentScore += deltaScore
    crossCheckHighScore(currentScore)
} 

const crossCheckHighScore = async (comparable) => {
    try {
      var currentScore = Number.parseFloat(await AsyncStorage.getItem('highScore'))
      console.log("Current high score: " + currentScore + " Current score: " + comparable)
      if (comparable > currentScore) {
        await AsyncStorage.setItem('highScore', comparable.toString())
        console.log("Set high score to " + comparable)
      }
    } catch(e) {
      // read error
    }
}
const overrideSetScore = async (set) => {
    await AsyncStorage.setItem('highScore', set.toString())
}
module.exports = { LogProgress, LogScore, overrideSetScore, currentScore }