import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground } from 'react-native';

export default class GameOver extends Component {

    constructor(props) {
        super(props);
        this.state = {
            score: this.props.route.params.score
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/GameOverScreen.png')}
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <View style={styles.title}>
                        <Text style={styles.titleText}>
                            Game Over
                        </Text>
                        <Text style={styles.score}>
                            Score: {this.state.score}
                        </Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Pressable style={styles.button} onPress={() => {this.props.navigation.navigate("Game")}}>
                            <Text style={{color: 'white', textAlign: 'center'}}>Play Again</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        marginTop: 100
    },
    titleText: {
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold'
    },
    score: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20
    },
    bottomContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 100,
        backgroundColor: '#4D96FF',
        padding: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 20
    }
})