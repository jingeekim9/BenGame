import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, Animated, TouchableOpacity, Pressable, Image } from 'react-native';
import Modal from 'react-native-modal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
        <TouchableOpacity style={styles.container}
          onPress={() => {
          this.setState({showModal: true})}}
          activeOpacity={1}
          >
            <ImageBackground source={require('../assets/opening_screen/start_screen.png')} resizeMode="cover" style={styles.image}>
              <Animated.View style={{
                opacity: this.opacity_title
              }}>
                <Image 
                  source={require("../assets/opening_screen/logo.png")}
                  resizeMode="contain"
                  style={{width: screenWidth * 0.5, height: screenWidth*0.5, marginLeft: 'auto', marginRight: 'auto'}}
                />
              </Animated.View>
              <Animated.View style={{
                opacity: this.opacity_text,
                flex: 1
              }}>
                <Text style={styles.startText}>
                  Press Anywhere to Start
                </Text>
              </Animated.View>
            </ImageBackground>
            <Modal isVisible={this.state.showModal}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{backgroundColor: 'white', paddingVertical: 20, paddingHorizontal: 10, borderRadius: 10}}>
                      <Text style={styles.funFact}>Quiz</Text>
                      <Text style={{fontSize: 17, textAlign: 'center'}}>Take a sustainability quiz to test your knowledge!</Text>
                        <Pressable style={styles.button} onPress={() => {
                            this.props.navigation.navigate("PreQuiz");
                            this.setState({showModal: false});
                        }}>
                            <Text style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Take Quiz</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    marginTop: -10
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
    fontWeight: 'bold',
    position: 'absolute',
    bottom: hp(10),
    width: wp(100)
  },
  pressArea: {
    position: 'absolute',
    backgroundColor: 'transparent',
    height: hp(100),
    width: wp(100),
    zIndex: 999999
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
    backgroundColor: "#004e81",
    padding: 10,
    color: 'white',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 20
},
});
