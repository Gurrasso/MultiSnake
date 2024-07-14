//function for drawing the menu
function drawMenu(){
  //checks if there is a player and if the player has joined a lobby
  if(!frontEndPlayers[socket.id]){return;}
  if(frontEndPlayers[socket.id].joined == true){return;}

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
    socket.emit("joined", {lobby: 0})
  }
}
