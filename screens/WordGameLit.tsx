import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Alert, Modal } from 'react-native';
import { HebrewText } from '../components/StyledText';
import { Text, View, Button} from '../components/Themed';
import * as Font from 'expo-font';
var palette = require("../assets/globalColorScheme.json")
var { finalAnswer } = require("../components/wordAnswerGen.js")
import { loadAsync } from 'expo-font';
//https://docs.expo.io/versions/latest/sdk/font/
async function loadfonts () {
	await loadAsync({
		'TaameyAshkenaz': {
			uri: require('../assets/fonts/TaameyAshkenaz-Bold.ttf')
		  },
		});
		
}
loadfonts()
export default function WordGameLit( { route, navigation } ) {
	const [currentQuestionSet, setQuestionState ] = React.useState(finalAnswer(route.params.cats))
	const [ answerState, setAnswerState] = React.useState("000000")
	const [ timer, setTimer] = React.useState(0)
	const [ init, setInit ] = React.useState(true)
	const [stopTimer, setStop] = React.useState(false)
	const [ timerIDs, setIDs] = React.useState([])
	const [hinted, setHint] = React.useState(false)

function stoptime() {
	for(let i = 0; i < timerIDs.length; i++) {
		var current = timerIDs[i]
		clearTimeout(current)
	}
}
function nicetimer() {
	setIDs([])
	setInit(false)
	setTimer(12)
	setStop(false)
	var cache = []
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(11)
		}
	}, 1000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(10)
		}
	}, 2000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(9)
		}
	}, 3000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(8)
		}
	}, 4000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(7)
		}
	}, 5000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(6)
		}
	}, 6000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(5)
		}
	}, 7000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(4)
		}
	}, 8000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(3)
		}
	}, 9000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(2)
		}
	}, 10000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(1)
		}
	}, 11000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			stoptime()
			setTimer(0)
			nextQuestion()
		}
	}, 12000))
	setIDs(cache)
}
if (init) {
	setStop(false)
	nicetimer()
}

	
	function nextQuestion () {
		
		setAnswerState("111111")
		setStop(true)
		setTimer(12)
		stoptime()
		setTimeout( () => {
			navigation.navigate('WordGameLate', {"cats": route.params.cats, "qData": currentQuestionSet})
			setAnswerState("000000")
			//nicetimer()
			//setStop(false)
			setInit(true)
			navigation.navigate('WordGameLate', {"cats": route.params.cats, "qData": currentQuestionSet})
			setQuestionState(finalAnswer(route.params.cats))
		}, 3000)
		//must cite https://www.sitepoint.com/delay-sleep-pause-wait/
	}
	
	return (
		
   <View style={styles.largeContainer}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

	<Button
		
		title = "Back"
		onPress={() => {
			navigation.navigate("TabThreeScreen")
			setStop(true)
			stoptime()
		}}
		color = {palette.attention}
		/>

   <View style={styles.container}>

      <Text style={styles.title}>Transliterate</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	<HebrewText style={{fontSize: 50}}>{currentQuestionSet.letters}</HebrewText>

	  <View style={styles.buttonRow}>
		<Button
			title = {currentQuestionSet.TranslitOptions[0]}
			onPress={() => { setAnswerState("1" + answerState.substring(1))
			if (currentQuestionSet.TranslitOptions[0] === currentQuestionSet.CorrectTranslit) {
				setTimer(0)
				stoptime()
				nextQuestion()
			}
		}}
			color = {(parseFloat(answerState[0]) ? (currentQuestionSet.TranslitOptions[0] === currentQuestionSet.CorrectTranslit ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		<Button
			title = {currentQuestionSet.TranslitOptions[1]}
			onPress = {() => {
				setAnswerState(answerState.substring(0,1) + "1" + answerState.substring(2))
				if (currentQuestionSet.TranslitOptions[1] === currentQuestionSet.CorrectTranslit) {
					setTimer(0)
					stoptime()
					nextQuestion()
				}
			}}
			color = {(parseFloat(answerState[1]) ? (currentQuestionSet.TranslitOptions[1] === currentQuestionSet.CorrectTranslit ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		<Button
			title = {currentQuestionSet.TranslitOptions[2]}
			onPress={() => {
				setAnswerState(answerState.substring(0,2) + "1" + answerState.substring(3))
				if (currentQuestionSet.TranslitOptions[2] === currentQuestionSet.CorrectTranslit) {
					setTimer(0)
					stoptime()
					nextQuestion()
					
				}
			}}
			color = {(parseFloat(answerState[2]) ? (currentQuestionSet.TranslitOptions[2] === currentQuestionSet.CorrectTranslit ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		<Button
			title = {currentQuestionSet.TranslitOptions[3]}
			onPress={() => {
				setAnswerState(answerState.substring(0,3) + "1" + answerState.substring(4))
				if (currentQuestionSet.TranslitOptions[3] === currentQuestionSet.CorrectTranslit) {
					setTimer(0)
					stoptime()
					nextQuestion()
				}
			}}
			color = {(parseFloat(answerState[3]) ? (currentQuestionSet.TranslitOptions[3] === currentQuestionSet.CorrectTranslit ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		<Button
			title = {currentQuestionSet.TranslitOptions[4]}
			onPress={() => {setAnswerState(answerState.substring(0,4) + "1")
			if (currentQuestionSet.TranslitOptions[4] === currentQuestionSet.CorrectTranslit) {
				setTimer(0)
				stoptime()
				nextQuestion()
			}
		}}
			color = {(parseFloat(answerState[4]) ? (currentQuestionSet.TranslitOptions[4] === currentQuestionSet.CorrectTranslit ? (palette.correct) : (palette.incorrect)) : (palette.interactable))}
		/>
		</View>
	<Text style={styles.body}>{"\nTime Remaining: " + timer}</Text>
	</View>
	</View>
	)
}

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
