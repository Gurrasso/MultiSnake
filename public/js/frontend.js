
//centers the canvas
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

//does all the nesessary things for setting up the game
function setup() {
  if(windowWidth < windowHeight){
    cnv = createCanvas(windowWidth, windowWidth);
  }else {
    cnv = createCanvas(windowHeight, windowHeight);
  }
  //centers the canvas
  centerCanvas();
  grid = new Grid(0)
  colorMode(RGB, 255);

  //vars for playButtons position
  playButtonX = width/playButtonConfig.playButtonX;
  playButtonY = height/playButtonConfig.playButtonY;
  playButtonSize = width/playButtonConfig.playButtonSize;

  //create input box for username
  inputs[0]= new InputField();
  inputs[0].message = usernameInputConfig.message;
  inputs[0].x = width/usernameInputConfig.x;
  inputs[0].y = height/usernameInputConfig.y;
  inputs[0].width = width/usernameInputConfig.size;
  inputs[0].height = (width/usernameInputConfig.size)*0.22;
  inputs[0].maxChar = usernameInputConfig.maxCharacters;
  inputs[0].blinker = usernameInputConfig.blinker;
  inputs[0].c = color(usernameInputConfig.defaultColor);

  //load all assets
  loadingSprite = loadImage("./assets/sprites/loadingSprite.png");
  playButtonUpSprite = loadImage("./assets/sprites/playButtonUp.png");
  playButtonDownSprite = loadImage("./assets/sprites/playButtonDown.png");
  playButton = playButtonUpSprite;
  logoLandScapeSheet = loadImage("./assets/sprites/logoLandScape-Sheet.png");
  border = loadImage("./assets/sprites/Border.png");
  inputBox = loadImage("./assets/sprites/InputBox.png");
  PlayerNormalanimationSheet = loadImage("./assets/sprites/PlayerNormalanimation.png");
  EnemyPlayerNormalanimationSheet = loadImage("./assets/sprites/PlayerNormalanimation.png");
  FFFFORWA = loadFont("./assets/fonts/FFFFORWA.TTF");
  //create new animation for sprite sheets
  logoLandScape = new Sprite(logoLandScapeSheet, width/2+(width/63), height/5.6, width*1.13, 50, 0.2, 6400, 64)

  //define offset
  offset = width/offsetConfig.offset;
  //define game area
  gameWidth = width-offset*2;
  gameHeight = height-offset*2;
}

//Puts new players into the players obj where we can see thier basic info
socket.on("updatePlayers", (backEndPlayers)=>{
  for(const id in backEndPlayers){
    const backEndPlayer = backEndPlayers[id]

    //check if the player already exists
    if(!frontEndPlayers[id]){
      //creates new grid
      grid = new Grid(backEndPlayer.gridSize)
      //creates the actual grid inside the grid class
      grid.grid = createGrid(grid.grid, grid.size, grid.size)
      //creates a locally stored id for the player
      if(!localStorage.getItem("ID")){
        localStorage.setItem("ID", socket.id);
      }
      //load save data from locally stored ID
      socket.emit("sendID", {id:localStorage.getItem("ID")})

      try{
        //create a new player
        if(socket.id == id){
          //if its your player
          playerColor = color(playerColorConfig.playerColor[0], playerColorConfig.playerColor[1], playerColorConfig.playerColor[2])
          Normalanimation = PlayerNormalanimationSheet
        }else {
          //if its other player
          playerColor = color(playerColorConfig.enemyColor[0], playerColorConfig.enemyColor[1], playerColorConfig.enemyColor[2])
          Normalanimation = EnemyPlayerNormalanimationSheet
        }
        frontEndPlayers[id] = new Player({
          grid: grid,
          color: playerColor,
          username: backEndPlayer.username,
          xdir: backEndPlayer.xdir,
          ydir: backEndPlayer.ydir,
          body: backEndPlayer.body,
          len: backEndPlayer.len,
          joined: backEndPlayer.joined,
          playerSmoothingOffset: backEndPlayer.playerSmoothingOffset,
          Normalanimation: Normalanimation,
          playerSpeed: backEndPlayer.playerSpeed,
          playerSmoothing: backEndPlayer.playerSmoothing
        });
        //give the player an x and y
        frontEndPlayers[id].body[0] =[backEndPlayer.x, backEndPlayer.y]
      }catch{
        return
      }
    } else {
      if(id === socket.id){
        //if a player already exists
        frontEndPlayers[id].body = backEndPlayer.body
        frontEndPlayers[id].len = backEndPlayer.len
        frontEndPlayers[id].joined = backEndPlayer.joined
        frontEndPlayers[id].username = backEndPlayer.username
        frontEndPlayers[id].playerSmoothingOffset = backEndPlayer.playerSmoothingOffset
        frontEndPlayers[id].ydir = backEndPlayer.ydir
        frontEndPlayers[id].xdir = backEndPlayer.xdir
        frontEndPlayers[id].playerSpeed = backEndPlayer.playerSpeed
        frontEndPlayers[id].playerSmoothing = backEndPlayer.playerSmoothing

      }else{
        //for all other players
        frontEndPlayers[id].body = backEndPlayer.body
        frontEndPlayers[id].len = backEndPlayer.len
        frontEndPlayers[id].joined = backEndPlayer.joined
        frontEndPlayers[id].username = backEndPlayer.username
        frontEndPlayers[id].playerSmoothingOffset = backEndPlayer.playerSmoothingOffset
        frontEndPlayers[id].ydir = backEndPlayer.ydir
        frontEndPlayers[id].xdir = backEndPlayer.xdir
        frontEndPlayers[id].playerSpeed = backEndPlayer.playerSpeed
        frontEndPlayers[id].playerSmoothing = backEndPlayer.playerSmoothing


      }
    }
  }
  //delete disconnected players
  for(const id in frontEndPlayers){
    if(!backEndPlayers[id]){
      delete frontEndPlayers[id]
    }
  }
})

