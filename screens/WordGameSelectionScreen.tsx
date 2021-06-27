import { FontAwesome } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { HebrewText } from '../components/StyledText';
import { Text, View, Button} from '../components/Themed';
import * as Font from 'expo-font';
import { loadAsync } from 'expo-font';
import TabThreeScreen from './TabThreeScreen';
import { FlatList, Switch } from 'react-native-gesture-handler';
//https://docs.expo.io/versions/latest/sdk/font/
var palette = require("../assets/globalColorScheme.json") 

export default function WordGameSelectionScreen ( { navigation } ) {
    Alert.alert("Warning!","This content is not developed yet.", 
    [
        {
            text: "Return",
            onPress: () => navigation.navigate('TabThreeScreen')
        },
        {
            text: "Press on",
            onPress: () => Alert.alert("You have navigated yourself into a corner.", "There is no escape.", [
                {
                    text: "Resign yourself to your fate."
                }
            ])
        }
    ]
    )
    return(
        <FlatList
        
        />
    )
}