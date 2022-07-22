import React from "react";
import Animated from "react-native-reanimated";
import { Image } from "react-native";

const Trash = (props) => {
    const width = props.size[0];
    const height = props.size[1];
    const x = props.body.position.x - width / 2;
    const y = props.body.position.y - height / 2;
    const type = props.type;
    const random = props.random;

    return (
        <Image
            source={
                type == 0 ?
                    random == 0 ?
                        require('../assets/game_screen/trash/nonrecyclable/chopsticks.png')
                    :
                    random == 1 ?
                        require('../assets/game_screen/trash/nonrecyclable/paper_cup.png')
                    :
                    random == 2 ?
                        require('../assets/game_screen/trash/nonrecyclable/pen.png')
                    :
                    random == 3 ?
                        require('../assets/game_screen/trash/nonrecyclable/straw.png')
                    :
                        require('../assets/game_screen/trash/nonrecyclable/toothbrush.png')
                :
                type == 1 &&
                    random == 0 ?
                        require('../assets/game_screen/trash/recyclable/can.png')
                    :
                    random == 1 ?
                        require('../assets/game_screen/trash/recyclable/glass_bottle.png')
                    :
                    random == 2 ?
                        require('../assets/game_screen/trash/recyclable/paper.png')
                    :
                    random == 3 ?
                        require('../assets/game_screen/trash/recyclable/plastic.png')
                    :
                        require('../assets/game_screen/trash/recyclable/vinyl.png')
            }
            style={{
                position: "absolute",
                left: x,
                top: y,
                width: width,
                height: height,
                zIndex: 10000,
                resizeMode: 'contain'
            }}
        />
    );
};

export { Trash };