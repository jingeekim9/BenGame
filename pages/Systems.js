import Matter from "matter-js";
import { Dimensions } from "react-native";
import { Trash } from "./Trash";

let trashId = 0;
let timePassed = 0;
let dropTrash = false;

const distance = ([x1, y1], [x2, y2]) => {
    return Math.sqrt(Math.abs(Math.pow(x2 - x1, 2)+ Math.pow(y2 - y1, 2)))
}

const Physics = (entities, { time, dispatch }) => {
    let engine = entities["physics"].engine;
    let world = entities["physics"].world;
    let score = entities['floor'].score;

    let life = entities.floor.life;
 
    if(life == 0 || trashId >= (score + 30))
    {
        entities.floor.life = 3;
        entities.floor.score = 0;

        for(var i = 0; i <= trashId; i++)
        {
            if(entities[i])
            {
                Matter.Composite.remove(world, entities[i].body);
                delete entities[i];
            }
        }
        
        trashId = 0;

        dispatch("game-over");
    }

    Matter.Engine.update(engine, time.delta);

    return entities;
}

const createTrash = (entities, { time, dispatch }) => {
    timePassed = timePassed + time.delta;
    let score = entities.floor.score

    if((Math.round(timePassed/1000) * 1000) % 2000 == 0)
    {
        if(dropTrash == false)
        {
            if(score < 20)
            {
                // The code that creates a new trash
                const {width, height} = Dimensions.get("screen");

                const boxSize = Math.trunc(Math.max(width, height) * 0.05);

                const randomPosition = Math.floor(Math.random() * (width- 125 - 125)) + 125;

                const trash = Matter.Bodies.rectangle(randomPosition, 0, boxSize, boxSize);

                const type = Math.round(Math.random());
                const random = Math.round(Math.random() * 0);

                let world = entities["physics"].world;

                Matter.World.add(world, [trash]);

                entities[++trashId] = {
                    body: trash,
                    size: [boxSize, boxSize],
                    id: trash.id,
                    type: type,
                    random: random,
                    renderer: Trash
                }
                dropTrash = true;
            }
            else if(score >= 20 && score < 40)
            {
                // The code that creates a new trash
                const {width, height} = Dimensions.get("screen");

                const boxSize = Math.trunc(Math.max(width, height) * 0.05);

                const randomPosition = Math.floor(Math.random() * (width- 125 - 125)) + 125;

                const trash = Matter.Bodies.rectangle(randomPosition, 0, boxSize, boxSize);

                const type = Math.round(Math.random());
                const random = Math.round(Math.random() * 1);

                let world = entities["physics"].world;

                Matter.World.add(world, [trash]);

                entities[++trashId] = {
                    body: trash,
                    size: [boxSize, boxSize],
                    id: trash.id,
                    type: type,
                    random: random,
                    renderer: Trash
                }
                dropTrash = true;
                if(score == 20)
                {
                    dispatch('next_level')
                }
            }
            else if(score >= 40 && score < 60)
            {
                for(var i = 0; i < 2; i++)
                {
                   // The code that creates a new trash
                   const {width, height} = Dimensions.get("screen");

                   const boxSize = Math.trunc(Math.max(width, height) * 0.05);
   
                   const randomPosition = Math.floor(Math.random() * (width- 125 - 125)) + 125;
   
                   const trash = Matter.Bodies.rectangle(randomPosition, 0, boxSize, boxSize);
   
                   const type = Math.round(Math.random());
                   const random = Math.round(Math.random() * 2);
   
                   let world = entities["physics"].world;
   
                   Matter.World.add(world, [trash]);
   
                   entities[++trashId] = {
                       body: trash,
                       size: [boxSize, boxSize],
                       id: trash.id,
                       type: type,
                       random: random,
                       renderer: Trash
                   }
                }
                dropTrash = true;
                if(score == 40)
                {
                    dispatch('next_level')
                }
            }
            else if(score >= 60 && score < 80)
            {
                for(var i = 0; i < 2; i++)
                {
                   // The code that creates a new trash
                   const {width, height} = Dimensions.get("screen");

                   const boxSize = Math.trunc(Math.max(width, height) * 0.05);
   
                   const randomPosition = Math.floor(Math.random() * (width- 125 - 125)) + 125;
   
                   const trash = Matter.Bodies.rectangle(randomPosition, 0, boxSize, boxSize);
   
                   const type = Math.round(Math.random());
                   const random = Math.round(Math.random() * 3);
   
                   let world = entities["physics"].world;
   
                   Matter.World.add(world, [trash]);
   
                   entities[++trashId] = {
                       body: trash,
                       size: [boxSize, boxSize],
                       id: trash.id,
                       type: type,
                       random: random,
                       renderer: Trash
                   }
                }
                dropTrash = true;
                if(score == 60)
                {
                    dispatch('next_level')
                }
            }
            else
            {
                for(var i = 0; i < 3; i++)
                {
                   // The code that creates a new trash
                   const {width, height} = Dimensions.get("screen");

                   const boxSize = Math.trunc(Math.max(width, height) * 0.05);
   
                   const randomPosition = Math.floor(Math.random() * (width- 125 - 125)) + 125;
   
                   const trash = Matter.Bodies.rectangle(randomPosition, 0, boxSize, boxSize);
   
                   const type = Math.round(Math.random());
                   const random = Math.round(Math.random() * 4);
   
                   let world = entities["physics"].world;
   
                   Matter.World.add(world, [trash]);
   
                   entities[++trashId] = {
                       body: trash,
                       size: [boxSize, boxSize],
                       id: trash.id,
                       type: type,
                       random: random,
                       renderer: Trash
                   }
                }
                dropTrash = true;
                if(score == 80)
                {
                    dispatch('next_level')
                }
            }
            
        }
    }
    else
    {
        dropTrash = false;
    }
    
    return entities;
}

