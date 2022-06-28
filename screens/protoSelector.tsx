//import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, FlatList, Switch, KeyboardAvoidingView, SafeAreaView } from 'react-native';
//import { HebrewText } from '../components/StyledText';
import { Text, View, Button} from '../components/Themed';
//import * as Font from 'expo-font';
import { loadAsync } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react';
import { makeAutoObservable, makeObservable } from "mobx"
//https://docs.expo.io/versions/latest/sdk/font/
//import { TabRouter } from '@react-navigation/native';
var palette = require("../assets/globalColorScheme.json") 
var wordData = require("../assets/wordData.json")
async function loadfonts () {
	await loadAsync({
		'TaameyAshkenaz': {
			uri: require('../assets/fonts/TaameyAshkenaz-Bold.ttf')
		  },
		});
		
}
loadfonts()
var california = []



for (let i = 0; i<wordData.length;i++) {
    for (let j=0;j<wordData[i].categories.length;j++) {
        if (california.some((thing) => {
            return ((wordData[i].categories[j]) == thing.name)
        })) {

        } else {
            california.push({
                "name" : wordData[i].categories[j],
                "active" : true
            })
        }
    }
}

makeAutoObservable(california)

const protoSelector = observer(({ route, navigation }) => {
    console.log('protoSelector called!')
    function toggleState (arg) {
        arg = !arg
        console.log("state toggled on something or other: " + arg)
    }
    
    const renderItem = ({ item }) => (
        <View>
            <View style={styles.divider} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.listItem}>
            
            <Text style={styles.body}>{item.name.toUpperCase()}</Text>
            <Switch
            onValueChange={() => {
                //item.active = !item.active

            }}
            value={item.active}
            />
            
            </View>
        </View>

      );
      
        

    return (
        <View style={styles.container}>
            <StatusBar hidden={true}></StatusBar>
            <Text style = {styles.title}>You must choose...</Text>
            <FlatList
                data={california}
                renderItem={renderItem}
                
            />
            <Button title={"GO!"} style={styles.buttonRow}></Button>
        </View>
    )
});
export default protoSelector
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