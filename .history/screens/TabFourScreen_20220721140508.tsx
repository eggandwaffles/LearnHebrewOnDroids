import * as React from 'react';
import { StyleSheet, Alert, Image, Pressable, ToastAndroid } from 'react-native';
import { ImageFetch } from '../components/LetterLookup';
import {Text, View, Button} from '../components/Themed';
import { HebrewText } from '../components/StyledText';
var { finalAnswer } = require("../components/wordAnswerGen.js")
var palette = require("../assets/globalColorScheme.json")
import { LogProgress, LogScore, overrideSetScore } from '../components/progressDataManager'

export default function TabFourScreen( { navigation } ) {
  //Alert.alert("Warning!","This content is not functional!")

  return (
	<View style={styles.container}>
    <Image source={require("../assets/images/UnderConstructionBanner.png")} style={{ width: 250, height: 25}} />
    <Pressable 
    delayLongPress={1000}
    onLongPress={()=>{
      navigation.navigate('devWorks')
    }}><HebrewText style={{fontSize: 50}}>{
      finalAnswer("all").letters
    

    }
    
</HebrewText>
    
      <Text style={styles.title}>Settings</Text>
      </Pressable>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	  <Text style={styles.body}>Long-press title for development tools</Text>
    <Button styles={styles.button}
            title = {"Clear High Score"}
            onPress = {()=>{
              Alert.alert("Resest score?", "Sibling/parent/friend/spouse beat your score? Just delete the records. Just keep in mind the onus is on you to regain your former glory.", [
                {
                  text : "Cancel",
                  onPress: () => {
                    
                }
              },
                {
                    text : "Delete",
                    onPress: () => {
                      overrideSetScore(0)
                      ToastAndroid.show("High score cleared", ToastAndroid.SHORT)
                  }
                }
              ])
            }}
            />
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
