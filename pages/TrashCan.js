import React from "react";
import Animated from "react-native-reanimated";
import { Image } from "react-native";

const TrashCan = (props) => {
    const width = props.size[0];
    const height = props.size[1];
    const x = props.body.position.x - width / 2;
    const y = props.body.position.y - height / 2;
    const type = props.type;

    return (
        <Image
            source={
                type == "recycleCan" ?
                    require('../assets/game_screen/trashcan/recyclecan.png')
                :
                    require('../assets/game_screen/trashcan/nonrecyclecan.png')
            }
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height,
                resizeMode: 'contain'
            }}
        />
    );
};

export { TrashCan };