//A player class with different vals
class Player {
  constructor({grid, color, body, len, joined, username}) {
    this.body = body;
    this.grid = grid;
    this.len = len;
    this.color = color;
    this.joined = joined;
    this.username = username;
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
        rect((width/grid.size)*this.body[i][0], (height/grid.size)*this.body[i][1], height/grid.size);
      }
    }
  }

  //draws username over players
  drawUsernames(){
    if(this.joined == true){
      push();
      textAlign(CENTER, CENTER);
      textStyle(BOLD);
      fill(60, 60, 60);

      //text in body
      // textSize(width/grid.size);
      // for (let i = 0; i < this.body.length; i++) {
      //   text(this.username[i], (width/grid.size)*this.body[i][0]+((width/grid.size)/2), (height/grid.size)*this.body[i][1]+((height/grid.size)/2));
      // }

      //text above head
      textSize((width/grid.size)/2);
      text(this.username, ((width/grid.size)*this.body[0][0])+(width/grid.size/2), (((height/grid.size)*this.body[0][1])+(height/grid.size/2))-((height/grid.size)/1.3));

      pop();
    }
  }

  //does the actions needed for the player to die
  die(){
    return
  }
}
