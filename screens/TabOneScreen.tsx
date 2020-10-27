import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { Text, View, Button } from '../components/Themed';

export default function TabOneScreen( { navigation } ) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fun with letters</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	  <Text style={styles.body}>Tap any button to continue</Text>
	  <View style={styles.buttonRow}>
		<Button
			title = "Start Game"
			onPress={() => {
				navigation.navigate('LetterGame')
			}}
			color = "#FF9900"
		/>
		<Button
			title = "Letter Names"
			onPress={() => Alert.alert('COMING SOON', "To a theater near you.")}
		/>
		<Button
			title = "Letter Sounds"
			onPress={() => Alert.alert('COMING SOON',"Wherever books are sold.")}
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
