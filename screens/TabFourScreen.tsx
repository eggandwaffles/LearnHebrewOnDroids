import * as React from 'react';
import { StyleSheet, Alert, Image, Pressable } from 'react-native';
import { ImageFetch } from '../components/LetterLookup';
import {Text, View, Button} from '../components/Themed';
import { HebrewText } from '../components/StyledText';
var { finalAnswer } = require("../components/wordAnswerGen.js")
var palette = require("../assets/globalColorScheme.json")
export default function TabFourScreen( { navigation } ) {
  //Alert.alert("Warning!","This content is not functional!")

  return (
	<View style={styles.container}>
    <Image source={require("../assets/images/UnderConstructionBanner.png")} style={{ width: 250, height: 25}} />
    <Pressable 
    delayLongPress={1000}
    onLongPress={()=>{
      navigation.navigate('devWorks')
    }}><HebrewText style={{fontSize: 50}}>{finalAnswer("all").letters}</HebrewText></Pressable>
    
      <Text style={styles.title}>Progress</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	  <Text style={styles.body}>COMING SOON</Text>

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
