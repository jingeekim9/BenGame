import React from "react";
import Animated from "react-native-reanimated";

const Trash = (props) => {
    const width = props.size[0];
    const height = props.size[1];
    const x = props.body.position.x - width / 2;
    const y = props.body.position.y - height / 2;
    const type = props.type;

    return (
        <Animated.View 
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height,
                backgroundColor: type ? "blue" : "red"
            }}
        />
    );
};

export { Trash };