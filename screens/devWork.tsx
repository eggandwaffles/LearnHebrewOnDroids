import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Alert, Modal, Pressable, ToastAndroid } from 'react-native';
import { HebrewText } from '../components/StyledText';
import { Text, View, Button} from '../components/Themed';
import * as Font from 'expo-font';
var palette = require("../assets/globalColorScheme.json")
var { finalAnswer } = require("../components/wordAnswerGen.js")
const { globalTimer, Timer } = require("../components/timers.js")
import { loadAsync } from 'expo-font';
import { makeAutoObservable, makeObservable} from "mobx"
import { observer } from "mobx-react"
//https://docs.expo.io/versions/latest/sdk/font/
async function loadfonts () {
	await loadAsync({
		'TaameyAshkenaz': {
			uri: require('../assets/fonts/TaameyAshkenaz-Bold.ttf')
		  },
		});
		
}
loadfonts()
var myTimer = new Timer()
makeAutoObservable(myTimer)

const devWorks = observer(( { route, navigation }) => {
//  export default function devWorks( { route, navigation }) {
  
    return (
        <View style={styles.container}>
            <Pressable><Text style={styles.title}>DEVELOPMENT PAGE</Text></Pressable>
            <Text>Today's project: Build Back (Button) Better</Text>
            
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text>Debug Tools</Text>
            <Button
            title={"Request Console Message"}
            onPress = {()=>{
              ToastAndroid.show("Message logged to console.", ToastAndroid.SHORT)
              console.log("test test test 1 2 3")
            }}
            />
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text>Timers</Text>
            <Button styles={styles.button}
                title = {"Start Timer"}
                onPress = {()=>{
                    ToastAndroid.show("Timer STARTED!", ToastAndroid.SHORT)
                    myTimer.startTimer(5, ()=>{
                        ToastAndroid.show("YEAH TOAST!", ToastAndroid.SHORT)
                        console.log("Toasted!")
                    })
                }}
                color = { palette.correct }
            />
            <Button styles={styles.button}
                title = {"Stop Timer"}
                onPress = {()=>{
                    ToastAndroid.show("Timer STOPPED!", ToastAndroid.SHORT)
                    myTimer.stopTimer()
                }}
                color = { palette.incorrect }
            />
            <Text>{myTimer.time}</Text>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <Text>Unit Testing</Text>
            <Button styles={styles.button}
            title = {"MobX Word Game"}
            onPress = {()=>{
              navigation.navigate('MobxWordGameLit', {"cats" : "all", "init" : true} )
            }}
            />
            <Button styles={styles.button}
            title = {"Prototype Selection"}
            onPress = {()=>{
              navigation.navigate('protoSelector')
            }}
            />
            <Button styles={styles.button}
            title = {"Letter View"}
            onPress = {()=>{
              navigation.navigate('LetterNameView')
            }}
            />
            <Button styles={styles.button}
            title = {"Vowel View"}
            onPress = {()=>{
              navigation.navigate('VowelViewer')
            }}
            />
            <Button styles={styles.button}
            title = {"Dictionary View"}
            onPress = {()=>{
              navigation.navigate('DictionaryView')
            }}
            />
            
        </View>
    )
})
//module.exports = { devWorks }
export default devWorks
const styles = StyleSheet.create({
    largeContainer: {
      color: "#FFFFFF",
      flex: 2,
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
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
  