import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, Animated, TouchableOpacity } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default class Start extends Component {

  constructor(props) {
    super(props)
    this.opacity_title = new Animated.Value(0);
    this.opacity_text = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.opacity_title, {
      duration: 3000,
      toValue: 1,
      useNativeDriver: true
    }).start();

    Animated.timing(this.opacity_text, {
      duration: 3000,
      toValue: 1,
      useNativeDriver: true
    }).start();
  }

  render() {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/start_screen.jpg')} resizeMode="cover" style={styles.image}>
              <Animated.View style={{
                opacity: this.opacity_title
              }}>
                <Text style={styles.startTitle}>
                  Recycling Game
                </Text>
              </Animated.View>
              <Animated.View style={{
                opacity: this.opacity_text
              }}>
                <Text style={styles.startText}>
                  Start
                </Text>
              </Animated.View>
              <TouchableOpacity 
                style={styles.pressArea}
                onPress={() => this.props.navigation.navigate("Game")}
              />
            </ImageBackground>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1
  },
  startTitle: {
    color: 'white',
    fontSize: 40,
    textAlign: 'center',
    marginTop: 70,
    fontWeight: 'bold'
  },
  startText: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 300,
    fontWeight: 'bold'
  },
  pressArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    height: 350,
    width: 350,
    borderRadius: 350,
    top: 280,
    left: screenWidth/2 - 175
  }
});
