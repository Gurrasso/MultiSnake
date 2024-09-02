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
    username = "";
    if(inputs[0].content.length > 1){
      if(inputs[0].content.length > allowedUsernameconfig.maxUsernameLength){
        for(i = 0; i < allowedUsernameconfig.maxUsernameLength; i++){
          username+= inputs[0].content[i];
        }
      } else {
        username = inputs[0].content;
      }
    } else{
      username = allowedUsernameconfig.defaultName;
    }

    for(i = 0; i < allowedUsernameconfig.bannedUsernameTerms.length; i++){
      if(username.toLowerCase().includes(allowedUsernameconfig.bannedUsernameTerms[i].toLowerCase())){
        username = allowedUsernameconfig.defaultName;
      }
    }

    socket.emit("joined", {lobby: 0, username: username});
  }, joinDelay);
}
