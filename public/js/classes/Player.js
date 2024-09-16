//A player class with different vals
class Player {
  constructor({grid, color, body, len, joined, username, xdir, ydir, playerSmoothingOffset}) {
    this.body = body;
    this.grid = grid;
    this.len = len;
    this.color = color;
    this.joined = joined;
    this.username = username;
    this.xdir = xdir;
    this.ydir = ydir;
    this.playerSmoothingOffset = playerSmoothingOffset;
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
    if(this.joined == true){
      fill(this.color);
      for (let i = 0; i < this.body.length; i++) {
        if(i > 0){
          this.offset = [((gameWidth/grid.size)*(this.body[i][0] - this.body[i-1][0])*this.playerSmoothingOffset)*-1, ((gameWidth/grid.size)*(this.body[i][1] - this.body[i-1][1])*this.playerSmoothingOffset)*-1]
        }else{
          this.offset = [((gameWidth/grid.size)*((this.body[i][0]-(this.body[i][0]+this.xdir))*this.playerSmoothingOffset))*-1, ((gameWidth/grid.size)*((this.body[i][1]-(this.body[i][1]+this.ydir))*this.playerSmoothingOffset))*-1]
        }
        rect(((gameWidth/grid.size)*this.body[i][0])+this.offset[0], ((gameHeight/grid.size)*this.body[i][1])+this.offset[1], gameHeight/grid.size);
      }
    }
  }

  //draws username over players
  drawUsernames(){
    if(this.joined == true){
      push();
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      fill(20, 20, 20);

      // text in body
      // textSize(gameWidth/grid.size);
      // for (let i = 0; i < this.body.length; i++) {
      //   text(this.username[i], (gameWidth/grid.size)*this.body[i][0]+((gameWidth/grid.size)/2), (gameHeight/grid.size)*this.body[i][1]+((gameHeight/grid.size)/2));
      // }

      //text above head
      textFont(FFFFORWA);
      textSize((gameWidth/grid.size)/2.5);
      this.offset = [((gameWidth/grid.size)*((this.body[i][0]-(this.body[i][0]+this.xdir))*this.playerSmoothingOffset))*-1, ((gameWidth/grid.size)*((this.body[i][1]-(this.body[i][1]+this.ydir))*this.playerSmoothingOffset))*-1]
      text(this.username, (((gameWidth/grid.size)*this.body[0][0])+(gameWidth/this.grid.size/2))+this.offset[0], ((((gameHeight/this.grid.size)*this.body[0][1])+(gameHeight/this.grid.size/2))-((gameHeight/grid.size)/1.3))+this.offset[1]);

      pop();
    }
  }

  //does the actions needed for the player to die
  die(){
    return
  }
}
