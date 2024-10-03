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
  imageMode(CENTER)
  logoLandScape.draw();
}

//function for joining the lobby with a username
function joinLobby(){
  setTimeout(() => {
    //send out the username and that you are joining
    socket.emit("joined", {username: inputs[0].content});
  }, joinDelay);
}

//loads some stuff like for example changes colors of players(kinda janky)
setInterval(() => {
  //update colors
  for(const id in frontEndPlayers){
    const player = frontEndPlayers[id]
    if(frontEndPlayers[socket.id].loaded != true){
      EnemyPlayerNormalanimationSheet = palletteSwap(EnemyPlayerNormalanimationSheet, [color(50, 55, 245, 255), color(39, 43, 189, 255)], color(playerColorConfig.enemyColor[0], playerColorConfig.enemyColor[1], playerColorConfig.enemyColor[2]));
      PlayerNormalanimationSheet = palletteSwap(PlayerNormalanimationSheet, [color(50, 55, 245, 255), color(39, 43, 189, 255)], color(playerColorConfig.playerColor[0], playerColorConfig.playerColor[1], playerColorConfig.playerColor[2]));
      if(socket.id == id){
        //if its your player
        player.color = color(playerColorConfig.playerColor[0], playerColorConfig.playerColor[1], playerColorConfig.playerColor[2])
        player.PlayerAnimation.sheet = PlayerNormalanimationSheet
      }else {
        //if its other player
        player.color = color(playerColorConfig.enemyColor[0], playerColorConfig.enemyColor[1], playerColorConfig.enemyColor[2])
        player.PlayerAnimation.sheet = EnemyPlayerNormalanimationSheet
      }
      player.loaded = true;
    }
  }
}, loadingTime)
