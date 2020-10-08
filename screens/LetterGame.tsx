import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';

import { Text, View, Button} from '../components/Themed';
var { RockPolisher } = require("../components/LetterAnswerCompiler.js")


export default function LetterGame( { navigation } ) {
	const [currentQuestionSet, setQuestionState ] = React.useState(RockPolisher())
	const [ answerState, setAnswerState] = React.useState("000000")
	const [ timer, setTimer] = React.useState(0)
	const [ init, setInit ] = React.useState(true)
	const [stopTimer, setStop] = React.useState(false)
	const [ timerIDs, setIDs] = React.useState([])

function stoptime () {
	for(let i = 0; i < timerIDs.length; i++) {
		var current = timerIDs.pop()
		clearTimeout(current)
	}
}
function nicetimer() {
	setIDs([])
	setInit(false)
	setTimer(7)
	var cache = []
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(6)
		}
	}, 1000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(5)
		}
	}, 2000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(4)
		}
	}, 3000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(3)
		}
	}, 4000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(2)
		}
	}, 5000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			setTimer(1)
		}
	}, 6000))
	cache.push(setTimeout(() => {
		if (!stopTimer) {
			stoptime()
			setTimer(0)
			nextQuestion()
		}
	}, 7000))
	setIDs(cache)
}
if (init) {
	nicetimer()
}

	
	function nextQuestion () {
		
		setAnswerState("111111")
		setStop(true)
		stoptime()
		setTimeout( () => {
			setQuestionState(RockPolisher())
			setAnswerState("000000")
			nicetimer()
			setStop(false)
		}, 3000)
		//must cite https://www.sitepoint.com/delay-sleep-pause-wait/
	}
	
	return (
		
   <View style={styles.largeContainer}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	<Button style={styles.backButton}
		title = "Back"
		onPress={() => navigation.navigate("TabOneScreen")}
		/>
   <View style={styles.container}>

      <Text style={styles.title}>Transliterate</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	<Text style={styles.title}>{currentQuestionSet.prompt}</Text>

	  <View style={styles.buttonRow}>
		<Button
			title = {currentQuestionSet.buttons[0].sound}
			onPress={() => { setAnswerState("1" + answerState.substring(1))
			if (currentQuestionSet.buttons[0].isRight) {
				setTimer(0)
				nextQuestion()
			}
		}}
			color = {(parseFloat(answerState[0]) ? (currentQuestionSet.buttons[0].isRight ? "#00FF00" : "#FF0000") : "#2196F3")}
		/>
		<Button
			title = {currentQuestionSet.buttons[1].sound}
			onPress={() => {
				setAnswerState(answerState.substring(0,1) + "1" + answerState.substring(2))
				if (currentQuestionSet.buttons[1].isRight) {
					setTimer(0)
					nextQuestion()
				}
			}}
			color = {(parseFloat(answerState[1]) ? (currentQuestionSet.buttons[1].isRight ? "#00FF00" : "#FF0000") : "#2196F3")}
		/>
		<Button
			title = {currentQuestionSet.buttons[2].sound}
			onPress={() => {
				setAnswerState(answerState.substring(0,2) + "1" + answerState.substring(3))
				if (currentQuestionSet.buttons[2].isRight) {
					setTimer(0)
					nextQuestion()
				}
			}}
			color = {(parseFloat(answerState[2]) ? (currentQuestionSet.buttons[2].isRight ? "#00FF00" : "#FF0000") : "#2196F3")}
		/>
		<Button
			title = {currentQuestionSet.buttons[3].sound}
			onPress={() => {
				setAnswerState(answerState.substring(0,3) + "1" + answerState.substring(4))
				if (currentQuestionSet.buttons[3].isRight) {
					setTimer(0)
					nextQuestion()
				}
			}}
			color = {(parseFloat(answerState[3]) ? (currentQuestionSet.buttons[3].isRight ? "#00FF00" : "#FF0000") : "#2196F3")}
		/>
		<Button
			title = {currentQuestionSet.buttons[4].sound}
			onPress={() => {setAnswerState(answerState.substring(0,4) + "1")
			if (currentQuestionSet.buttons[4].isRight) {
				setTimer(0)
				nextQuestion()
			}
		}}
			color = {(parseFloat(answerState[4]) ? (currentQuestionSet.buttons[4].isRight ? "#00FF00" : "#FF0000") : "#2196F3")}
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
	  	alignContent: "center",
		width: "50%",
  },
});
