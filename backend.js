//choose the siza of the grid
const gridSize = 32;
//maximum length of the players moveQueue
const moveQueueLength = 2;
//speed var for the speed of the player and the speed of when the dir will change
const playerSpeed = 120;
//make an express server thing
const express = require('express')
const app = express()
//make an http server inside an io server
const http = require("http")
const server = http.createServer(app)
const { Server } = require('socket.io');
const io = new Server(server, {pingInterval: 2000,
  pingTimeout: 4000});

move = false;

//specify the computer port it will be broadcasted from
const port = 3000
//make the app file public
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
const backEndFood = {}
//create a backend array of players that have join with all thier info
const backEndPlayers = {}
//add new plyers and send thier info to them
io.on('connection', (socket) => {
  //object for backEndFood
  backEndFood[socket.id] = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
  }

  console.log('a user connected');
  var x = Math.floor(Math.random() * gridSize);
  var y = Math.floor(Math.random() * gridSize);
  backEndPlayers[socket.id] = {
    x: x,
    y: y,
    r: 169,
    g: 0,
    b: 255,
    xdir: 0,
    ydir: 0,
    body: [[x, y]],
    gridSize: gridSize,
    sequenceNumber: 0,
    len: 0,
    moveQueue: [],
    joined: false
  }

  io.emit("updatePlayers", backEndPlayers)

  //check if a player disconnected
  socket.on("disconnect", (reason) =>{
    console.log(reason)
    delete backEndPlayers[socket.id];
    delete backEndFood[socket.id];
    io.emit("updatePlayers", backEndPlayers)
  })

  //checks if a player has asked to join the lobby.
  socket.on("joined", ({lobby}) =>{
    backEndPlayers[socket.id].joined = true;
    io.emit("updatePlayers", backEndPlayers)
  })

  //Adds the players moves to a queue with a max length of moveQueueLength. Player also cant move in the oppisite dir och thier current direction.
  if(backEndPlayers[socket.id].moveQueue.length < moveQueueLength){
    socket.on("keyPressed", ({keycode, sequenceNumber}) =>{
      backEndPlayers[socket.id].sequenceNumber = sequenceNumber;
      switch (keycode){
        case "KeyW":
          //checks if player has joined the lobby
          if(backEndPlayers[socket.id].joined == true){
            backEndPlayers[socket.id].moveQueue.push([0, -1]);
          }
          break

        case "KeyA":
          //checks if player has joined the lobby
          if(backEndPlayers[socket.id].joined == true){
            backEndPlayers[socket.id].moveQueue.push([-1, 0]);
          }
          break

        case "KeyS":
          //checks if player has joined the lobby
          if(backEndPlayers[socket.id].joined == true){
            backEndPlayers[socket.id].moveQueue.push([0, 1]);
          }
          break

        case "KeyD":
          //checks if player has joined the lobby
          if(backEndPlayers[socket.id].joined == true){
            backEndPlayers[socket.id].moveQueue.push([1, 0]);
          }
          break
      }
    })
  }
  console.log(backEndPlayers)
});

//moves the players.
setInterval(() => {
  for(const id in backEndPlayers){
    //move player
    for(let i = backEndPlayers[id].body.length-2; i >= 0; i--){
      backEndPlayers[id].body[i+1] = { ...backEndPlayers[id].body[i] }
    }

    backEndPlayers[id].body[0][0] += backEndPlayers[id].xdir;
    backEndPlayers[id].body[0][1] += backEndPlayers[id].ydir;
  }
}, playerSpeed)

//changes the dirs of the players with the moveQueue.
setInterval(() => {
  try{
    for(const id in backEndPlayers){
      for(i = 0; i < backEndPlayers[id].moveQueue.length; i++){
        if(backEndPlayers[id].moveQueue[0][0]*-1 == backEndPlayers[id].xdir || backEndPlayers[id].moveQueue[0][1]*-1 == backEndPlayers[id].ydir){
          if(backEndPlayers[id].len > 0){
            backEndPlayers[id].moveQueue.shift();
          }
        }else{
          break;
        }
      }
      if(backEndPlayers[id].moveQueue.length > 0){
        backEndPlayers[id].xdir = backEndPlayers[id].moveQueue[0][0];
        backEndPlayers[id].ydir = backEndPlayers[id].moveQueue[0][1];
        backEndPlayers[id].moveQueue.shift();
      }
    }
  } finally{
    return;
  }
}, playerSpeed)

//Checks if the player has hit itself or another snake and if so tells them to die().
setInterval(() => {
  //check if the player is in itself
  try{
    for(const id in backEndPlayers){
      if(backEndPlayers[id].joined == true){
        for(const i in backEndPlayers[id].body){
          if(i>1){
            if(backEndPlayers[id].body[0][0] == backEndPlayers[id].body[i][0] && backEndPlayers[id].body[0][1] == backEndPlayers[id].body[i][1]){
              die(id)
            }
          }
        }
        //check if the player hits another player
        for(const j in backEndPlayers){
          if(backEndPlayers[j] != backEndPlayers[id]){
            for(const i in backEndPlayers[j].body){
              if(backEndPlayers[id].body[0][0] == backEndPlayers[j].body[i][0] && backEndPlayers[id].body[0][1] == backEndPlayers[j].body[i][1]){
                die(id)
              }
            }
          }
        }
      }
    }
  }finally{
    return;
  }
}, 15)

//checks if a player has gone out of bounds and if so tells them to die().
setInterval(() => {
  try{
    for(const id in backEndPlayers){
      if(backEndPlayers[id].joined == true){
        if(backEndPlayers[id].body[0][0] >= backEndPlayers[id].gridSize || backEndPlayers[id].body[0][1] == backEndPlayers[id].gridSize || backEndPlayers[id].body[0][1] < 0 || backEndPlayers[id].body[0][0] < 0){
          die(id)
        }
      }
    }
  }finally{
    return;
  }
}, 15)

//A function that tells the backend what to do when a player dies.
function die(id){
  // delete backEndPlayers[id];
  // delete backEndFood[id];
  // io.emit(updatePlayers", backEndPlayers)
  var x = Math.floor(Math.random() * gridSize);
  var y = Math.floor(Math.random() * gridSize);
  backEndPlayers[id] = {
    x: x,
    y: y,
    r: 169,
    g: 0,
    b: 255,
    xdir: 0,
    ydir: 0,
    body: [[x, y]],
    gridSize: gridSize,
    sequenceNumber: 0,
    len: 0,
    moveQueue: []
  }
}

//checks if the player has eaten food and if so they grow the player.
setInterval(() => {
  for(const id in backEndPlayers){
    //check if player has eaten food
    for(const i in backEndFood){
      if(backEndPlayers[id].body[0][0] == backEndFood[i].x && backEndPlayers[id].body[0][1] == backEndFood[i].y){
        //grow player
        let head = backEndPlayers[id].body[backEndPlayers[id].body.length-1];
        backEndPlayers[id].len++;
        backEndPlayers[id].body.push(head);
        //remove food and spawn new one
        backEndFood[i] = {
          x: Math.floor(Math.random() * gridSize),
          y: Math.floor(Math.random() * gridSize)
        }
      }
    }
  }
  io.emit("updatePlayers", backEndPlayers)
  io.emit("updateFood", backEndFood)
}, 120)

server.listen(port, () => {
  console.log(`Multisnake app listening on port ${port}`)
})

console.log("server load succesfull")
