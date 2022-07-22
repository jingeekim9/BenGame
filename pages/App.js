import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Start from './Start';
import Game from './Game';
import GameOver from './GameOver';
import Quiz from './Quiz';
import PreQuiz from './PreQuiz';
import Toast from 'react-native-toast-message';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Start">
          <Stack.Screen name="Start" component={Start} options={{headerShown: false}} />
          <Stack.Screen name="Game" component={Game} options={{headerShown: false, gestureEnabled: false}} />
          <Stack.Screen name="GameOver" component={GameOver} options={{headerShown: false}} />
          <Stack.Screen name="Quiz" component={Quiz} options={{headerShown: false}} />
          <Stack.Screen name="PreQuiz" component={PreQuiz} options={{headerShown: false}} />
        </Stack.Navigator>
        <Toast />
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
