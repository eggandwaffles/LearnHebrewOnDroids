import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';

import { Text, View, Button} from '../components/Themed';



export function LetterGameScreen() {
	return (
   <View style={styles.container}>
      <Text style={styles.title}>Transliterate</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
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
			color = "#FFFF00"
		/>
		<Button
			title = "D"
			onPress={() => Alert.alert('Apologies...',"Whoever coded this is incredibly lazy/unskilled.")}
			color = "#00FF00"
		/>
		<Button
			title = "E"
			onPress={() => Alert.alert('Apologies...',"Whoever coded this is incredibly lazy/unskilled.")}
			color = "#0000FF"
		/>
		</View>
	</View>
	)
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
