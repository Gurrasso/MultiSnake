//a food class that spawns food for the player to eat
class  Food {
  constructor({grid, x, y}) {
    this.x = x;
    this.y = y;
  }

  //draws food on to the screen
  draw(){
    fill(255, 0, 0);
    rect((gameWidth/grid.size)*this.x, (gameHeight/grid.size)*this.y, gameHeight/grid.size);
  }
}
