import * as React from 'react';
import { StyleSheet, Alert, Image } from 'react-native';
import { ImageFetch } from '../components/LetterLookup';
import { Text, View, Button} from '../components/Themed';

export default function TabFourScreen() {

  return (
	<View style={styles.container}>
    <Image source={ImageFetch("aleph")}/>
      <Text style={styles.title}>Progress</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
	  <Text style={styles.body}>Like everything else in this app</Text>
    <Text style={styles.body}>this will not work for the forseeable</Text>
    <Text style={styles.body}>future. But here, there isn't even</Text>
    <Text style={styles.body}>a placeholder to fill the space. Sorry.</Text>
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
  image: {
    flex: 0.5,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
});
