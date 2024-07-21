
//function for creating sprite animations
function Sprite(sheet, x, y, size, f, speed, iw, ih){
  this.sheet = sheet;
  this.x = x;
  this.y = y;
  this.w = size;
  this.frames = f;
  this.frame = 0;
  this.speed = speed;
  this.iw = iw;
  this.ih = ih;
  //calc the width of each frame
  this.sw = this.iw/this.frames;
  //calc what the height should be
  this.h = this.w*(this.ih/this.sw)

  this.draw = function(){
    imageMode(CENTER);
    image(this.sheet, this.x, this.y, this.w, this.h, this.sw*floor(this.frame), 0, this.sw, this.h);

    this.frame += this.speed;
    if(this.frame > this.frames){
      this.frame = 0;
    }
  }
}
