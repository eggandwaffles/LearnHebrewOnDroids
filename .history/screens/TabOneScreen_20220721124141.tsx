import * as React from 'react';
import { StyleSheet, Alert, Image, BackHandler } from 'react-native';
import { Text, View, Button } from '../components/Themed';
import LetterNameView from './LetterNameView';
var palette = require("../assets/globalColorScheme.json")

export default function TabOneScreen( { navigation } ) {
  const backAction = () => {
		return true
	}
	React.useEffect(() => {
		BackHandler.addEventListener("hardwareBackPress", backAction);
	
		return () =>
		  BackHandler.removeEventListener("hardwareBackPress", backAction);
	  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Fun with Letters</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	  <Text style={styles.body}>Tap any button to continue</Text>
	  <View style={styles.buttonRow}>
		<Button
			title = "Start Game"
			onPress={() => {
				navigation.navigate('LetterGame', { "init" : true})
			}}
			color = {palette.attention}
		/>
		<Button
			title = "Letter Names and Sounds"
			onPress={() => navigation.navigate("LetterNameView", {'invokingScreen' : "TabTwoScreen"})}
			color = {palette.interactable}
		/>
		</View>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonRow: {
	flex: 0.5,
	flexDirection: 'column',
	justifyContent: "space-between",
	width: "50%",
	marginTop: 50,
	position: "relative",
  },
  body: {
	  fontSize: 20,
  },
});
