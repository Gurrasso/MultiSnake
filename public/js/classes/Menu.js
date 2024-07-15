var input;
const maxUsernameLength = 10;

//function for drawing the menu
function drawMenu(){
  //checks if there is a player and if the player has joined a lobby
  if(!frontEndPlayers[socket.id]){return;}
  if(frontEndPlayers[socket.id].joined == true){
    input.hide()
    return;
  }else {
    input.show()
  }

  push();
  fill(200, 200, 200);
  rectMode(CENTER);
  rect(width/2, height/3, width/3, (width/3)/3, 10);
  fill(40, 40, 40);
  textAlign(CENTER, CENTER)
  textSize((width/3)/3)
  text("JOIN", width/2, height/2.9)
  pop();
}

//checks if player has pressed on the join button
function mouseClicked(){
  //checks if there is a player and if the player has not joined a lobby
  if(!frontEndPlayers[socket.id]){return;}
  if(frontEndPlayers[socket.id].joined == true){return;}

  if(mouseX > ((width/2)-((width/3)/2)) && mouseX < ((width/2)+((width/3)/2)) && mouseY > ((height/3)-(((width/3)/3)/2)) && mouseY < ((height/3)+(((width/3)/3)/2))){
    joinLobby();
  }
}

//function for joining the lobby with a username
function joinLobby(){
  username = "";
  if(input.value().length > 1){
    if(input.value().length > maxUsernameLength){
      for(i = 0; i < maxUsernameLength; i++){
        username+= input.value()[i];
      }
    } else {
      username = input.value();
    }
  } else{
    username = "User";
  }
  socket.emit("joined", {lobby: 0, username: username});
}
