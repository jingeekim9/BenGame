import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from "matter-js";
import { Trash } from "./Trash";
import { TrashCan } from "./TrashCan";
import { Floor } from "./Floor";
import { Wall } from "./Wall";
import { Physics, createTrash, MoveTrash, deleteTrash } from "./Systems";
import { useFocusEffect } from '@react-navigation/native';
import { Background } from './Background';
import Modal from "react-native-modal";
import axios from 'axios';

function RestartPlay({ gameRunning, onUpdate }) {
  useFocusEffect(
    React.useCallback(() => {
      onUpdate(true)

      return () => onUpdate(false)
    }, [gameRunning, onUpdate])
  )

  return null;
}

const engine = Matter.Engine.create({ enableSleeping: false});

const world = engine.world;

const {width, height} = Dimensions.get("screen");

const boxSize = Math.trunc(Math.max(width, height) * 0.045);

const randomPosition = Math.floor(Math.random() * width);

const trash = Matter.Bodies.rectangle(randomPosition, 0, boxSize, boxSize);

const recycleCan = Matter.Bodies.rectangle(40, height/2, 75, 75, {isStatic: true, collisionFilter: {category: 2}});

const nonRecycleCan = Matter.Bodies.rectangle(width-40, height/2, 75, 75, {isStatic: true, collisionFilter: {category: 2}});

const floor = Matter.Bodies.rectangle(width/2, height - boxSize/2, width, boxSize*4, {isStatic: true, collisionFilter: {category: 2}});

const leftWall = Matter.Bodies.rectangle(-100, height/2, 200, height, {isStatic: true, collisionFilter: {category: 2}});
const rightWall = Matter.Bodies.rectangle(width+100, height/2, 200, height, {isStatic: true, collisionFilter: {category: 2}});

const constraint = Matter.Constraint.create({
  label: "Drag Constraint",
  pointA: { x: 0, y: 0},
  pointB: { x: 0, y: 0},
  length: 0.01,
  stiffness:0.1,
  angularStiffness: 1
});

Matter.World.add(world, [recycleCan, nonRecycleCan, floor, leftWall, rightWall]);
Matter.World.addConstraint(world, constraint);

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameRunning: true,
      score: 0,
      modalVisible: false,
      quizModalVisible: false,
      preQuiz: this.props.route.params.preQuiz,
      facts: [],
      level: 0
    }
  }

  componentDidMount() {
    axios.get('https://dust-game.herokuapp.com?type=1')
    .then((response) => {
      let data = response.data;
      let arr = [];
      let facts = [];
      while(facts.length < 10)
      {
        let random = Math.floor(Math.random() * Object.keys(data['Facts']).length);
        if(arr.indexOf(random) === -1)
        {
          facts.push(data['Facts'][String(random)]);
          arr.push(random);
        }
      }

      this.setState({facts: facts});
    })
  }

  _handleUpdate = gameRunning => {
    this.setState({gameRunning: gameRunning});
    this.setState({score: 0});
  }

  render() {
    return (
      <GameEngine
        style={[styles.container]}
        systems={[Physics, createTrash, MoveTrash, deleteTrash]}
        entities={{
          background: {
            renderer: Background
          },
          physics: {
            engine: engine,
            world: world,
            constraint: constraint
          },
          recycleCan: {
            body: recycleCan,
            size: [75, 75],
            backgroundColor: 'blue',
            type: 'recycleCan',
            renderer: TrashCan
          },
          nonRecycleCan: {
            body: nonRecycleCan,
            size: [75, 75],
            backgroundColor: 'red',
            type: 'nonRecycleCan',
            renderer: TrashCan
          },
          floor: {
            body: floor,
            score: 0,
            life: 3,
            size: [width, boxSize*4],
            renderer: Floor
          },
          leftWall: {
            body: leftWall,
            size: [200, height],
            renderer: Wall
          },
          rightWall: {
            body: rightWall,
            size: [200, height],
            renderer: Wall
          }
        }}
        running={this.state.gameRunning}
        onEvent={(e) => {
          switch(e) {
            case "game-over":
              this.setState({gameRunning: false});
              this.props.navigation.navigate("GameOver", {score: this.state.score, preQuiz: this.state.preQuiz});
              break;
            case "update-score":
              this.setState({score: this.state.score + 1});
              break;
            case "next_level":
              this.setState({gameRunning: false});
              this.setState({quizModalVisible: true});
              this.setState({level: this.state.level + 1});
          }
        }}
      >
        <StatusBar hidden={true} />
        <RestartPlay 
          gameRunning={this.props.gameRunning}
          onUpdate={this._handleUpdate}
        />
        <TouchableOpacity 
          style={styles.pause_container}
          onPress={() => {
          this.setState({gameRunning: false});
          this.setState({modalVisible: true});
          console.log("paused")
          }}
          >
          <Image 
            style={styles.pause_image}
            source={require('../assets/pause.png')} 
            />
        </TouchableOpacity>
        <Modal
          animationType='fade'
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => {
            this.setState({modalVisible: false});
          }}
        >
          <TouchableOpacity 
            style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
            onPress={() => {
              this.setState({modalVisible: false});
              this.setState({gameRunning: true})
            }}  
          >
            <View style={{backgroundColor: 'white', width: 200, height: 100, borderRadius: 10, justifyContent: 'center'}}>
              <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 30}}>
                Resume
              </Text>
            </View>
          </TouchableOpacity>
        </Modal>
        <Modal isVisible={this.state.quizModalVisible}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{backgroundColor: 'white', paddingVertical: 20, paddingHorizontal: 10, borderRadius: 10}}>
              <Text style={styles.funFact}>Sustainability Fact</Text>
                <Text style={styles.questionText}>{this.state.facts[this.state.level]}</Text>
                <TouchableOpacity style={styles.button} onPress={() => {
                  this.setState({quizModalVisible: false});
                  this.setState({gameRunning: true});
                }}>
                    <Text style={{color: 'white', textAlign: 'center'}}>Continue</Text>
                </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pause_container: {
    position: 'absolute',
    top: 30,
    right: 30
  },
  pause_image: {
    width: 30,
    height: 30
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
  funFact: {
      textAlign: 'center',
      fontSize: 30,
      marginBottom: 30,
      fontWeight: '800',
      color: '#019267'
  },
  questionText: {
      textAlign: 'center',
      paddingLeft: 30,
      paddingRight: 30,
      fontSize: 20,
      fontWeight: '700',
  },
});
