var cnv;
gridSize = 15

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function setup() {
  if(windowWidth < windowHeight){
    cnv = createCanvas(windowWidth, windowWidth);
  }else {
    cnv = createCanvas(windowHeight, windowHeight);
  }
  centerCanvas();
  grid = new Grid(gridSize)
  grid.grid = createGrid(grid.grid, grid.size, grid.size)
  spawnPlayer(grid);
}

function windowResized() {
  centerCanvas();
}

function draw(){
  drawGrid(grid.grid, grid.size)
  frameRate(5);
  player.update();
  player.draw();
}
