var input;
//max username length
const maxUsernameLength = 10;
//terms that usernames cant include
const bannedUsernameTerms = []
//default name for users if they dont write a username
const defaultName = "User"
//delay for joining the lobby
const joinDelay = 200;
//var for the playButton
let playButton;
//all the textures get names here:
let playButtonDownSprite;
let playButtonUpSprite;
//all the sounds get names here:
var playButtonDownSound = new Howl({
      src: ['./assets/sounds/buttonDown.mp3']
});
var playButtonUpSound = new Howl({
      src: ['./assets/sounds/buttonUp.mp3']
});

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
  imageMode(CENTER);
  image(playButton, width/2, height/3, width/3, width/3);
  pop();
}

//checks if player has pressed on the join button
function mousePressed(){
  //checks if there is a player and if the player has not joined a lobby
  if(!frontEndPlayers[socket.id]){return;}
  if(frontEndPlayers[socket.id].joined == true){return;}

  if(mouseX > ((width/2)-((width/3)/2)) && mouseX < ((width/2)+((width/3)/2)) && mouseY > ((height/3)-(((width/3)/3)/2)) && mouseY < ((height/3)+(((width/3)/3)/2))){
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

  if(mouseX > ((width/2)-((width/3)/2)) && mouseX < ((width/2)+((width/3)/2)) && mouseY > ((height/3)-(((width/3)/3)/2)) && mouseY < ((height/3)+(((width/3)/3)/2))){
    //changes the button sprite to the up verison.
    playButton = playButtonUpSprite;
    playButtonUpSound.play();
    joinLobby();
  }
}

//function for joining the lobby with a username
function joinLobby(){
  setTimeout(() => {
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
      username = defaultName;
    }

    for(i = 0; i < bannedUsernameTerms.length; i++){
      if(username.toLowerCase().includes(bannedUsernameTerms[i].toLowerCase())){
        username = defaultName;
      }
    }

    socket.emit("joined", {lobby: 0, username: username});
  }, joinDelay);
}
