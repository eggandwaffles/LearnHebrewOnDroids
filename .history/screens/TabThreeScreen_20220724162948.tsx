import * as React from 'react';
import { StyleSheet, Alert, Image } from 'react-native';

import { Text, View, Button} from '../components/Themed';
var palette = require("../assets/globalColorScheme.json")


export default function TabThreeScreen( { navigation } ) {

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Fun with Words</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	  <Text style={styles.body}>Tap any button to continue</Text>
	  <View style={styles.buttonRow}>
		<Button
			title = "Practice All Words"
			onPress={() => navigation.navigate('MobxWordGameLit', {"cats" : "all", "init" : true} )}
			color = {palette.attention}
		/>
		<Button
			title = "Choose Categories"
			onPress={() => navigation.navigate('protoSelector')}
      color = {palette.interactable}
		/>
    <Button
			title = "View Dictionary"
			onPress={() => navigation.navigate('DictionaryView', {invokingScreen: "TabThreeScreen"})}
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
  body: {
	  fontSize: 20
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
});
