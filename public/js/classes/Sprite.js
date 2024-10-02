
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
    noSmooth();
    image(this.sheet, this.x, this.y, this.w, this.h, this.sw*floor(this.frame), 0, this.sw, this.h);

    this.frame += this.speed;
    if(this.frame > this.frames){
      this.frame = 0;
    }
  }
}

//function for swapping colors of the image
function palletteSwap(img, color){
  this.img = img;
  this.img.loadPixels();
  for (let x = 0; x < this.img.width; x += 1) {
    for (let y = 0; y < this.img.height; y += 1) {
      this.img.set(x, y, 0);
    }
  }
  this.img.updatePixels();
  return this.img;
}
