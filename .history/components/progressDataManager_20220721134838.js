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
      var currentScore = await AsyncStorage.getItem('highScore')
      console.log("Current high score: " + currentScore)
      if (comparable > currentScore) {
        await AsyncStorage.setItem('highScore', comparable)
        console.log("Set high score to " + comparable)
      }
    } catch(e) {
      // read error
    }
}

module.exports = { LogProgress, LogScore }