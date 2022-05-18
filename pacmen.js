let pos = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];

var pacMen = []; // This array holds all the pacmen
// This variable controls the execution of the actions
var timer = null;
// Control the buttons
// At the start of the game, only create pacman is enable:
var create_button = document.getElementById("create"); 
var start_button = document.getElementById("start");
var stop_button = document.getElementById("stop");
var reset_button = document.getElementById("reset");

start_button.disabled=true;
stop_button.disabled=true;
reset_button.disabled=true;

// This variable helps determine which PacMan image should be displayed. It flips between values 0 and 1
var focus = 0;

// This variable makes the pacman squeeze a little when hit the borders
shrink_size = 50;
normal_size = 100;

// Default size of the container holding the pacmen
var area = {x: 100, y:100};

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

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // As soon as we create one pacman, the start game becomes active and have to ensure the reset holds inactive:
  start_button.disabled=false;

  // Define the area id=game
  let game = document.getElementById('game');
  // Update the area size:
  // area.x = parseInt(game.style.width, 10);
  // area.y = parseInt(game.style.height, 10);
  console.log('Area: ' + game.style.width);
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(area.x, area.y);
    
  // Add image to div id = game
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';

  // (JU) Defines the initial PacMan image as a random choice from the pacArray elements:
  // get random index value
  let randomIndex = Math.floor(Math.random() * pacArray.length);
  // this variable defines what direction should PacMan go into:
  // 0 = left to right
  // 1 = right to left (reverse)
  let directionX = 0;
  // let directionY = 0;

  newimg.src = pacArray[directionX][randomIndex];
  newimg.width = normal_size;

  // TODO: set position here
  newimg.style.top = position.y;
  newimg.style.left = position.x;
  console.log('Pacman position (x,y): ('+position.x + ',' + position.y + ')')
  // Modifies the colour of the pacman randomly:
  // newimg.style.webkit.filter = 'hue-rotate(180deg)';
  let hueRotLevel = Math.random() * 360;
  newimg.style.filter = 'hue-rotate('+hueRotLevel + 'deg)';

 // newimg.style.backgroundColor = 'red';

  // TODO add new Child image to game
  game.appendChild(newimg);

  // return details in an object
  return {
    position,
    velocity,
    newimg,
    randomIndex,
    directionX
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

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;

    item.newimg.src = pacArray[item.directionX][item.randomIndex]    
  });
  timer = setTimeout(update, 20);
}

function checkCollisions(item) {
  // TODO: detect collision with all walls and make pacman bounce
  if (item.position.x + item.velocity.x + item.newimg.width >= window.innerWidth || 
      item.position.x + item.velocity.x < 0 ) {
        item.velocity.x = -item.velocity.x;
        item.directionX = Number(!item.directionX);
        item.newimg.width=shrink_size;        
        item.newimg.height=normal_size+0.5*shrink_size;
      }

  if (item.position.y + item.velocity.y + item.newimg.height >= window.innerHeight || 
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
