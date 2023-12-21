//a food class that spawns food for the player to eat
class  Food {
  constructor({grid, x, y}) {
    this.x = x;
    this.y = y;
  }

  //draws food on to the screen
  draw(){
    fill(255, 0, 0);
    rect((width/grid.size)*this.x, (height/grid.size)*this.y, height/grid.size);
  }
}
