import * as React from 'react';
import { StyleSheet, Alert, Image, Pressable } from 'react-native';
import { ImageFetch } from '../components/LetterLookup';
import {Text, View, Button} from '../components/Themed';
import { HebrewText } from '../components/StyledText';
import { getCurrentScore, getSessionScore } from '../components/progressDataManager'
var { finalAnswer } = require("../components/wordAnswerGen.js")
var palette = require("../assets/globalColorScheme.json")
export default function ProgressScreen( { navigation } ) {
  //Alert.alert("Warning!","This content is not functional!")
    console.log("Refresh requested!")
  return (
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


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  body: {
	  fontSize: 20
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  image: {
    flex: 0.5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
