import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { StyleSheet, Alert, Image } from 'react-native';
import { sanitize } from '../components/JSONSanitizer.js'
import { Text, View, Button} from '../components/Themed';
import { wordDataGlobal, setWordDataGlobal } from '../components/wordDataManager.js';
import Navigation from '../navigation';
var palette = require("../assets/globalColorScheme.json")
var localJSON = require('../assets/wordData.json')

var setWordData = async (value) => {
    try {
        
      var jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('wordData', jsonValue)
    } catch(e) {
        console.error("Error saving JSON!")
      // save error
    }
  
    console.log('wordData written: ' + jsonValue.length + " lines.")
  }

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
  }

export default function WelcomeScreen( { navigation } ) {
  storeData("newUser", "false")


    return (
        <View style={styles.largeContainer}>
            <Text style={styles.title}>
                Welcome to SmartHebrewFlashcards!
            </Text>
            <Text style={styles.body}>
                We're detecting that you are a new user.
                Would you like to load the latest word data
                from the Internet (recommended) or load the
                local (possibly outdated) version?
            </Text>
            <Button
            title='Load from web'
            disabled={true}
            onPress={()=>{
              console.log("Fetching from web...")
                fetch('https://raw.githubusercontent.com/dagr1234/SmartHebrewFlashcards/master/data.json?token=GHSAT0AAAAAABV3OWJR6JTTVC5OUJJZAJBEYWW4CHA')
                    .then(response => {
                      console.log("Fetch complete.")
                      return response.text()
                    })
                    .then(data => setWordData(JSON.parse(sanitize(data))))
                    .then(() => navigation.navigate("TabOneScreen"))
            }}
            />
            <Button
            title='Load from local'
            onPress={()=>{
                setWordData(localJSON)
                setWordDataGlobal(localJSON)
                navigation.navigate("Root")
            }}
            />
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
  