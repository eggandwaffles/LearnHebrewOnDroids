import * as React from 'react';
import { StyleSheet, Alert } from 'react-native';

import { Text, View, Button} from '../components/Themed';


export default function TabThreeScreen() {
  Alert.alert("Warning!","This content is not functional!")
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fun with words</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	  <Text style={styles.body}>Tap any button to continue</Text>
	  <View style={styles.buttonRow}>
		<Button
			title = "Practice All Words"
			onPress={() => Alert.alert('COMING SOON',"Late 2020/Early 2021")}
			color = "#FF9900"
		/>
		<Button
			title = "Choose Categories"
			onPress={() => Alert.alert('COMING SOON',"")}
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