const MoveTrash = (entities, { touches }) => {
    let constraint = entities["physics"].constraint;

    let start = touches.find(x => x.type == "start");

    if(start)
    {
        let startPos = [start.event.pageX, start.event.pageY];

        let trashId = Object.keys(entities).find(key => {
            let body = entities[key].body;

            return(
                body && distance([body.position.x, body.position.y], startPos) < 25   
           );
        });
        
        if(trashId)
        {
            constraint.pointA = { x: startPos[0], y: startPos[1] };
            constraint.bodyB = entities[trashId].body;
            constraint.pointB = { x: 0, y: 0};
            constraint.angleB = entities[trashId].body.angle;
        }
    }

    let move = touches.find(x => x.type === "move");

    if(move)
    {
        constraint.pointA = {x: move.event.pageX, y: move.event.pageY };
    }
    
    let end = touches.find(x => x.type === "end");

    if(end)
    {
        constraint.pointA = null;
        constraint.bodyB = null,
        constraint.pointB = null;
    }

    return entities;

}

const deleteTrash = (entities, { dispatch }) => {
    // The code that deletes the trash
    const recycleCan = entities.recycleCan.body;
    const recycleCanID = recycleCan.id;
    const nonRecycleCan = entities.nonRecycleCan.body;
    const nonRecycleCanID = nonRecycleCan.id;
    let engine = entities["physics"].engine;
    let world = entities["physics"].world;
    let score = entities["floor"].score;
    let life = entities["floor"].life;
    

    Matter.Events.on(engine, 'collisionStart', (event) => {
        if(event.pairs[0].bodyA.id == recycleCanID || event.pairs[0].bodyA.id == nonRecycleCanID )
        {
            let trashId = event.pairs[0].bodyB.id
            let trash = Object.keys(entities).find(key => {
                let body = entities[key];
    
                return (
                    body.id === trashId
                );
            });

            if(entities[trash] && event.pairs[0].bodyA.id == recycleCanID && entities[trash].type == 1)
            {
                Matter.Composite.remove(world, entities[trash].body);
                delete entities[trash];
                entities["floor"].score = entities["floor"].score + 1;
                dispatch("update-score");
            }
            
            if (entities[trash] && event.pairs[0].bodyA.id == nonRecycleCanID && entities[trash].type == 0)
            {
                Matter.Composite.remove(world, entities[trash].body);
                delete entities[trash];
                entities["floor"].score = entities["floor"].score + 1;
                dispatch("update-score");
            }

            if(entities[trash] && event.pairs[0].bodyA.id == recycleCanID && entities[trash].type == 0)
            {
                Matter.Composite.remove(world, entities[trash].body);
                delete entities[trash];
                entities["floor"].life = entities["floor"].life - 1;
            }
            
            if (entities[trash] && event.pairs[0].bodyA.id == nonRecycleCanID && entities[trash].type == 1)
            {
                Matter.Composite.remove(world, entities[trash].body);
                delete entities[trash];
                entities["floor"].life = entities["floor"].life - 1;
            }
        }
    })

    return entities;
}

export { Physics, createTrash, MoveTrash, deleteTrash };