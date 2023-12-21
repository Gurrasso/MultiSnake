var cnv;

//creates the const for all frontend players
const frontEndPlayers = {}
//creates the socket for this frontend
const socket = io();
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
          body: backEndPlayer.body
        });
        //give the player an x and y
        frontEndPlayers[id].body[0] =[backEndPlayer.x, backEndPlayer.y]
      }catch{
        return
      }
    } else {
      //move player
      var head = frontEndPlayers[socket.id].body[frontEndPlayers[socket.id].body.length-1];
      frontEndPlayers[socket.id].body.shift();
      head[0] += frontEndPlayers[socket.id].xdir;
      head[1] += frontEndPlayers[socket.id].ydir;
      frontEndPlayers[socket.id].body.push(head);
      //if a player already exists
      frontEndPlayers[id].xdir = backEndPlayer.xdir
      frontEndPlayers[id].ydir = backEndPlayer.ydir
      frontEndPlayers[id].body = backEndPlayer.body
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

function windowResized() {
  centerCanvas();
}

//does all the things needed every frame
function draw(){
  drawGrid(grid.grid, grid.size)
  //draw out all the players
  for(const id in frontEndPlayers){
    const player = frontEndPlayers[id]
    player.draw()
    player.update()
  }
}
