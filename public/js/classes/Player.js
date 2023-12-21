//A player class with different vals
class Player {
  constructor({grid, color, body}) {
    this.body = body;
    this.grid = grid;
    this.color = color;
  }

  //Updates all of the things for the snake
  update(){
    //checks if player is outside of area
    if(this.body[0].x < 0 || this.body[0].x >= this.grid.size || this.body[0].y < 0 || this.body[0].y >= this.grid.size){
      this.die()
    }
    //checks if player is in player
    for(i = 0; i < this.body.length-1; i++){
      if(this.body[this.body.length-1].x == this.body[i].x && this.body[this.body.length-1].y == this.body[i].y){
        this.die()
      }
    }
  }
  //draws the Player
  draw(){
    fill(this.color);
    for (let i = 0; i < this.body.length; i++) {
      rect((width/grid.size)*this.body[i][0], (height/grid.size)*this.body[i][1], height/grid.size);
    }
  }

  //does the actions needed for the player to die
  die(){
    console.log("ded");
  }

  //grows the player by 1
  grow(){
    let temp = this.body[this.body.length-1].copy();
    this.body.push(temp);
  }
}
