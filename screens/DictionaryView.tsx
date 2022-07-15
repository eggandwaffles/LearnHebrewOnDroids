import * as React from 'react';
import { Text, View, Button} from '../components/Themed';
import { StyleSheet, Alert, Modal, Pressable, FlatList, StatusBar, SectionList } from 'react-native';
import { HebrewText } from '../components/StyledText';
import { loadAsync } from 'expo-font';
import { couldStartTrivia, parseConfigFileTextToJson } from 'typescript';
import { convArr } from "../components/wordArrayToUnicode"
import { catWords } from '../components/wordAnswerGen';
import { TextInput } from 'react-native-gesture-handler';
var wordData = require("../assets/wordData.json")
var letters = require('../assets/hebrewLetters.json');
var unicodes = require('../assets/hebrewUnicode.json');
var palette = require("../assets/globalColorScheme.json")
//couple of words have some weird formatting

async function loadfonts () {
	await loadAsync({
		'TaameyAshkenaz': {
			uri: require('../assets/fonts/TaameyAshkenaz-Bold.ttf')
		  },
		});
		
}
loadfonts()




export default function DictionaryView( { navigation } ) {
    const [text, onChangeText] = React.useState("");
    var cats = []
for (let i = 0; i<wordData.length;i++) {
    for (let j=0;j<wordData[i].categories.length;j++) {
        if (cats.some((thing) => {
            return ((wordData[i].categories[j]) == thing.title)
        })) {

        } else {
            cats.push({
                "title" : wordData[i].categories[j],
                "data" : []
            })
        }
    }
}

for (let k = 0; k<cats.length;k++) {
    for (let l = 0;l<wordData.length;l++) {
        if (wordData[l].categories.includes(cats[k].title) && wordData[l].translation.includes(text.toLowerCase())) {
            cats[k].data.push(wordData[l])
        }
    }
}

	const renderItem = ( {item} ) => (
		<View styles={styles.largeContainer}>
			
			<View style={styles.listItem}>
                <HebrewText style={styles.body}>{
				    convArr(item.letters, item.vowels)
			    }</HebrewText>
                <HebrewText style={styles.body}>{
			    	"(" + item.transliteration + ")"
			    }</HebrewText>
                <HebrewText style={styles.body}>{
			    	item.translation
			    }</HebrewText>
            </View>
			
			<View style={styles.divider} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
		
		</View>
		
	)
	return (
		<View style={styles.container}>
			<StatusBar hidden={true}></StatusBar>
			<Text style={styles.title}>Behold!</Text>

			<HebrewText style={{fontSize: 50}}>{convArr(wordData[1].letters,wordData[1].vowels)}</HebrewText>
            <TextInput
                placeholder='Search for a word...'
                onChangeText={onChangeText}
                value={text}
            />
			<View style={styles.divider} lightColor="#aaa" darkColor="rgba(255,255,255,0.4)" />
			
			<SectionList
                style={styles.list}
				sections={cats}
				renderItem={renderItem}
                renderSectionHeader={({ section: { title, data } }) => {
                    if (data.length > 0) {
                        return (
                        <View style={styles.listSection}>
                        <Text style={styles.blueTitle}>{title.toUpperCase()}</Text>
                        <View style={styles.divider} lightColor={palette.interactable} darkColor={palette.interactable} />
                        </View>
                        )
                    } else {
                        <View style={styles.listSection} />
                    }

                    
                    
                }}
            
				/>
		</View>
	)
}

const styles = StyleSheet.create({
    list: {
        alignContent: "center"
    },
    listItem: {
        flex: 1,
        flexDirection: 'row',
        alignContent: "center",
        justifyContent: "space-evenly"
    },
    listText: {
        justifyContent: "flex-start"
    },
    listSection: {
        alignContent: "center",
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
    blueTitle: {
        fontFamily: 'TaameyAshkenaz',
        fontSize: 30,
        fontWeight: 'bold',
        color: palette.interactable
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