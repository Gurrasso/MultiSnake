//vars for input
const inputBlinkerSpeed = 600;
var inputs = [];
//max username length
const maxUsernameLength = 10;
//terms that usernames cant include
const bannedUsernameTerms = []
//default name for users if they dont write a username
const defaultName = "Guest"
//ypos for the username input box
const inputY=2
//delay for joining the lobby
const joinDelay = 70;
//var for the playButton
let playButton;
let playButtonX;
let playButtonY;
let playButtonSize;
//all the menu textures get names here:
let playButtonDownSprite;
let playButtonUpSprite;
let logoLandScapeSheet;
let border;
let inputBox;
//sprite sheets
let logoLandScape;
//all the menu sounds here:
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
  image(inputBox, width/2-(playButtonSize)/2, height/inputY, playButtonSize, playButtonSize);
  pop();
  //draws the logo
  logoLandScape.draw();
}

//function for joining the lobby with a username
function joinLobby(){
  setTimeout(() => {
    username = "";
    if(inputs[0].content.length > 1){
      if(inputs[0].content.length > maxUsernameLength){
        for(i = 0; i < maxUsernameLength; i++){
          username+= inputs[0].content[i];
        }
      } else {
        username = inputs[0].content;
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
