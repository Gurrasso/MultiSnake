class Grid {
  constructor(Size) {
    this.size = Size;
    this.grid = [];
  }
}

function createGrid(grid, size){
  for(i=0; i<size;i++){
    for(j=0; j<size;j++){
      grid.push([i,j])
    }
  }
}

function drawGrid(grid){
  
}
