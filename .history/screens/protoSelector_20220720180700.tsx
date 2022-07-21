//import { FontAwesome } from '@expo/vector-icons';
import React, {useState} from 'react';
import { StyleSheet, FlatList, Switch, KeyboardAvoidingView, SafeAreaView } from 'react-native';
//import { HebrewText } from '../components/StyledText';
import { Text, View, Button} from '../components/Themed';
//import * as Font from 'expo-font';
import { loadAsync } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { observer } from 'mobx-react';
import { makeAutoObservable, makeObservable, observable } from "mobx"
import { couldStartTrivia } from 'typescript';
//https://docs.expo.io/versions/latest/sdk/font/
//import { TabRouter } from '@react-navigation/native';
var palette = require("../assets/globalColorScheme.json") 
var wordData = require("../assets/wordData.json")
import { catWords } from '../components/wordAnswerGen'
async function loadfonts () {
	await loadAsync({
		'TaameyAshkenaz': {
			uri: require('../assets/fonts/TaameyAshkenaz-Bold.ttf')
		  },
		});
		
}
loadfonts()

var california = {arg: []}



for (let i = 0; i<wordData.length;i++) {
    for (let j=0;j<wordData[i].categories.length;j++) {
        if (california.arg.some((thing) => {
            return ((wordData[i].categories[j]) == thing.meID)
        })) {

        } else {
            california.arg.push({
                "meID" : wordData[i].categories[j],
                "isWork" : true,
                "initState" : function () {
                    [this.getter, this.setter] = useState(false)
                }
            })
        }
    }
}

makeAutoObservable(california)


const protoSelector = observer(({ route, navigation }) => {

    for (let k=0;k<california.arg.length;k++) {
        california.arg[k].initState()
    }

    const renderItem = ({ item }) => (
        <View>
            <View style={styles.divider} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
            <View style={styles.listItem}>
            
            <Text style={styles.body}>{item.meID.toUpperCase()}</Text>
            <Switch
            onValueChange={(upd) => {
                item.setter(upd)
            }}
            value={item.getter}
            />
            
            </View>
        </View>

      );
      
        

    return (
        <View style={styles.container}>
            <StatusBar hidden={true}></StatusBar>
            <Text style = {styles.title}>You must choose...</Text>
            <FlatList
                data={california.arg}
                renderItem={renderItem}
                
            />
            <Button title={"GO!"} style={styles.buttonRow} onPress={() => {
                let navCats = []
                for (let l = 0;l<california.arg.length;l++) {
                   if (california.arg[l].getter) {navCats.push(california.arg[l].meID)}
                }
                console.log(catWords(navCats))
                navigation.navigate('MobxWordGameLit', {"cats" : navCats, "init" : true} )
            }
                
            }
            disabled={!(california.arg.some((whatever) => {
                return whatever.getter
            }))}/>
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