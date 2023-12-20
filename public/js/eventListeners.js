//input for changing the player position + other player related functions maybe
function keyPressed() {
  if(player.grid == grid){
    if (keyCode === LEFT_ARROW) {
      player.xdir = -1;
      player.ydir = 0;
    } else if (keyCode === RIGHT_ARROW) {
      player.xdir = 1;
      player.ydir = 0;
    } else if (keyCode === UP_ARROW) {
      player.xdir = 0;
      player.ydir = -1;
    } else if (keyCode === DOWN_ARROW) {
      player.xdir = 0;
      player.ydir = 1;
    }
  }
}
