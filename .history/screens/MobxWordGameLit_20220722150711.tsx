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
loadfonts()
var litTimer = new Timer("litTimer")
//console.log("Timer created on lit!")
makeAutoObservable(litTimer)
var wordGamePointValue = 3
const MobxWordGameLit = observer(( { route, navigation } ) => {
	const [currentQuestionSet, setQuestionState ] = React.useState(finalAnswer(route.params.cats))
	const [ answerState, setAnswerState] = React.useState("000000")
	const [ timer, setTimer] = React.useState(0)
	const [ init, setInit ] = React.useState(true)
	//const [stopTimer, setStop] = React.useState(false)
	var stopTimer = false
	const [ timerIDs, setIDs] = React.useState([])
	const [hinted, setHint] = React.useState(false)
	const backAction = () => {
		litTimer.stopTimer()
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
	//console.log("Init code called on lit. Params are " + JSON.stringify(route.params))
	setTimeout(() => {
		litTimer.startTimer(12, () => {
			nextQuestion(false)
		})
	},100)

}

	
	function nextQuestion (timeNotExpired) {
		//console.log("nextQuestion invoked!")
		LogProgress(timeNotExpired, answerState, litTimer.time, currentQuestionSet.letters, "translit")
		setAnswerState("111111")
		//setStop(true)
		litTimer.stopTimer()
		setTimeout( () => {
			navigation.navigate('MobxWordGameLate', {"cats": route.params.cats, "qData": currentQuestionSet, "init" : true})
			setTimeout(() => {
				setAnswerState("000000")
				setQuestionState(finalAnswer(route.params.cats))
			},200)
			
			//setInit(true)
		}, 1200)
		
		//must cite https://www.sitepoint.com/delay-sleep-pause-wait/
	}
	//console.log("MobxWordGameLit called!")
	return (
   <View style={styles.largeContainer}>
      <StatusBar hidden={true}></StatusBar>

	

   <View style={styles.container}>
   <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <Text style={styles.title}>Transliterate</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	<HebrewText style={{fontSize: 50}}>{currentQuestionSet.letters}</HebrewText>

	  <View style={styles.buttonRow}>
		<Button
			title = {currentQuestionSet.TranslitOptions[0]}
			onPress={() => { setAnswerState("1" + answerState.substring(1))
			if (currentQuestionSet.TranslitOptions[0] === currentQuestionSet.CorrectTranslit && !parseFloat(answerState[0])) {
				LogScore(wordGamePointValue)
				litTimer.stopTimer()
				nextQuestion(true)
			} else {
				LogScore(-wordGamePointValue)
			}
		}}
			color = {(parseFloat(answerState[0]) ? (currentQuestionSet.TranslitOptions[0] === currentQuestionSet.CorrectTranslit ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		<Button
			title = {currentQuestionSet.TranslitOptions[1]}
			onPress = {() => {
				setAnswerState(answerState.substring(0,1) + "1" + answerState.substring(2))
				if (currentQuestionSet.TranslitOptions[1] === currentQuestionSet.CorrectTranslit && !parseFloat(answerState[1])) {
					LogScore(wordGamePointValue)
					litTimer.stopTimer()
					nextQuestion(true)
				} else {
					LogScore(-wordGamePointValue)
				}
			}}
			color = {(parseFloat(answerState[1]) ? (currentQuestionSet.TranslitOptions[1] === currentQuestionSet.CorrectTranslit ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		<Button
			title = {currentQuestionSet.TranslitOptions[2]}
			onPress={() => {
				setAnswerState(answerState.substring(0,2) + "1" + answerState.substring(3))
				if (currentQuestionSet.TranslitOptions[2] === currentQuestionSet.CorrectTranslit && !parseFloat(answerState[2])) {
					LogScore(wordGamePointValue)
                    litTimer.stopTimer()
					nextQuestion(true)
					
				} else {
					LogScore(-wordGamePointValue)
				}
			}}
			color = {(parseFloat(answerState[2]) ? (currentQuestionSet.TranslitOptions[2] === currentQuestionSet.CorrectTranslit ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		<Button
			title = {currentQuestionSet.TranslitOptions[3]}
			onPress={() => {
				setAnswerState(answerState.substring(0,3) + "1" + answerState.substring(4))
				if (currentQuestionSet.TranslitOptions[3] === currentQuestionSet.CorrectTranslit && !parseFloat(answerState[3])) {
					LogScore(wordGamePointValue)
					litTimer.stopTimer()
					nextQuestion(true)
				} else {
					LogScore(-wordGamePointValue)
				}
			}}
			color = {(parseFloat(answerState[3]) ? (currentQuestionSet.TranslitOptions[3] === currentQuestionSet.CorrectTranslit ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		<Button
			title = {currentQuestionSet.TranslitOptions[4]}
			onPress={() => {setAnswerState(answerState.substring(0,4) + "1")
			if (currentQuestionSet.TranslitOptions[4] === currentQuestionSet.CorrectTranslit && !parseFloat(answerState[4])) {
				LogScore(wordGamePointValue)
				litTimer.stopTimer()
				nextQuestion(true)
			} else {
				LogScore(-wordGamePointValue)
			}
		}}
			color = {(parseFloat(answerState[4]) ? (currentQuestionSet.TranslitOptions[4] === currentQuestionSet.CorrectTranslit ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		</View>
	<Text style={styles.body}>{"\nTime Remaining: " + litTimer.time}</Text>
	<Text style={styles.body}>{"\nScore: " + getCurrentScore()}</Text>
	</View>
	</View>
	)
})

export default MobxWordGameLit

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
