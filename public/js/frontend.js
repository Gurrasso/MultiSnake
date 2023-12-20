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
}

//Puts new players into the players obj where we can see thier basic info
socket.on("updatePlayers", (backEndPlayers)=>{
  for(const id in backEndPlayers){
    const backEndPlayer = backEndPlayers[id]

    if(!frontEndPlayers[id]){
      //creates new grid
      grid = new Grid(backEndPlayer.gridSize)
      //creates the actual grid inside the grid class
      grid.grid = createGrid(grid.grid, grid.size, grid.size)
      //create a new player
      frontEndPlayers[id] = new Player({
        grid:grid,
        color:"hsl(272, 61%, 34%)"
      });

      try{
        //give the player an x and y
        frontEndPlayers[id].body[0] = createVector(backEndPlayer.x, backEndPlayer.y)
      }catch{
        return
      }
    }
  }
  //delete disconnected players
  for(const id in frontEndPlayers){
    if(!backEndPlayers[id]){
      delete backEndPlayers[id]
    }
  }

  console.log(frontEndPlayers);
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
  }

}
