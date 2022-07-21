import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import { refreshWordDataGlobal } from '../components/wordDataManager'
import { Text, View, Button} from '../components/Themed';
import Navigation from '../navigation';
var palette = require("../assets/globalColorScheme.json")

const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value)
    } catch (e) {
      // saving error
    }
  }

  const getData = async (key) => {
    console.log("GetData called")
    try {
      const value = await AsyncStorage.getItem(key)

      if(value !== null) {
        return value
        // value previously stored
      } else if (key == "newUser" && value == null) {

        return "true"
      }
    } catch(e) {
      // error reading value
    }
  }
  
export default function DeltaView ( { navigation }) {
    console.log("DeltaView called!")
    refreshWordDataGlobal()
    const newUser = getData("newUser")
    .then((result)=> {
        if (result === "true") {
            console.log("Forking to new user!")
            navigation.navigate("Welcome")
            storeData("newUser", "false")
        } else {
            console.log("Forking to returning user!")
            navigation.navigate("Root")
        }
    
        
    })
    return (
        <View style={styles.centerContainer}>
            <ActivityIndicator size="large" />
        </View>
    )
}

const styles = StyleSheet.create({
    largeContainer: {
      color: "#FFFFFF",
      flex: 2,
      justifyContent: 'center',
    },
    container: {
      flex: 1,
      alignItems: 'center',
  
    },
    centerContainer: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'
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
  