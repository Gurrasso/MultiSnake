class Player {
  constructor(grid) {
    this.body = [];
    this.ydir = 0;
    this.xdir = 0;
    this.grid = grid;
    this.len = 1;
  }

  update(){
    let head = this.body[this.body.length-1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
    if(this.body[0].x < 0 || this.body[0].x >= this.grid.size || this.body[0].y < 0 || this.body[0].y >= this.grid.size){
      this.die()
    }
  }
  draw(){
    fill(0, 40, 200);
    for (let i = 0; i < this.body.length; i++) {
      rect((width/grid.size)*this.body[i].x, (height/grid.size)*this.body[i].y, height/grid.size);
    }
  }

  die(){
    console.log("ded");
  }

  grow(){
    let temp = this.body[this.body.length-1].copy();
    this.body.push(temp);
    this.len+=1;
  }
}

function spawnPlayer(grid) {
  player = new Player(grid);
  player.body[0] = createVector(random(grid.grid[0]), random(grid.grid[0]))
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
