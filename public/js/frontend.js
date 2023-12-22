var cnv;

//creates the const for all frontend players
const frontEndPlayers = {}
//creates the socket for this frontend
const socket = io();
//creates the const for all frontend food
const frontEndFood = {};
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
        frontEndPlayers[id] = new Player({
          grid: grid,
          color: color(backEndPlayer.r, backEndPlayer.g, backEndPlayer.b),
          xdir: backEndPlayer.xdir,
          ydir: backEndPlayer.ydir,
          body: backEndPlayer.body,
          len: backEndPlayer.len
        });
        //give the player an x and y
        frontEndPlayers[id].body[0] =[backEndPlayer.x, backEndPlayer.y]
      }catch{
        return
      }
    } else {
      if(id === socket.id){
        //if a player already exists
        frontEndPlayers[id].xdir = backEndPlayer.xdir
        frontEndPlayers[id].ydir = backEndPlayer.ydir
        frontEndPlayers[id].body = backEndPlayer.body
        frontEndPlayers[id].len = backEndPlayer.len
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
        frontEndPlayers[id].xdir = backEndPlayer.xdir
        frontEndPlayers[id].ydir = backEndPlayer.ydir
        frontEndPlayers[id].body = backEndPlayer.body
        frontEndPlayers[id].len = backEndPlayer.len

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
  frontEndPlayers[socket.id].color = color(0, 0, 255)
})

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
  //draws the grid
  drawGrid(grid.grid, grid.size)
  //draws all the food
  for(const id in frontEndFood){
    frontEndFood[id].draw();
  }
  //draw out all the players
  for(const id in frontEndPlayers){
    const player = frontEndPlayers[id]
    player.update()
    player.draw()
  }
}

setInterval(() => {
  // //move player
  // var head = frontEndPlayers[socket.id].body[frontEndPlayers[socket.id].body.length-1];
  // frontEndPlayers[socket.id].body.shift();
  // head[0] += frontEndPlayers[socket.id].xdir;
  // head[1] += frontEndPlayers[socket.id].ydir;
  // frontEndPlayers[socket.id].body.push(head);
}, 120)
