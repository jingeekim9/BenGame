import React from "react";
import Animated from "react-native-reanimated";
import { View, Text, StyleSheet, Image } from "react-native";

const Floor = (props) => {
    const width = props.size[0];
    const height = props.size[1];
    const x = props.body.position.x - width / 2;
    const y = props.body.position.y - height / 2;
    const score = props.score;
    const lifeNum = props.life;

    const items = [];

    for(var i = 0; i < lifeNum; i++)
    {
        items.push(<Image key={i} style={{width: 20, height: 20}} source={require('../assets/worldwide.png')} />)
    }
    
    return (
        <View 
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height,
                backgroundColor: '#876445'
            }}
        >
            <View style={styles.bottomContainer}>
                <Text style={styles.textStyle}>Score: {score}</Text>
                <View style={styles.lifeContainer}>
                    <Text style={styles.lifeText}>
                        Lives: 
                    </Text>
                    <View style={styles.lifeImage}>
                    {items}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomContainer: {  
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    textStyle: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        padding: 10
    },
    lifeContainer: {
        flexDirection: 'row'
    },
    lifeText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        padding: 10
    },
    lifeImage: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        paddingLeft: 0,
        paddingBottom: 5,
        alignItems: 'center'
    }
})

export { Floor };