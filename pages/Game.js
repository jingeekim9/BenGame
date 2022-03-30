import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Matter from "matter-js";
import { Trash } from "./Trash";
import { TrashCan } from "./TrashCan";
import { Floor } from "./Floor";
import { Wall } from "./Wall";
import { Physics, createTrash, MoveTrash, deleteTrash } from "./Systems";
import { useFocusEffect } from '@react-navigation/native';

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

const recycleCan = Matter.Bodies.rectangle(40, height/2, 50, 50, {isStatic: true, collisionFilter: {category: 2}});

const nonRecycleCan = Matter.Bodies.rectangle(width-40, height/2, 50, 50, {isStatic: true, collisionFilter: {category: 2}});

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
      score: 0
    }
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
          physics: {
            engine: engine,
            world: world,
            constraint: constraint
          },
          recycleCan: {
            body: recycleCan,
            size: [50, 50],
            backgroundColor: 'blue',
            renderer: TrashCan
          },
          nonRecycleCan: {
            body: nonRecycleCan,
            size: [50, 50],
            backgroundColor: 'red',
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
              this.props.navigation.navigate("GameOver", {score: this.state.score});
              break;
            case "update-score":
              this.setState({score: this.state.score + 1});
          }
        }}
      >
        <StatusBar hidden={true} />
        <RestartPlay 
          gameRunning={this.props.gameRunning}
          onUpdate={this._handleUpdate}
        />
      </GameEngine>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
