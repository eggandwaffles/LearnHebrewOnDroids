import * as React from 'react';
import { Text, View, Button} from '../components/Themed';
import { StyleSheet, Alert, Modal, Pressable, FlatList, StatusBar } from 'react-native';
import { HebrewText } from '../components/StyledText';
import { loadAsync } from 'expo-font';
import { couldStartTrivia } from 'typescript';
import { convArr } from "../components/wordArrayToUnicode"
import { Dropdown } from 'react-native-element-dropdown';
//https://github.com/hoaphantn7604/react-native-element-dropdown
var wordData = require('../assets/wordData.json')
var tempVowelData = require('../assets/hebrewVowels.json')
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
var vowelData = []
for (let k=0;k<tempVowelData.length;k++) {
    if (tempVowelData[k].char.length) {
        vowelData.push(tempVowelData[k])
    } else {
        
    }
}


export default function VowelViewer( { navigation } ) {
    const [value, setValue] = React.useState({"name" : "aleph", "unicode" : null, "sound" : " "})
	const renderItem = ( {item} ) => (
		<View styles={styles.largeContainer}>
			<View style={styles}>
			
			<HebrewText style={{fontSize: 30}}>{
				value.sound + item.name + " | " + value.unicode + item.char
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
            <Dropdown 
                style={styles.dropdown}
                data={letterData}
                labelField="name"
                valueField='sound'
                value={value.name}
                onChange={(item)=>{
                    setValue(item)
                }}
            />
			<View style={styles.divider} lightColor="#aaa" darkColor="rgba(255,255,255,0.4)" />
			
			<FlatList
				data={vowelData}
				renderItem={renderItem}
				/>
		</View>
	)
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