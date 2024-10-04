//creates the canvas
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
  border = loadImage("./assets/sprites/border.png");
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
          xdir: backEndPlayer.xdir,
          ydir: backEndPlayer.ydir,
          body: backEndPlayer.body,
          len: backEndPlayer.len,
          joined: backEndPlayer.joined,
          playerSmoothingOffset: backEndPlayer.playerSmoothingOffset,
          Normalanimation: Normalanimation
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

        //splicing out all the non needed indexes
        // const lastBackendInputIndex = playerInputs.findIndex(input => {
        //   return backEndPlayers.sequenceNumber === input.sequenceNumber
        // })
        //
        // if(lastBackendInputIndex > -1)
        //   playerInputs.splice(0, lastBackendInputIndex+1);
        //
        // playerInputs.forEach(input => {
        //   frontEndPlayers[id].xdir = input.dx;
        //   frontEndPlayers[id].ydir = input.dy;
        // })
      }else{
        //for all other players
        frontEndPlayers[id].body = backEndPlayer.body
        frontEndPlayers[id].len = backEndPlayer.len
        frontEndPlayers[id].joined = backEndPlayer.joined
        frontEndPlayers[id].username = backEndPlayer.username
        frontEndPlayers[id].playerSmoothingOffset = backEndPlayer.playerSmoothingOffset
        frontEndPlayers[id].ydir = backEndPlayer.ydir
        frontEndPlayers[id].xdir = backEndPlayer.xdir


        // for(i = 0; i < frontEndPlayers[id].body.length; i++){
        //   gsap.to(frontEndPlayers[id].body[i], {
        //     x: backEndPlayer.body[i].x,
        //     y: backEndPlayer.body[i].y,
        //     duration: 0.12,
        //     ease: "linear"
        //   })
        // }
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

function windowResized() {
  centerCanvas();
}

//does all the things needed every frame
function draw(){
  //only draw if everything is loaded
  if(loaded == false){
    drawLoading();
    return;
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
