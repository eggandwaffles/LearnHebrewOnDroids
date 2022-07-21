import { FontAwesome } from '@expo/vector-icons';
import React, {useEffect} from 'react';
import { StyleSheet, Alert, BackHandler } from 'react-native';
import { HebrewText } from '../components/StyledText';
import { Text, View, Button} from '../components/Themed';
import * as Font from 'expo-font';
import { loadAsync } from 'expo-font';
//https://docs.expo.io/versions/latest/sdk/font/
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { configure } from "mobx"
const { globalTimer, Timer } = require("../components/timers.js")
var palette = require("../assets/globalColorScheme.json") 
var { RockPolisher } = require("../components/LetterAnswerCompiler.js")
import { LogProgress, LogScore, currentScore } from '../components/progressDataManager'
async function loadfonts () {
	await loadAsync({
		'TaameyAshkenaz': {
			uri: require('../assets/fonts/TaameyAshkenaz-Bold.ttf')
		  },
		});
		
}
const letterGamePointValue = 1
loadfonts()
var letTimer = new Timer("letTimer")
makeAutoObservable(letTimer)
const LetterGame =  observer(( { route, navigation } ) => {
	const [currentQuestionSet, setQuestionState ] = React.useState(RockPolisher())
	const [ answerState, setAnswerState] = React.useState("000000")
	const [ timer, setTimer] = React.useState(0)
	const [ init, setInit ] = React.useState(true)
	const [stopTimer, setStop] = React.useState(false)
	const [ timerIDs, setIDs] = React.useState([])



const backAction = () => {
	letTimer.stopTimer()
		navigation.navigate("TabOneScreen")
}
useEffect(() => {
	BackHandler.addEventListener("hardwareBackPress", backAction);

	return () =>
	  BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);


  if (route.params.init) {
	//setStop(false)
	navigation.setParams({
		init : false
	})
	//setInit(false)
	//console.log("Init code called on lit. Params are " + JSON.stringify(route.params))
	setTimeout(() => {
		letTimer.startTimer(7, () => {
			nextQuestion(false)
		})
	},100)

}
	
	function nextQuestion (timeNotExpired) {
		LogProgress(timeNotExpired, answerState,letTimer.time,currentQuestionSet.prompt, "translit")
		setAnswerState("111111")
		letTimer.stopTimer()
		
		setTimeout( () => {
			setQuestionState(RockPolisher())
			setAnswerState("000000")
			navigation.setParams({
				init : true
			})
		}, 1200)
		//must cite https://www.sitepoint.com/delay-sleep-pause-wait/
	}
	
	return (
		
   <View style={styles.largeContainer}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


   <View style={styles.container}>

      <Text style={styles.title}>Transliterate</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	<HebrewText style={{fontSize: 50}}>{currentQuestionSet.prompt}</HebrewText>

	  <View style={styles.buttonRow}>
		<Button
			title = {currentQuestionSet.buttons[0].sound}
			onPress={() => { 
			if (currentQuestionSet.buttons[0].isRight) {
				LogScore(letterGamePointValue)
				letTimer.stopTimer()
				nextQuestion(true)
			} else {
				LogScore(-letterGamePointValue)
			}
			setAnswerState("1" + answerState.substring(1))
		}}
			color = {(parseFloat(answerState[0]) ? (currentQuestionSet.buttons[0].isRight ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		<Button
			title = {currentQuestionSet.buttons[1].sound}
			onPress={() => {
				
				if (currentQuestionSet.buttons[1].isRight) {
					LogScore(letterGamePointValue)
					letTimer.stopTimer()
					nextQuestion(true)
				} else {
					LogScore(-letterGamePointValue)
				}
				setAnswerState(answerState.substring(0,1) + "1" + answerState.substring(2))
			}}
			color = {(parseFloat(answerState[1]) ? (currentQuestionSet.buttons[1].isRight ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		<Button
			title = {currentQuestionSet.buttons[2].sound}
			onPress={() => {
				
				if (currentQuestionSet.buttons[2].isRight) {
					LogScore(letterGamePointValue)
					letTimer.stopTimer()
					nextQuestion(true)
				} else {
					LogScore(-letterGamePointValue)
				}
				setAnswerState(answerState.substring(0,2) + "1" + answerState.substring(3))
			}}
			color = {(parseFloat(answerState[2]) ? (currentQuestionSet.buttons[2].isRight ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		<Button
			title = {currentQuestionSet.buttons[3].sound}
			onPress={() => {
				
				if (currentQuestionSet.buttons[3].isRight) {
					LogScore(letterGamePointValue)
					letTimer.stopTimer()
					nextQuestion(true)
				} else {
					LogScore(-letterGamePointValue)
				}
				setAnswerState(answerState.substring(0,3) + "1" + answerState.substring(4))
			}}
			color = {(parseFloat(answerState[3]) ? (currentQuestionSet.buttons[3].isRight ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		<Button
			title = {currentQuestionSet.buttons[4].sound}
			onPress={() => {
			if (currentQuestionSet.buttons[4].isRight) {
				LogScore(letterGamePointValue)
				letTimer.stopTimer()
				nextQuestion(true)
			} else {
				LogScore(-letterGamePointValue)
			}
			setAnswerState(answerState.substring(0,4) + "1")
		}}
			color = {(parseFloat(answerState[4]) ? (currentQuestionSet.buttons[4].isRight ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		</View>
	<Text style={styles.body}>{"\nTime Remaining: " + letTimer.time}</Text>
	<Text style={styles.body}>{"\nScore: " + currentScore}</Text>
	</View>
	</View>
	)
})
export default LetterGame

const styles = StyleSheet.create({
  largeContainer: {
	color: "#FFFFFF",
	flex: 2,
	justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',

  },
  title: {
	fontFamily: 'TaameyAshkenaz',
    fontSize: 30,
    fontWeight: 'bold',
  },
  body: {
	  fontSize: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonRow: {
	flex: 0.8,
	flexDirection: 'column',
	justifyContent: "space-between",
	width: "50%",
	marginTop: 50,
	position: "relative",
  },
  backButton: {
		width: "50%",
  },
});
