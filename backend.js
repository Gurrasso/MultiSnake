//choose the siza of the grid
const gridSize = 15
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
//create a backend array of players that have join with all thier info
const backEndPlayers = {}
//add new plyers and send thier info to them
io.on('connection', (socket) => {
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
    gridSize: gridSize
  }

  io.emit("updatePlayers", backEndPlayers)

  //check if a player disconnected
  socket.on("disconnect", (reason) =>{
    console.log(reason)
    delete backEndPlayers[socket.id];
    io.emit("updatePlayers", backEndPlayers)
  })

  //change direction of player
  socket.on("keyPressed", (keycode) =>{
    switch (keycode){
      case "KeyW":
      backEndPlayers[socket.id].xdir = 0;
      backEndPlayers[socket.id].ydir = -1;
        break

      case "KeyA":
      backEndPlayers[socket.id].xdir = -1;
      backEndPlayers[socket.id].ydir = 0;
        break

      case "KeyS":
      backEndPlayers[socket.id].xdir = 0;
      backEndPlayers[socket.id].ydir = 1;
        break

      case "KeyD":
      backEndPlayers[socket.id].xdir = 1;
      backEndPlayers[socket.id].ydir = 0;
        break
    }
  })

  console.log(backEndPlayers)
});

setInterval(() => {
  for(const id in backEndPlayers){
    //move player
    var head = backEndPlayers[id].body[backEndPlayers[id].body.length-1];
    backEndPlayers[id].body.shift();
    head[0] += backEndPlayers[id].xdir;
    head[1] += backEndPlayers[id].ydir;
    backEndPlayers[id].body.push(head);
  }

  io.emit("updatePlayers", backEndPlayers)
}, 120)

server.listen(port, () => {
  console.log(`Multisnake app listening on port ${port}`)
})

console.log("server load succesfull")