//update the food.
socket.on("updateFood", (backEndFood)=>{
  for (const id in backEndFood){
    if(!frontEndFood[id]){
      frontEndFood[id] = new Food({
        grid: grid,
        x: backEndFood.x,
        y: backEndFood.y
      })
    }else {
      if(id === socket.id){
        frontEndFood[id].x = backEndFood[id].x;
        frontEndFood[id].y = backEndFood[id].y;
      }else{
        frontEndFood[id].x = backEndFood[id].x;
        frontEndFood[id].y = backEndFood[id].y;
      }
    }
  }
  for(const id in frontEndFood){
    if(!backEndFood[id]){
      delete frontEndFood[id]
    }
  }
})

//updates the player data after the save data has been retrieved
socket.on("updateSaveData", ({saveData, id}) =>{
  if(!saveData.username){return}
  if(id != localStorage.getItem("ID")){return}
  frontEndPlayers[socket.id].username = saveData.username;
  //make the players input field have the right content
  inputs[0].content = frontEndPlayers[socket.id].username;
})

function windowResized() {
  centerCanvas();
}

//does all the things needed every frame
function draw(){

  //only draw if everything is loaded
  if(loaded == false){
    drawLoading();
    return;
  }else if(loaded == true && tempTrigger == false){
    clientSidePrediction();
    tempTrigger = true;
  }
  background(color(bgu[0], bgu[1], bgu[2]));
  push();
  //offsets the playing area
  translate(offset, offset)
  //draws the grid
  drawGrid(grid.grid, grid.size)
  //draws all the food
  for(const id in frontEndFood){
    frontEndFood[id].draw();
  }
  //draw out all the players
  for(const id in frontEndPlayers){
    const player = frontEndPlayers[id]
    player.update();
    player.draw();
  }
  //draw the border around the screen
  drawBorder()
  //draws usernames
  for(const id in frontEndPlayers){
    const player = frontEndPlayers[id]
    player.drawUsernames();
  }
  pop();
  //draws main Menu
  drawMenu();
  //update and draw username input box
  for(i in inputs){
    inputs[i].draw();
  }
}

//update the blinker for the input boxes
setInterval(() => {
  for(i in inputs){
    if(inputs[i].blinker == usernameInputConfig.blinker){
      inputs[i].blinker = ""
    } else{
      inputs[i].blinker = usernameInputConfig.blinker
    }
  }
}, inputBlinkerSpeed)

//draws a border around the playing area
function drawBorder(){
  imageMode(CORNER)
  image(border, 0-offset, 0-offset, width, height);
}


function clientSidePrediction(){
  // //doing smoothingOffset prediction
  // setInterval(() => {
  //   for(const id in frontEndPlayers){
  //     if(frontEndPlayers[id].joined == true && Math.abs(frontEndPlayers[id].xdir) + Math.abs(frontEndPlayers[id].ydir) != 0){
  //       frontEndPlayers[id].playerSmoothingOffset += (frontEndPlayers[id].playerSmoothing/frontEndPlayers[id].playerSpeed)*1.2;
  //     }
  //   }
  // }, frontEndPlayers[socket.id].playerSmoothing)
  //
  //
  // //Doing client side prediction
  // setInterval(() => {
  //   for(const id in frontEndPlayers){
  //     //move player
  //     for(let i = frontEndPlayers[id].body.length-2; i >= 0; i--){
  //       frontEndPlayers[id].body[i+1] = { ...frontEndPlayers[id].body[i] }
  //     }
  //
  //     frontEndPlayers[id].body[0][0] += frontEndPlayers[id].xdir;
  //     frontEndPlayers[id].body[0][1] += frontEndPlayers[id].ydir;
  //     frontEndPlayers[id].playerSmoothingOffset = 0;
  //   }
  // }, frontEndPlayers[socket.id].playerSpeed)
}
