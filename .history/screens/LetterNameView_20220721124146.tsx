import * as React from 'react';
import { Text, View, Button} from '../components/Themed';
import { StyleSheet, Alert, Modal, Pressable, FlatList, StatusBar, BackHandler } from 'react-native';
import { HebrewText } from '../components/StyledText';
import { loadAsync } from 'expo-font';
import { couldStartTrivia } from 'typescript';
import { convArr } from "../components/wordArrayToUnicode"
var wordData = require('../assets/wordData.json')
var letters = require('../assets/hebrewLetters.json');
var unicodes = require('../assets/hebrewUnicode.json');


async function loadfonts () {
	await loadAsync({
		'TaameyAshkenaz': {
			uri: require('../assets/fonts/TaameyAshkenaz-Bold.ttf')
		  },
		});
		
}
loadfonts()
var letterData = []
//merge hebrew letter lists
for (let i = 0; i<letters.length;i++) {
	var iLetter = {}
	iLetter.name = letters[i].name
	
	iLetter.unicode = unicodes.find(element => {
		return element.name === iLetter.name
	}).char
	
	//reverse order of lettering - don't ask why
	var tempArr = []
	for (let j = letters[i].char.length - 1; j>=0; j--) {
		tempArr.push(letters[i].char[j])
	}
	iLetter.sound = tempArr.join("")
	letterData.push(iLetter)
}



export default function LetterNameView( { navigation, route } ) {
  const backAction = () => {
		navigation.navigate(route.params.invokingScreen)
	}
	React.useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", backAction);
	
		return () =>
		  BackHandler.removeEventListener("hardwareBackPress", backAction);
	  }, []);
	const renderItem = ( {item} ) => (
		<View styles={styles.largeContainer}>
			<View style={styles}>
			
			<HebrewText style={{fontSize: 30}}>{
				(item.sound == " ") ? (item.unicode + " | " + item.name + " | Silent" ) : ((item.name.substring(0,2) == "F-") ? item.unicode + " | Final " + item.name.substring(2) + " | " + item.sound : item.unicode + " | " + item.name + " | " + item.sound)
			}</HebrewText>
			<View style={styles.divider} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
		</View>
		</View>
		
	)
	return (
		<View style={styles.container}>
			<StatusBar hidden={true}></StatusBar>
			<Text style={styles.title}>Behold!</Text>

			<HebrewText style={{fontSize: 50}}>{convArr(wordData[1].letters,wordData[1].vowels)}</HebrewText>
			<View style={styles.divider} lightColor="#aaa" darkColor="rgba(255,255,255,0.4)" />
			
			<FlatList
				data={letterData}
				renderItem={renderItem}
				/>
		</View>
	)
}

const styles = StyleSheet.create({
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