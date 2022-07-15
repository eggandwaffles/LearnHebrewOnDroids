import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, createAppContainer } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import LetterGame from '../screens/LetterGame';
import LetterNameView from '../screens/LetterNameView';
import NotFoundScreen from '../screens/NotFoundScreen';
import VowelGame from '../screens/VowelGame';
import WordGameLit from '../screens/WordGameLit';
import WordGameLate from '../screens/WordGameLate';
import MobxWordGameLit from '../screens/MobxWordGameLit';
import MobxWordGameLate from '../screens/MobxWordGameLate';
import WordGameSelectionScreen from '../screens/WordGameSelectionScreen';
import protoSelector from '../screens/protoSelector';
import devWorks from '../screens/devWork';
import VowelViewer from '../screens/VowelViewer';
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import DictionaryView from '../screens/DictionaryView';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Root" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Root" component={BottomTabNavigator} />
	  <Stack.Screen name="LetterGame" component={LetterGame} />
    <Stack.Screen name="LetterNameView" component={LetterNameView} />
    <Stack.Screen name="VowelGame" component={VowelGame} />
    <Stack.Screen name="WordGameLit" component={WordGameLit} />
    <Stack.Screen name="WordGameLate" component={WordGameLate} />
    <Stack.Screen name="MobxWordGameLit" component={MobxWordGameLit} />
    <Stack.Screen name="MobxWordGameLate" component={MobxWordGameLate} />
    <Stack.Screen name="WordGameSelectionScreen" component={WordGameSelectionScreen} />
    <Stack.Screen name="devWorks" component={devWorks} options={{ title: 'Nothing to see here...'}}/>
    <Stack.Screen name="protoSelector" component={protoSelector} options={{ title: 'Nothing to see here...'}}/>
    <Stack.Screen name="VowelViewer" component={VowelViewer} />
    <Stack.Screen name="DictionaryView" component={DictionaryView} />
    <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
