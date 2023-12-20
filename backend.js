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
  
//specify the computer port it will be broadcasted from
const port = 3000
//make the app file public
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})
//create a backend array of players that have join with all thier info
const players = {}
//add new plyers and send thier info to them
io.on('connection', (socket) => {
  console.log('a user connected');
  players[socket.id] = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
    gridSize: gridSize
  }

  socket.on("disconnect", (reason) =>{
    console.log(reason)
    delete players[socket.id];
    io.emit("updatePlayers", players)
  })

  io.emit("updatePlayers", players)

  console.log(players)
});

server.listen(port, () => {
  console.log(`Multisnake app listening on port ${port}`)
})

console.log("server load succesfull")
