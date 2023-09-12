class Grid {
  constructor(Size) {
    this.size = Size;
    this.grid = [];
  }
}

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

function drawGrid(grid, gs){
  for(i=0; i<grid.length;i++){
    for(j=0; j<grid[i].length;j++){
      if((i+j) % 2 == 0){
        fill(40);
        noStroke();
        rect((width/gs) * grid[i][j], (height/gs) * i, width/gs);
      }else {
        fill(235);
        noStroke();
        rect((width/gs) * grid[i][j], (height/gs) * i, width/gs);
      }
    }
  }
}
