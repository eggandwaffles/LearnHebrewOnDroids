import * as React from 'react';
import { StyleSheet, Alert, Image, Pressable } from 'react-native';
import { ImageFetch } from '../components/LetterLookup';
import {Text, View, Button} from '../components/Themed';
import { HebrewText } from '../components/StyledText';
import { getCurrentScore, getSessionScore, getProgressData } from '../components/progressDataManager'
import { FlatList } from 'react-native-gesture-handler';
import { parseIsolatedEntityName } from 'typescript';
var { finalAnswer } = require("../components/wordAnswerGen.js")
var palette = require("../assets/globalColorScheme.json")


export default function ProgressScreen( { navigation } ) {
  //Alert.alert("Warning!","This content is not functional!")  
  var DATA =  getProgressData()

    const renderItemTranslit = ({item}) => {
        
        if (item.questionType == "translit") {
            console.log("Rendering a translit item")
            return (
                <View style={styles.listItem}>
                    <HebrewText>{item.depiction + " | " + item.timeRemaining + "s | " + (item.correctAnswer ? `\u{1F44D}` : `\u{1F44E}`) + " | " + item.guesses}</HebrewText>
                </View>
            )
        } else {
            console.log("Rendering a translate item")
            return <View />
        }
    }
    const renderItemTranslate = ({item}) => {
        
      if (item.questionType == "translate") {
          console.log("Rendering a translate item")
          return (
              <View style={styles.listItem}>
                  <HebrewText>{item.depiction + " | " + item.timeRemaining + "s | " + (item.correctAnswer ? `\u{1F44D}` : `\u{1F44E}`) + " | " + item.guesses}</HebrewText>
              </View>
          )
      } else {
          console.log("Rendering a translit item")
          return <View />
      }
  }
  return (
    <View style={styles.largeContainer}>
<View style={styles.container}>

<Image source={require("../assets/images/UnderConstructionBanner.png")} style={{ width: 250, height: 25}} />
<HebrewText style={{fontSize: 50}}>{
  finalAnswer("all").letters


}
</HebrewText>

  <Text style={styles.title}>Progress</Text>
  <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
<Text style={styles.body}>{"YOUR SCORE: " + getCurrentScore()}</Text>
  <Text style={styles.body}>{"HIGH SCORE: " + getSessionScore()}</Text>
  </View>
  <View style={{flexDirection: 'row', flex: 1, alignContent: 'center', justifyContent: 'center'}}>
    <View style={styles.blueContainer}>
    <Text style={styles.body}>Transliterations:</Text>
            <FlatList 
                data={DATA}
                renderItem={renderItemTranslit}
                
            />
    </View>
      
    <View style={styles.blueContainer}>
    <Text style={styles.body}>Translations:</Text>
            <FlatList
                data={DATA}
                renderItem={renderItemTranslate}
                
            />
     
    </View>
      
    
</View>
    </View>
    



  );
}

const styles = StyleSheet.create({
    dropdown: {
        margin: 16,
        height: 50,
        width: 300,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
  
        elevation: 2,
      },
    listItem: {
        flexDirection: 'row',
        alignContent: "center"
    },
    listText: {
        justifyContent: "flex-start"
    },
    listSwitch: {
        justifyContent: "flex-end"
    },
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
    blueContainer: {
      borderRadius: 1,
      backgroundColor: palette.interactable,
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
    divider: {
        marginVertical: 15,
        height: 1,
        width: '100%',
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