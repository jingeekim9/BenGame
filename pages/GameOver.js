import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground, Keyboard, TouchableWithoutFeedback, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import * as SQLite from 'expo-sqlite';
import Toast from 'react-native-toast-message';

const db = SQLite.openDatabase('db.scoreDb');

export default class GameOver extends Component {

    constructor(props) {
        super(props);
        this.state = {
            score: this.props.route.params.score,
            showModal: true,
            showLeaderboard: false,
            name: '',
            data: null,
            preQuiz: this.props.route.params.preQuiz
        }

        // Create a new database if it does not exist
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS scores (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, score INT)')
        });

        this.fetchData();
    }

    fetchData = () => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM test ORDER BY score DESC LIMIT 5', null,
                (txObj, { rows: { _array } }) => this.setState({ data: _array }),
                (txObj, error) => console.log('Error', error)
            )
        })
    }

    addScore = (name, score) => {
        db.transaction(tx => {
            tx.executeSql('INSERT INTO test (name, score) values (?, ?)', [name, score]);
            tx.executeSql('SELECT * FROM test ORDER BY score DESC LIMIT 5', null,
                (txObj, { rows: { _array } }) => this.setState({ data: _array }),
                (txObj, error) => console.log('Error', error)
            )
        });

        Toast.show({
            type: 'success',
            text1: 'Saved Successfully',
            visibilityTime: 2000
        })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground
                    source={
                        this.state.score < 20 ?
                            require('../assets/game_over/dirty_world.png')
                        :
                        this.state.score >= 20 && this.state.score < 50 ?
                            require('../assets/game_over/medium_world.png')
                        :
                            require('../assets/game_over/clean_world.png')
                        }
                    style={{
                        width: '100%',
                        height: '100%'
                    }}
                >
                    <Pressable 
                        style={[styles.button, {position: 'absolute', top: 40, right: 20, borderRadius: 5, width: 120, backgroundColor: '#001E6C'}]}
                        onPress={() => this.setState({showLeaderboard: true})}
                        >
                        <Text style={{color: 'white', textAlign: 'center'}}>Leaderboard</Text>
                    </Pressable>
                    <View style={styles.title}>
                        <Text style={[styles.titleText, {color: this.state.score < 20 && 'white'}]}>
                            Game Over
                        </Text>
                        <Text style={[styles.score, {color: this.state.score < 20 && 'white'}]}>
                            Score: {this.state.score}
                        </Text>
                    </View>
                    <View style={styles.info_container}>
                        <Text style={[styles.fact, {color: this.state.score < 20 && 'white'}]}>Fact</Text>
                        <Text style={[styles.factText, {color: this.state.score < 20 && 'white'}]}>Temporary fun fact</Text>
                    </View>
                    <View style={styles.bottomContainer}>
                        <Pressable style={styles.button} onPress={() => this.props.navigation.navigate("Quiz", {preQuiz: this.state.preQuiz})}>
                            <Text style={{color: 'white', textAlign: 'center'}}>Take Quiz</Text>
                        </Pressable>
                        <View>
                            <Text style={{textAlign: 'center', marginVertical: 10, color: this.state.score < 20 && 'white'}}>or</Text>
                        </View>
                        <Pressable style={styles.button} onPress={() => {this.props.navigation.navigate("Game")}}>
                            <Text style={{color: 'white', textAlign: 'center'}}>Play Again</Text>
                        </Pressable>
                    </View>
                </ImageBackground>
                <Modal
                    isVisible={this.state.showModal}
                    onBackdropPress={Keyboard.dismiss}
                >
                    <TouchableWithoutFeedback style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={Keyboard.dismiss}>
                        <View style={{backgroundColor: 'white', paddingVertical: 20, paddingHorizontal: 10, borderRadius: 10}}>
                            <Text style={styles.saveTitle}>Input your name to save your score!</Text>
                            <TextInput 
                                style={styles.nameInput}
                                placeholder="Name"
                                returnKeyType={'done'}
                                autoCapitalize={'none'}
                                placeholderTextColor={'gray'}
                                onChangeText={(name) => this.setState({name: name})}
                            />
                            <View style={{flexDirection: 'row'}}>
                                <Pressable style={styles.button} onPress={() => this.setState({showModal: false})}>
                                    <Text style={{color: 'white', textAlign: 'center'}}>Don't Save</Text>
                                </Pressable>
                                <Pressable style={styles.button} onPress={() => {
                                    this.setState({showModal: false});
                                    this.addScore(this.state.name, parseInt(this.state.score))
                                }}>
                                    <Text style={{color: 'white', textAlign: 'center'}}>Save</Text>
                                </Pressable>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
                <Modal
                    isVisible={this.state.showLeaderboard}
                    onBackdropPress={Keyboard.dismiss}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{backgroundColor: 'white', paddingVertical: 20, paddingHorizontal: 10, borderRadius: 10, width: '80%'}}>
                            <Text style={styles.saveTitle}>Leaderboard</Text>
                            <View style={[styles.leaderboardContainer, {marginTop: 30}]}>
                                <View style={{width: '33%'}}>
                                    <Text style={{textAlign: 'left', fontSize: 20, fontWeight: 'bold'}}>
                                        Ranking
                                    </Text>
                                </View>
                                <View style={{width: '33%'}}>
                                    <Text style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
                                        Name
                                    </Text>
                                </View>
                                <View style={{width: '33%'}}>
                                    <Text style={{textAlign: 'right', fontSize: 20, fontWeight: 'bold'}}>
                                        Score
                                    </Text>
                                </View>
                            </View>
                            {
                                this.state.data && this.state.data.map((data, index) => (
                                    <View style={[styles.leaderboardContainer, {marginTop: 30}]} key={data.id}>
                                        <View style={{width: '33%'}}>
                                            <Text style={{textAlign: 'left', fontWeight: '600'}}>
                                                {index + 1}
                                            </Text>
                                        </View>
                                        <View style={{width: '33%'}}>
                                            <Text style={{textAlign: 'center', fontWeight: '600'}}>
                                                {data.name}
                                            </Text>
                                        </View>
                                        <View style={{width: '33%'}}>
                                            <Text style={{textAlign: 'right', fontWeight: '600'}}>
                                                {data.score}
                                            </Text>
                                        </View>
                                    </View>
                                ))
                            }
                            <Pressable style={[styles.button, {marginTop: 20}]} onPress={() => this.setState({showLeaderboard: false})}>
                                <Text style={{color: 'white', textAlign: 'center'}}>Close</Text>
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
    },
    info_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fact: {
        textAlign: 'center',
        fontSize: 30,
        marginBottom: 30,
        fontWeight: 'bold'
    },
    factText: {
        textAlign: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        fontSize: 20,
        fontWeight: '700'
    },
    saveTitle: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black'
    },
    nameInput: {
        height: 70,
        marginTop: 10,
        paddingLeft: 30,
        paddingRight: 30,
        color: 'black',
        fontWeight: 'bold',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 20
    },
    leaderboardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})