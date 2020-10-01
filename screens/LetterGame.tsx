import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';

import { Text, View, Button} from '../components/Themed';
var { RockPolisher } = require("../components/LetterAnswerCompiler.js")


export default function LetterGame( { navigation } ) {
	const currentQuestionSet = RockPolisher()
	const [ answerState, setAnswerState] = React.useState("00000")
	return (
   <View style={styles.largeContainer}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
   	
	<Button style={styles.backButton}
		title = "Back"
		onPress={() => navigation.goBack()}
		/>
   <View style={styles.container}>

      <Text style={styles.title}>Transliterate</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	<Text style={styles.title}>{currentQuestionSet.prompt}</Text>

	  <View style={styles.buttonRow}>
		<Button
			title = {currentQuestionSet.buttons[0]}
			onPress={() => setAnswerState("1" + answerState.substring(1))}
			color = {parseFloat(answerState[0]) ? "#FF0000" : "#2196F3"}
		/>
		<Button
			title = {currentQuestionSet.buttons[1]}
			onPress={() => setAnswerState(answerState.substring(0,1) + "1" + answerState.substring(2))}
			color = {parseFloat(answerState[1]) ? "#FF0000" : "#2196F3"}
		/>
		<Button
			title = {currentQuestionSet.buttons[2]}
			onPress={() => setAnswerState(answerState.substring(0,2) + "1" + answerState.substring(3))}
			color = {parseFloat(answerState[2]) ? "#FF0000" : "#2196F3"}
		/>
		<Button
			title = {currentQuestionSet.buttons[3]}
			onPress={() => setAnswerState(answerState.substring(0,3) + "1" + answerState.substring(4))}
			color = {parseFloat(answerState[3]) ? "#FF0000" : "#2196F3"}
		/>
		<Button
			title = {currentQuestionSet.buttons[4]}
			onPress={() => setAnswerState(answerState.substring(0,4) + "1")}
			color = {parseFloat(answerState[4]) ? "#FF0000" : "#2196F3"}
		/>
		</View>
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
	  	alignContent: "flex-start",
		width: "50%",
  },
});
