var cnv;

//offset for the border
let offsetConfig = {
  offset: 23
}
let offset;

//playing space
let gameWidth;
let gameHeight;

//create vars for fonts
let FFFFORWA;

//creates the const for all frontend players
const frontEndPlayers = {}

//creates the socket for this frontend
const socket = io();

//creates the const for all frontend food
const frontEndFood = {};

//vars for input
const inputBlinkerSpeed = 600;
var inputs = [];

//config for the grid
var gridConfig = {
  color1: [0, 150, 9],
  color2: [0, 200, 0]
}

//background color(not the one outside of canvas)
bgu = gridConfig.color1;

//config for username related stuff
const allowedUsernameconfig = {
  maxUsernameLength: 10,
  bannedUsernameTerms: [],
  defaultName: "Guest"
};

//clientSide vars for players
var playerConfig = {
  strokeColor: [230, 230, 230],
  strokeWeight: [5],
  playerColor: [0, 0, 255],
  enemyColor: [169, 0, 255]
};

//config for the username input box
const usernameInputConfig = {
  x: 2,
  y: 2,
  size: 3.5,
  message: "Username",
  maxCharacters: 10,
  defaultColor: 20,
  blinker: "I"
}

//delay for joining the lobby
const joinDelay = 70;

//var for the playButton
let playButton;
const playButtonConfig = {
  playButtonX: 2,
  playButtonY: 2.3,
  playButtonSize: 3.5
};

//all the menu textures get names here:
let playButtonDownSprite;
let playButtonUpSprite;
let logoLandScapeSheet;
let border;
let inputBox;

//sprite sheets
let logoLandScape;

//all the menu sounds here:
var playButtonDownSound = new Howl({
      src: ['./assets/sounds/buttonDown.mp3']
});
var playButtonUpSound = new Howl({
      src: ['./assets/sounds/buttonUp.mp3']
});
