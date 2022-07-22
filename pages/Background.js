import React from "react";
import { View, StyleSheet, Image } from "react-native";

const Background = (props) => {

    return (
        <View style={{flex: 1}}>
            <Image 
                source={require('../assets/game_screen/background/sky.png')}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            />
        </View>
    );
};

export { Background };