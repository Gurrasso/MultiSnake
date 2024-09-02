//A grid class for the players to reside on
class Grid {
  constructor(Size) {
    this.size = Size;
    this.grid = [];
  }
}

//function that creates the grid in a form of array
function createGrid(grid, size){
  const arr = []
  for (let i = 0; i < size; i++) {
  arr[i] = [];
    for (let j = 0; j < size; j++) {
      arr[i][j] = j;
    }
  }
  return arr
}

//draws the grid on to the screen
function drawGrid(grid, gs){
  for(i=0; i<grid.length;i++){
    for(j=0; j<grid[i].length;j++){
      if((i+j) % 2 == 0){
        fill(gridConfig.color1[0], gridConfig.color1[1], gridConfig.color1[2]);
        noStroke();
        rect((gameWidth/gs) * grid[i][j], (gameHeight/gs) * i, gameWidth/gs);
      }else {
        fill(gridConfig.color2[0], gridConfig.color2[1] ,gridConfig.color2[2]);
        noStroke();
        rect((gameWidth/gs) * grid[i][j], (gameHeight/gs) * i, gameWidth/gs);
      }
    }
  }
}
