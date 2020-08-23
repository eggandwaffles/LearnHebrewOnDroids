import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Text, View, Button } from '../components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fun with Letters & Vowels</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	  <Text style={styles.body}>Tap any button to continue</Text>
	  <View style={styles.buttonRow}>
		<Button
			title = "Start Game"
			onPress={() => Alert.alert('Apologies...',"Whoever coded this is incredibly lazy/unskilled.")}
			color = "#FF9900"
		/>
		<Button
			title = "Show Letters"
			onPress={() => Alert.alert('Apologies...'," Or maybe they haven't spent enough time on it yet.")}
		/>
		<Button
			title = "Show Vowels"
			onPress={() => Alert.alert('Apologies...',"Yeah, that's it.")}
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
