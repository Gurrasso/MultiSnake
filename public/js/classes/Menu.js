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

//draws a spinning loading animation
function drawLoading(){
  if(loadingBarOffset>1){
    loadingBarOffset = 1;
  }else{
    loadingBarOffset += (1/loadingTime)*15;
  }
  background("#0c8a0e");
  //draws the loading sprite
  push();
  imageMode(CENTER);
  noSmooth();
  noStroke();
  fill(loadingAnimationConfig.loadingbarColor)
  rect((width/2-playButtonSize/2)+playButtonSize/32, height/2-(playButtonSize/32)*4, (playButtonSize-((playButtonSize/32)*2))*max( 0, min(loadingBarOffset, 1) ), (playButtonSize/32)*8);
  image(loadingSprite, width/2, height/2, playButtonSize, playButtonSize);
  pop();
}

//loads some stuff like for example changes colors of players(kinda janky)
setInterval(() => {
  //update colors
  for(const id in frontEndPlayers){
    const player = frontEndPlayers[id]
    if(loaded != true){
      EnemyPlayerNormalanimationSheet = paletteSwap(EnemyPlayerNormalanimationSheet, [color(50, 55, 245, 255), color(39, 43, 189, 255)], color(playerColorConfig.enemyColor[0], playerColorConfig.enemyColor[1], playerColorConfig.enemyColor[2]));
      PlayerNormalanimationSheet = paletteSwap(PlayerNormalanimationSheet, [color(50, 55, 245, 255), color(39, 43, 189, 255)], color(playerColorConfig.playerColor[0], playerColorConfig.playerColor[1], playerColorConfig.playerColor[2]));
      if(socket.id == id){
        //if its your player
        player.color = color(playerColorConfig.playerColor[0], playerColorConfig.playerColor[1], playerColorConfig.playerColor[2])
        player.PlayerAnimation.sheet = PlayerNormalanimationSheet
      }else {
        //if its other player
        player.color = color(playerColorConfig.enemyColor[0], playerColorConfig.enemyColor[1], playerColorConfig.enemyColor[2])
        player.PlayerAnimation.sheet = EnemyPlayerNormalanimationSheet
      }
      loaded = true;
    }
  }
}, 500)
