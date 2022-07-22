import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, Animated, TouchableOpacity, Pressable } from 'react-native';
import Modal from 'react-native-modal';

const screenWidth = Dimensions.get('window').width;

export default class Start extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showModal: false
    }
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
            <ImageBackground source={require('../assets/opening_screen/start_screen.png')} resizeMode="cover" style={styles.image}>
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
                onPress={() => this.setState({showModal: true})}
              />
            </ImageBackground>
            <Modal isVisible={this.state.showModal}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{backgroundColor: 'white', paddingVertical: 20, paddingHorizontal: 10, borderRadius: 10}}>
                    <Text style={styles.funFact}>Take a sustainability quiz before the game!</Text>
                        <Pressable style={styles.button} onPress={() => {
                            this.props.navigation.navigate("PreQuiz");
                            this.setState({showModal: false});
                        }}>
                            <Text style={{color: 'white', textAlign: 'center'}}>Take Quiz</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
    color: 'black',
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
  },
  funFact: {
      textAlign: 'center',
      fontSize: 30,
      marginBottom: 30,
      fontWeight: '800',
      color: 'black'
  },
  button: {
    width: 150,
    backgroundColor: "#5E5DF0",
    padding: 10,
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 20
},
});
