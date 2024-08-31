
const playerInputs = []
let sequenceNumber = 0
const allowedLetters="abcdefghijklmnopqrstuvwxyzåäö "
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
    if(frontEndPlayers[socket.id].joined == true) return;
    playButton = playButtonDownSprite;
    playButtonDownSound.play();
  }

  //write to content of selected input
  for(i in inputs){
    if(allowedLetters.includes(key.toLowerCase()) == true){
      if(inputs[i].selected == true && inputs[i].content.length < inputs[i].maxChar){
        inputs[i].content = inputs[i].content.concat(key)
      }
    }
  }

  //delete last letter of inputs content
  if(keyCode === 8){
    for(i in inputs){
      if(inputs[i].selected == true){
        inputs[i].content = inputs[i].content.slice(0, -1);
      }
    }
  }
}

function keyReleased() {
  if(!frontEndPlayers[socket.id]) return;
  if(frontEndPlayers[socket.id].joined == true) return;

  if (keyCode === 13) {
    //checks if player has released space or enter and if so changes the button sprite to the up verison and joins.
    playButton = playButtonUpSprite;
    playButtonUpSound.play();
    joinLobby();
  }
}

//checks if player has pressed on the join button
function mousePressed(){
  //check if player has selected or unselected username box
  for(i in inputs){
    if(mouseX > inputs[i].x - inputs[i].width/2 && mouseX < inputs[i].x + inputs[i].width/2 && mouseY > inputs[i].y && mouseY < inputs[i].y + inputs[i].height){
      //selects the input box
      inputs[i].selected = true;
    }else{
      inputs[i].selected = false;
    }
  }

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
