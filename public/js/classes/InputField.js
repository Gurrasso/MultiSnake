//a class that draws an input field
class  InputField {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = 0;
    this.height = 0;
    //the input that it has
    this.content = "";
    this.hide = false;
    //the text that it displays
    this.displayText = "";
    //what it displays if content is empty
    this.message = "";
    this.c = color(20);
    this.tempC = this.c;
    this.selected = false;
    this.blinker = "I"
    this.maxChar = 10;
    this.specB;
    this.tSize = height/39;
  }

  //draws input-text onto the screen
  draw(){
    //hide the field
    if(this.hide == true){return}
    this.text = this.content;
    if(this.selected == true && this.content.length <= 0){
      //selected blinks but is empty
      this.text = this.blinker
      this.tempC = color(20, 170);
      this.specB = false;
    }else if(this.content.length <= 0){
      //not selected
      this.text = this.message;
      this.tempC = color(20, 170);
      this.specB = false;
    }else if(this.selected == true && this.content.length > 0){
      //selected and written in
      this.text = this.content;
      this.tempC = this.c;
      this.specB = true;
    }else{
      //not selected but written in
      this.text = this.content;
      this.tempC = this.c;
      this.specB = false;
    }
    push();
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    fill(this.tempC);
    textFont(FFFFORWA);
    textSize(this.tSize);
    text(this.text, this.x, this.y+(height/30));

    //display blinker when written in
    if(this.specB == true){
      fill(color(20, 170));
      text(this.blinker, this.x+textWidth(this.content)/1.85, this.y+(height/30));
    }
    pop();
  }
}
