//function for drawing the menu
function drawMenu(){
  //checks if there is a player and if the player has joined a lobby
  if(!frontEndPlayers[socket.id]){return;}
  if(frontEndPlayers[socket.id].joined == true){
    inputs[0].hide = true;
    return;
  }else {
    inputs[0].hide = false;
  }

  //draws the play button
  push();
  imageMode(CENTER);
  image(playButton, playButtonX, playButtonY, playButtonSize, playButtonSize);
  pop();
  //draws the input username box outline
  push();
  imageMode(CORNER);
  image(inputBox, width/2-(playButtonSize)/2, height/usernameInputConfig.y, playButtonSize, playButtonSize);
  pop();
  //draws the logo
  logoLandScape.draw();
}

//function for joining the lobby with a username
function joinLobby(){
  setTimeout(() => {
    //send out the username and that you are joining
    socket.emit("joined", {username: inputs[0].content});
  }, joinDelay);
}
