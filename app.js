//choose the siza of the grid
const gridSize = 15
//make an express server thing
const express = require('express')
const app = express()
//make an http server inside an io server
const http = require("http")
const server = http.createServer(app)
const { Server } = require('socket.io');
const io = new Server(server);
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
    x: 2,
    y: 3,
    gridSize: gridSize
  }

  io.emit("updatePlayers", players)

  console.log(players)
});

server.listen(port, () => {
  console.log(`Multisnake app listening on port ${port}`)
})

console.log("server load succesfull")
