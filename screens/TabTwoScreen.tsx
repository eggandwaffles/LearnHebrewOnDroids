import * as React from 'react';
import { StyleSheet, Alert, Image } from 'react-native';
import { Text, View, Button } from '../components/Themed';
var palette = require("../assets/globalColorScheme.json")


export default function TabTwoScreen( { navigation } ) {
  Alert.alert("Warning!","Some content here is not fully tested. Proceed with caution.")
  return (
    <View style={styles.container}>
      	<Image source={require("../assets/images/UnderConstructionBanner.png")} style={{ width: 250, height: 25}} />
      <Text style={styles.title}>Fun with Letters & Vowels</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	  <Text style={styles.body}>Tap any button to continue</Text>
	  <View style={styles.buttonRow}>
		<Button
			title = "Start Game"
			onPress={() => navigation.navigate('VowelGame')}
			color = {palette.attention}
		/>
		<Button
			title = "Show Letters"
			onPress={() => Alert.alert('COMING SOON',"")}
      color = {palette.interactable}
		/>
		<Button
			title = "Show Vowels"
			onPress={() => Alert.alert('COMING SOON',"")}
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
    fontSize: 28,
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
