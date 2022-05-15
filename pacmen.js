let pos = 0;
const pacArray = [
  ['./images/PacMan1.png', './images/PacMan2.png'],
  ['./images/PacMan3.png', './images/PacMan4.png'],
];

const pacMen = []; // This array holds all the pacmen

// This variable helps determine which PacMan image should be displayed. It flips between values 0 and 1
var focus = 0;

// This variable makes the pacman squeeze a little when hit the borders
shrink_size = 50;
normal_size = 100;

// This function returns an object with random values
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
  // returns an object with random values scaled {x: 33, y: 21}
  let velocity = setToRandom(10); // {x:?, y:?}
  let position = setToRandom(200);

  // Add image to div id = game
  let game = document.getElementById('game');
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
  setTimeout(update, 50);
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

function makeOne() {
  pacMen.push(makePac()); // add a new PacMan
}
