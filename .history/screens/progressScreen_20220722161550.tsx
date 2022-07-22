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
//Old list item: <View style={styles.blueListItem}><HebrewText style={styles.body}>{item.depiction + "|" + item.timeRemaining + "s|" + (item.correctAnswer ? `\u{1F44D}` : `\u{1F44E}`) + "|" + item.guesses}</HebrewText></View>

export default function ProgressScreen( { navigation } ) {
  //Alert.alert("Warning!","This content is not functional!")  
  var DATA =  getProgressData()

    const renderItemTranslit = ({item}) => {
        
        if (item.questionType == "translit") {
            console.log("Rendering a translit item")
            return (
                <View style={{backgroundColor: palette.interactable, marginBottom: 10}}>
                    <View style={styles.blueListItem}><HebrewText style={styles.listText}>{item.depiction}</HebrewText><HebrewText style={styles.listText}>{item.timeRemaining + "s"}</HebrewText><HebrewText style={styles.listText}>{(item.correctAnswer ? `\u{1F44D}` : `\u{1F44E}`)}</HebrewText><HebrewText style={styles.listText}>{item.guesses}</HebrewText></View>

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
              <View style={{backgroundColor: palette.interactable, marginBottom: 10}}>
                  <View style={styles.blueListItem}><HebrewText style={styles.listText}>{item.depiction}</HebrewText><HebrewText style={styles.listText}>{item.timeRemaining + "s"}</HebrewText><HebrewText style={styles.listText}>{(item.correctAnswer ? `\u{1F44D}` : `\u{1F44E}`)}</HebrewText><HebrewText style={styles.listText}>{item.guesses}</HebrewText></View>
                  
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


  <Text style={styles.title}>Progress</Text>
  <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
  <Text style={styles.body}>{"YOUR SCORE: " + getCurrentScore()}</Text>
  <Text style={styles.body}>{"HIGH SCORE: " + getSessionScore()}</Text>
  
  </View>
  <View style={{flexDirection: 'column', flex: 2, alignContent: 'center', justifyContent: 'center'}}>
    <View style={styles.blueContainer}>
    <Text style={styles.body}>Transliterations:</Text>
    <View style={styles.listHeader}><View style={styles.blueListItem}><HebrewText style={styles.smallListText}>Hebrew</HebrewText><HebrewText style={styles.smallListText}>Time Remaining</HebrewText><HebrewText style={styles.smallListText}>Correct?</HebrewText><HebrewText style={styles.smallListText}>Guesses</HebrewText></View></View>

            <FlatList 
                
                data={DATA}
                renderItem={renderItemTranslit}
                style={{width: "80%"}}
                
            />
    </View>
      
    <View style={styles.blueContainer}>
    <Text style={styles.body}>Translations:</Text>
    <View style={styles.listHeader}><View style={styles.blueListItem}><HebrewText style={styles.smallListText}>Hebrew</HebrewText><HebrewText style={styles.smallListText}>Time Remaining</HebrewText><HebrewText style={styles.smallListText}>Correct?</HebrewText><HebrewText style={styles.smallListText}>Guesses</HebrewText></View></View>

            <FlatList
                data={DATA}
                renderItem={renderItemTranslate}
                style={{width: "80%"}}
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
        fontSize: 20,
        justifyContent: "flex-start",
        margin: 5
    },
    listHeader: {
      width: "80%",
      backgroundColor: palette.interactable,
      marginBottom: 10
    },
    smallListText: {
      fontSize: 10,
      justifyContent: "flex-start",
      margin: 5
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
      borderRadius: 10,
      backgroundColor: palette.interactable,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      marginHorizontal: 10,
      marginVertical: 10
    },
    blueListItem: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      borderRadius: 5,
      backgroundColor: palette.attention,
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: 5
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