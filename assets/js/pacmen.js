// Define initial constants:
const magn_velocity = 10;
const pacArray = [
  ['assets/img/PacMan1.png', 'assets/img/PacMan2.png'],
  ['assets/img/PacMan3.png', 'assets/img/PacMan4.png'],
];
const backgroundImgs = [
  'assets/img/bckgrnd001.jpeg', 'assets/img/bckgrnd002.jpeg', 
  'assets/img/bckgrnd003.jpeg', 'assets/img/bckgrnd004.jpeg'
];

var pacMen = []; // This array holds all the pacmen
// These variables control the execution of the actions
var timer = null;
var main_delay = 40;
var delay = 1 * main_delay;

// Buttons to control the action:
var create_button = document.getElementById("create"); 
var start_button = document.getElementById("start");
var stop_button = document.getElementById("stop");
var reset_button = document.getElementById("reset");

// At the start of the game, only "create" pacman is enabled:
create_button.disabled=false; // by default should be False, but there is no harm in ensuring it is so...
start_button.disabled=true;
stop_button.disabled=true;
reset_button.disabled=true;

// Define the area of the game, in terms of width and height. This sets up the boundaries where to move the pacmen
var area = document.getElementById('game');
var wgame = area.clientWidth;
var hgame = area.clientHeight;

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.width = wgame;
canvas.height = hgame;
var background = new Image();

let bckgrndIndex = Math.floor(Math.random() * backgroundImgs.length); 
background.src = backgroundImgs[bckgrndIndex];

// Make sure the image is loaded first otherwise nothing will draw.
background.onload = function(){
    ctx.drawImage(background,0,0, wgame, hgame);   
}

// Just output the game area to console (debugging purposes):
console.log('Area size (WxH): (' + wgame + ',' + hgame+ ')');

// When choosing which element of pacArray will be used as the initial direction where the pacman will look at when created by makepacman(),
// it should only pick an element from the first row (see pacArray):
const pacman_row_pick = 0;

// These variables define the pacman size and makes it squeeze a little when hitting the borders
// Make it a fraction of the area game, so it becomes responsive as well
normal_size = 0.05*wgame;
shrink_size = 0.5*normal_size;

// End of initial constants and variables definitions
// §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
// Definition of auxiliar functions

// This function returns an object with random values
function setToRandom(scalex, scaley=0) {
  if (scaley==0){
    scaley=scalex;
  }
  return {
    x: Math.random() * scalex,
    y: Math.random() * scaley,
  };
}

// §§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§§
// All functions associated with the PacMen Factory
// When making a PacMan, it appears at a random position and will move at a random speed
function makePac() {
  // As soon as we create one pacman, the "start game" button becomes active
  // Also have to ensure the "reset game" holds inactive, independent of the previous state of the game:
  start_button.disabled=false;

  // returns an object with random values scaled 
  let velocity = setToRandom(magn_velocity); 
  let position = setToRandom(wgame-normal_size, hgame-normal_size);
    
  // Add image to div id = game
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';

  // Defines the initial PacMan image as a random choice from the pacArray elements:
  let randomIndex = Math.floor(Math.random() * pacArray.length);
  // randomIndex defines what direction should PacMan go into:
  // 0 = left to right
  // 1 = right to left (reverse)
  newimg.src = pacArray[pacman_row_pick][randomIndex];
  newimg.width = normal_size;

  // It places all the new pacmen at the same position
  newimg.style.top = position.y + 'px'; // style.top and style.left must have units (this took me a while to realise....)
  newimg.style.left = position.x + 'px';
  console.log('Pacman position (x,y): ('+newimg.style.top + ',' + newimg.style.left + ')')

  // Modifies the colour of the pacman randomly:
  let hueRotLevel = Math.random() * 360;
  newimg.style.filter = 'hue-rotate('+hueRotLevel + 'deg)';
 
  // Add new Child image to game
  area.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
    randomIndex,
    pacman_row_pick
  };
}

function update() {

  // As soon as we press start, the start button becomes disabled, and the stop becomes active:
  start_button.disabled=true;
  stop_button.disabled=false;
  reset_button.disabled=true;

  // loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    item.newimg.width = normal_size;
    item.newimg.height = normal_size;
    item.randomIndex = (item.randomIndex + 1) % 2;
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;

    item.newimg.style.left = item.position.x + 'px';
    item.newimg.style.top = item.position.y + 'px';

    item.newimg.src = pacArray[item.pacman_row_pick][item.randomIndex]    
  });
  timer = setTimeout(update, delay);

}

function checkCollisions(item) {
  // Detect collision with all walls and make pacman bounce by stretching the picture in one dimension (the one hitting the wall)
  if (item.position.x + item.velocity.x + item.newimg.width >= wgame || 
      item.position.x + item.velocity.x < 0 ) {
        item.velocity.x = -item.velocity.x;
        item.pacman_row_pick = Number(!item.pacman_row_pick);
        item.newimg.width=shrink_size;        
        item.newimg.height=normal_size+0.5*shrink_size;
      }

  if (item.position.y + item.velocity.y + item.newimg.height >= hgame || 
      item.position.y + item.velocity.y < 0 ) {
        item.velocity.y = -item.velocity.y;
        item.newimg.height=shrink_size;        
        item.newimg.width=normal_size+0.5*shrink_size;
      }
}

function reset() {
  // Reset the pacmen array to empty
  location.reload();
  pacMen = [];
  // Once we press reset, the button create become active and everything else, inactive: 
  create_button.disabled=false;
  start_button.disabled=true;
  stop_button.disabled=true;
  reset_button.disabled=true;
}

function stop(item) {
  clearTimeout(timer);
  // Once we press stop, the buttons start and reset become active, while stop becomes inactive
  start_button.disabled=false;
  stop_button.disabled=true;
  reset_button.disabled=false;
}

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}

var slider = document.querySelector('#speedSlider');
slider.addEventListener('input', e => {
  console.log('Preclick delay: '+delay);
  stop();
  delay = (1 - e.target.value/100) * main_delay;
  console.log('Postclick delay: '+delay);
  update();

})
