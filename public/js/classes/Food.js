class  Food {
  constructor(grid) {
    this.x = random(grid.grid[0]);
    this.y = random(grid.grid[0]);
  }

  draw(){
    fill(255, 0, 0);
    rect((width/grid.size)*this.x, (height/grid.size)*this.y, height/grid.size);
  }
}

function checkIfEat(){
  if(player.body[player.body.length-1].x == food.x && player.body[player.body.length-1].y == food.y){
    player.grow();
    food = new Food(grid);
  }
}
