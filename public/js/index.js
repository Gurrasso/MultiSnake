var cnv;

//creates the const for all frontend players
const players = {}

//creates the canvas
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

const socket = io();

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
socket.on("updatePlayers", (backendPlayers)=>{
  for(const id in backendPlayers){
    const backendPlayer = backendPlayers[id]

    if(!players[id]){
      //creates new grid
      grid = new Grid(backendPlayer.gridSize)
      //creates the actual grid inside the grid class
      grid.grid = createGrid(grid.grid, grid.size, grid.size)
      //create a new player
      players[id] = new Player(grid);
      //give the player an x and y
      players[id].body[0] = createVector(backendPlayer.x, backendPlayer.y)
    }
  }
})

function windowResized() {
  centerCanvas();
}

//does all the things needed every frame
function draw(){
  drawGrid(grid.grid, grid.size)
  //draw out all the players
  for(const id in players){
    const player = players[id]
    player.draw()
  }

}
