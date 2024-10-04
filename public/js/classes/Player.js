//A player class with different vals
class Player {
  constructor({grid, color, body, len, joined, username, xdir, ydir, playerSmoothingOffset, Normalanimation}) {
    this.body = body;
    this.grid = grid;
    this.len = len;
    this.color = color;
    this.joined = joined;
    this.username = username;
    this.xdir = xdir;
    this.ydir = ydir;
    this.playerSmoothingOffset = playerSmoothingOffset;
    this.PlayerNormalanimationSheet = Normalanimation;
    this.PlayerAnimation = new Sprite(this.PlayerNormalanimationSheet, 0, 0, 0, 100, 0.2, 1400, 14);
    // temp vars for how much the colors should be offset
    this.rTempColorOffset = 0;
    this.gTempColorOffset = 0;
    this.bTempColorOffset = 0;
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
      for (let i = 0; i < this.body.length; i++) {
        //makes an offset fort the parts of the player
        if(i > 0){
          this.offset = [((gameWidth/grid.size)*(this.body[i][0] - this.body[i-1][0])*this.playerSmoothingOffset)*-1, ((gameWidth/grid.size)*(this.body[i][1] - this.body[i-1][1])*this.playerSmoothingOffset)*-1]
        }else if(Math.abs(this.xdir) + Math.abs(this.ydir) < 2){
          this.offset = [((gameWidth/grid.size)*((this.body[i][0]-(this.body[i][0]+this.xdir))*this.playerSmoothingOffset))*-1, ((gameWidth/grid.size)*((this.body[i][1]-(this.body[i][1]+this.ydir))*this.playerSmoothingOffset))*-1]
        }
        //decides how much the colors should be offset
        if(i>0){
          this.tempColorOffset = i*(playerConfig.lowestColor/(this.body.length));
        }else{
          this.tempColorOffset = 0;
        }

        //draws the players parts
        noStroke();
        fill(this.color.levels[0]-this.tempColorOffset, this.color.levels[1]-this.tempColorOffset, this.color.levels[2]-this.tempColorOffset, 255);
        rect(((gameWidth/grid.size)*this.body[i][0])+this.offset[0], ((gameHeight/grid.size)*this.body[i][1])+this.offset[1], gameHeight/grid.size);
        //draws an extra for corners
        if(i != this.body.length-1){
          noStroke();
          fill(this.color.levels[0]-this.tempColorOffset, this.color.levels[1]-this.tempColorOffset, this.color.levels[2]-this.tempColorOffset, 255);
          rect(((gameWidth/grid.size)*this.body[i][0]), ((gameHeight/grid.size)*this.body[i][1]), gameHeight/grid.size);
        }
        if(i == 0){
          //draw the players animation for the head
          push();
          this.PlayerAnimation.w = ((gameHeight/grid.size)/8)*14
          this.PlayerAnimation.h = this.PlayerAnimation.w*(this.PlayerAnimation.ih/this.PlayerAnimation.sw)
          this.tempX = ((((gameWidth/grid.size)*this.body[i][0])+this.offset[0])+(gameHeight/grid.size)/2);
          this.tempY = (((gameHeight/grid.size)*this.body[i][1])+this.offset[1]+(((gameHeight/grid.size)/2)));
          this.tempRotation = (float)(Math.atan2(this.ydir, this.xdir) / (2 * Math.PI))-0.25;
          imageMode(CENTER)
          angleMode(DEGREES);
          translate(this.tempX, this.tempY);
          //if player hasnt started moving they point down otherwise in direction of movement
          if(Math.abs(this.xdir) + Math.abs(this.ydir) > 0){
            rotate(this.tempRotation*360)
          }else{
            rotate(0)
          }
          this.PlayerAnimation.draw();
          translate(0, 0);
          pop();
        }
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
      if(Math.abs(this.xdir) + Math.abs(this.ydir) < 2){
        this.offset = [((gameWidth/grid.size)*((this.body[0][0]-(this.body[0][0]+this.xdir))*this.playerSmoothingOffset))*-1, ((gameWidth/grid.size)*((this.body[0][1]-(this.body[0][1]+this.ydir))*this.playerSmoothingOffset))*-1]
      }
      stroke(playerConfig.strokeColor[0], playerConfig.strokeColor[1], playerConfig.strokeColor[2])
      strokeWeight(playerConfig.strokeWeight)
      text(this.username, (((gameWidth/grid.size)*this.body[0][0])+(gameWidth/this.grid.size/2))+this.offset[0], ((((gameHeight/this.grid.size)*this.body[0][1])+(gameHeight/this.grid.size/2))-((gameHeight/grid.size)/1.3))+this.offset[1]);

      pop();
    }
  }

  //does the actions needed for the player to die
  die(){
    return
  }
}
