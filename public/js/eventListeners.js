
const playerInputs = []
let sequenceNumber = 0
//input for changing the player position + joining a lobby
function keyPressed() {
  if(!frontEndPlayers[socket.id]) return;

  if (keyCode === LEFT_ARROW || keyCode === 65) {
    sequenceNumber++
    playerInputs.push({sequenceNumber, dx: -1, dy: 0})
    socket.emit("keyPressed", {keycode: "KeyA", sequenceNumber})
    frontEndPlayers[socket.id].xdir = -1;
    frontEndPlayers[socket.id].ydir = 0;
  } else if (keyCode === RIGHT_ARROW || keyCode === 68) {
    sequenceNumber++
    playerInputs.push({sequenceNumber, dx: 1, dy: 0})
    socket.emit("keyPressed", {keycode: "KeyD", sequenceNumber})
    frontEndPlayers[socket.id].xdir = 1;
    frontEndPlayers[socket.id].ydir = 0;
  } else if (keyCode === UP_ARROW || keyCode === 87) {
    sequenceNumber++
    playerInputs.push({sequenceNumber, dx: 0, dy: -1})
    socket.emit("keyPressed", {keycode: "KeyW", sequenceNumber})
    frontEndPlayers[socket.id].xdir = 0;
    frontEndPlayers[socket.id].ydir = -1;
  } else if (keyCode === DOWN_ARROW || keyCode === 83) {
    sequenceNumber++
    playerInputs.push({sequenceNumber, dx: 0, dy: 1})
    socket.emit("keyPressed", {keycode: "KeyS", sequenceNumber})
    frontEndPlayers[socket.id].xdir = 0;
    frontEndPlayers[socket.id].ydir = 1;
  } else if (keyCode === 13) {
    //checks if player has pressed space or enter and if so changes the button sprite to the down verison.
    playButton = playButtonDownSprite;
    playButtonDownSound.play();
  }
}

function keyReleased() {
  if(!frontEndPlayers[socket.id]) return;

  if (keyCode === 13) {
    //checks if player has released space or enter and if so changes the button sprite to the up verison and joins.
    playButton = playButtonUpSprite;
    playButtonUpSound.play();
    joinLobby();
  }
}

//checks if player has pressed on the join button
function mousePressed(){
  //checks if there is a player and if the player has not joined a lobby
  if(!frontEndPlayers[socket.id]){return;}
  if(frontEndPlayers[socket.id].joined == true){return;}

  if(mouseX > ((playButtonX)-((playButtonSize)/2)) && mouseX < ((playButtonX)+((playButtonSize)/2)) && mouseY > ((playButtonY)-(((playButtonSize)/2)/2)) && mouseY < ((playButtonY)+(((playButtonSize)/3)/2))){
    //changes the button sprite to the down verison.
    playButton = playButtonDownSprite;
    playButtonDownSound.play();
  }
}

//checks if player has released on the join button
function mouseReleased(){
  //checks if there is a player and if the player has not joined a lobby
  if(!frontEndPlayers[socket.id]){return;}
  if(frontEndPlayers[socket.id].joined == true){return;}

  if(mouseX > ((playButtonX)-((playButtonSize)/2)) && mouseX < ((playButtonX)+((playButtonSize)/2)) && mouseY > ((playButtonY)-(((playButtonSize)/2)/2)) && mouseY < ((playButtonY)+(((playButtonSize)/3)/2))){
    //changes the button sprite to the up verison and joins.
    playButton = playButtonUpSprite;
    playButtonUpSound.play();
    joinLobby();
  }
}
