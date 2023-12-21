//input for changing the player position + other player related functions maybe
function keyPressed() {
  if(!frontEndPlayers[socket.id]) return;
  
  if (keyCode === LEFT_ARROW || keyCode === 65) {
    socket.emit("keyPressed", "KeyA")
    frontEndPlayers[socket.id].xdir = -1;
    frontEndPlayers[socket.id].ydir = 0;
  } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
    socket.emit("keyPressed", "KeyD")
    frontEndPlayers[socket.id].xdir = 1;
    frontEndPlayers[socket.id].ydir = 0;
  } else if (keyCode === UP_ARROW || keyCode === 87) {
    socket.emit("keyPressed", "KeyW")
    frontEndPlayers[socket.id].xdir = 0;
    frontEndPlayers[socket.id].ydir = -1;
  } else if (keyCode === DOWN_ARROW || keyCode === 83) {
    socket.emit("keyPressed", "KeyS")
    frontEndPlayers[socket.id].xdir = 0;
    frontEndPlayers[socket.id].ydir = 1;
  }
}
