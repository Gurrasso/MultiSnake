
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
function palletteSwap(img, palette, newColor){
  this.palette = palette;
  this.newColor = newColor;
  img.loadPixels();
  for (let x = 0; x < img.width; x += 1) {
    for (let y = 0; y < img.height; y += 1) {
      for(let i = 0; i < this.palette.length; i++){
        if(img.get(x, y)[0] == this.palette[i].levels[0] && img.get(x, y)[1] == this.palette[i].levels[1] && img.get(x, y)[2] == this.palette[i].levels[2] && img.get(x, y)[3] == this.palette[i].levels[3]){
          this.temp = color(this.newColor.levels[0]+(img.get(x, y)[0] - this.palette[0].levels[0]), this.newColor.levels[1]+(img.get(x, y)[1] - this.palette[0].levels[1]), this.newColor.levels[2]+(img.get(x, y)[2] - this.palette[0].levels[2]), this.newColor.levels[3]+(img.get(x, y)[3] - this.palette[0].levels[3]));
          img.set(x, y, this.temp);
        }
      }
    }
  }
  img.updatePixels();
  return img;
}
