// author: Gabe Kotsonis
// code largely comes from this tutorial: https://www.raywenderlich.com/485-react-native-tutorial-building-ios-apps-with-javascript

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

'use strict';

import React, {Component} from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  NavigatorIOS,
} from 'react-native';

// import {NavigationContainer} from '@react-navigation/native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import searchpage and searchresults components
import SearchPage from './SearchPage';
import SearchResults from './SearchResults';

// create stack navigator
const Stack = createNativeStackNavigator();

export default class App extends Component<{}> {
  render() {
    return (
      <NavigationContainer>
        <SearchPage />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

// export default App;
