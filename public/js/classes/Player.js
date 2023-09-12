class Player {
  constructor(grid) {
    this.x;
    this.y;
    this.ydir = 0;
    this.xdir = 1;
    this.grid = grid;
  }

  update(){
    this.x += this.xdir;
    this.y += this.ydir;
  }
  draw(){
    fill(0, 0, 255);
    rect((width/grid.size)*this.x, (height/grid.size)*this.y, height/grid.size);
  }
}

function spawnPlayer(grid) {
  player = new Player(grid);
  player.x = (grid.size+1)/2
  player.y = (grid.size+1)/2
}

function keyPressed() {
  if(player.grid == grid){
    if (keyCode === LEFT_ARROW) {
      player.xdir = -1;
      player.ydir = 0;
    } else if (keyCode === RIGHT_ARROW) {
      player.xdir = 1;
      player.ydir = 0;
    } else if (keyCode === UP_ARROW) {
      player.xdir = 0;
      player.ydir = -1;
    } else if (keyCode === DOWN_ARROW) {
      player.xdir = 0;
      player.ydir = 1;
    }
  }
}
