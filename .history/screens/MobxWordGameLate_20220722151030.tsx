import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, Alert, Modal, StatusBar, BackHandler } from 'react-native';
import { HebrewText } from '../components/StyledText';
import { Text, View, Button} from '../components/Themed';
import * as Font from 'expo-font';
var palette = require("../assets/globalColorScheme.json")
var { finalAnswer } = require("../components/wordAnswerGen.js")
import { loadAsync } from 'expo-font';
const { globalTimer, Timer } = require("../components/timers.js")
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react"
import { configure } from "mobx"
import { NavigationContainer } from '@react-navigation/native';
import { LogProgress, LogScore, getCurrentScore } from '../components/progressDataManager'

configure({
    enforceActions: "never",
})
//https://docs.expo.io/versions/latest/sdk/font/
async function loadfonts () {
	await loadAsync({
		'TaameyAshkenaz': {
			uri: require('../assets/fonts/TaameyAshkenaz-Bold.ttf')
		  },
		});
		
}
var lateTimer = new Timer("lateTimer")
//console.log("Timer created on late!")
makeAutoObservable(lateTimer)
var wordGamePointValue = 3

loadfonts()
const MobxWordGameLate = observer(( { route, navigation } ) => {
	const [currentQuestionSet, setQuestionState ] = React.useState(route.params.qData)
	const [ answerState, setAnswerState] = React.useState("000000")
	const [ timer, setTimer] = React.useState(0)
	const [ init, setInit ] = React.useState(true)
	//const [stopTimer, setStop] = React.useState(false)
	var stopTimer = false
	const [ timerIDs, setIDs] = React.useState([])
	const [hinted, setHint] = React.useState(false)

	const backAction = () => {
		lateTimer.stopTimer()
		navigation.navigate("TabThreeScreen")
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
		lateTimer.startTimer(12, () => {
			nextQuestion(false)
		})
	}
	function nextQuestion (timeNotExpired) {
		LogProgress(timeNotExpired, answerState, lateTimer.time, currentQuestionSet.letters, "translate")

		setAnswerState("111111")
		//setStop(true)
		lateTimer.stopTimer()
		setTimeout( () => {
			//console.log("Issued command to navigate to lit")
			navigation.navigate('MobxWordGameLit', { 'cats': route.params.cats, "init": true})
			setAnswerState("000000")
			setHint(false)
			//nicetimer()
			//setStop(false)
			//setQuestionState(finalAnswer(route.params.cats))
		}, 1200)
		//must cite https://www.sitepoint.com/delay-sleep-pause-wait/
	}
	//console.log("MobxWordGameLate called!")
	return (
		
   <View style={styles.largeContainer}>
<StatusBar hidden={true}></StatusBar>

   <View style={styles.container}>
   <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />


      <Text style={styles.title}>Translate</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	<HebrewText style={{fontSize: 50}}>{currentQuestionSet.letters}</HebrewText>

	  <View style={styles.buttonRow}>
	  <Button
			title = {currentQuestionSet.TranslateOptions[0]}
			onPress={() => { setAnswerState("1" + answerState.substring(1))
			if (currentQuestionSet.TranslateOptions[0] === currentQuestionSet.CorrectTranslate && !parseFloat(answerState[0])) {
				LogScore(wordGamePointValue)
				lateTimer.stopTimer()
				nextQuestion(true)
			} else {
				LogScore(-wordGamePointValue)
			}
		}}
			color = {(parseFloat(answerState[0]) ? (currentQuestionSet.TranslateOptions[0] === currentQuestionSet.CorrectTranslate ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		<Button
			title = {currentQuestionSet.TranslateOptions[1]}
			onPress = {() => {
				setAnswerState(answerState.substring(0,1) + "1" + answerState.substring(2))
				if (currentQuestionSet.TranslateOptions[1] === currentQuestionSet.CorrectTranslate && !parseFloat(answerState[1])) {
					LogScore(wordGamePointValue)
					lateTimer.stopTimer()
					nextQuestion(true)
				} else {
					LogScore(-wordGamePointValue)
				}
			}}
			color = {(parseFloat(answerState[1]) ? (currentQuestionSet.TranslateOptions[1] === currentQuestionSet.CorrectTranslate ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		<Button
			title = {currentQuestionSet.TranslateOptions[2]}
			onPress={() => {
				setAnswerState(answerState.substring(0,2) + "1" + answerState.substring(3))
				if (currentQuestionSet.TranslateOptions[2] === currentQuestionSet.CorrectTranslate && !parseFloat(answerState[2])) {
					LogScore(wordGamePointValue)
                    lateTimer.stopTimer()
					nextQuestion(true)
					
				} else {
					LogScore(-wordGamePointValue)
				}
			}}
			color = {(parseFloat(answerState[2]) ? (currentQuestionSet.TranslateOptions[2] === currentQuestionSet.CorrectTranslate ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		<Button
			title = {currentQuestionSet.TranslateOptions[3]}
			onPress={() => {
				setAnswerState(answerState.substring(0,3) + "1" + answerState.substring(4))
				if (currentQuestionSet.TranslateOptions[3] === currentQuestionSet.CorrectTranslate && !parseFloat(answerState[3])) {
					LogScore(wordGamePointValue)
					lateTimer.stopTimer()
					nextQuestion(true)
				} else {
					LogScore(-wordGamePointValue)
				}
			}}
			color = {(parseFloat(answerState[3]) ? (currentQuestionSet.TranslateOptions[3] === currentQuestionSet.CorrectTranslate ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		<Button
			title = {currentQuestionSet.TranslateOptions[4]}
			onPress={() => {setAnswerState(answerState.substring(0,4) + "1")
			if (currentQuestionSet.TranslateOptions[4] === currentQuestionSet.CorrectTranslate && !parseFloat(answerState[4])) {
				LogScore(wordGamePointValue)
				lateTimer.stopTimer()
				nextQuestion(true)
			} else {
				LogScore(-wordGamePointValue)
			}
		}}
			color = {(parseFloat(answerState[4]) ? (currentQuestionSet.TranslateOptions[4] === currentQuestionSet.CorrectTranslate ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		</View>
	<Text style={styles.body}>{"\nTime Remaining: " + lateTimer.time}</Text>
	<Text style={styles.body}>{"\nScore: " + getCurrentScore()}</Text>
	<Button
		title = { hinted ? currentQuestionSet.hint : "Get a Hint"}
		onPress = {()=>{
			setHint(true)
		}}
		color = {palette.hint}
	/>
	</View>
	</View>
	)
})

export default MobxWordGameLate
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
