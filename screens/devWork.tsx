import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Alert, Modal, Pressable, ToastAndroid } from 'react-native';
import { HebrewText } from '../components/StyledText';
import { Text, View, Button} from '../components/Themed';
import * as Font from 'expo-font';
var palette = require("../assets/globalColorScheme.json")
var { finalAnswer } = require("../components/wordAnswerGen.js")
const { globalTimer } = require("../components/timers.js")
import { loadAsync } from 'expo-font';
import { makeAutoObservable } from "mobx"
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
var myTimer = globalTimer.new()
makeAutoObservable(myTimer)
const devWorks = observer(( { route, navigation }) => {
//  export default function devWorks( { route, navigation }) {
  
    return (
        <View style={styles.container}>
            <Pressable><Text style={styles.title}>DEVELOPMENT PAGE</Text></Pressable>
            <Text>Today's project: MobX Word Games.</Text>
            
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
  