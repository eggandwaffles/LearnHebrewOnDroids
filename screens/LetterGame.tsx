import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';

import { Text, View, Button} from '../components/Themed';



export default function LetterGame( { navigation } ) {
	return (
   <View style={styles.largeContainer}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
   	
	<Button style={styles.backButton}
		title = "Back"
		onPress={() => navigation.goBack()}
		/>
   <View style={styles.container}>

      <Text style={styles.title}>Transliterate</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	  <Text style={styles.title}>This</Text>

	  <View style={styles.buttonRow}>
		<Button
			title = "A"
			onPress={() => Alert.alert('Apologies...',"Whoever coded this is incredibly lazy/unskilled.")}
			color = "#FF0000"
		/>
		<Button
			title = "B"
			onPress={() => Alert.alert('Apologies...',"Whoever coded this is incredibly lazy/unskilled.")}
			color = "#FF9900"
		/>
		<Button
			title = "C"
			onPress={() => Alert.alert('Apologies...',"Whoever coded this is incredibly lazy/unskilled.")}
			color = "#00FF00"
		/>
		<Button
			title = "D"
			onPress={() => Alert.alert('Apologies...',"Whoever coded this is incredibly lazy/unskilled.")}
			color = "#0000FF"
		/>
		<Button
			title = "E"
			onPress={() => Alert.alert('Apologies...',"Whoever coded this is incredibly lazy/unskilled.")}
			color = "#FF00FF"
		/>
		</View>
	</View>
	</View>
	)
}

const styles = StyleSheet.create({
  largeContainer: {
	flex: 2,
	justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',

  },
  title: {
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
	  	alignContent: "flex-start",
		width: "50%",
  },
});
