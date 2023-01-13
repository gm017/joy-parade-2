
/*
- - - - - - - - - - - - - - - - - - - - - - -

"One, I Love You"
Gabriel Manzi

Images in the game taken from google image searches: 
"nashville (character) tv show", "hand holding hammer", "arm with watch stock image", "kingfisher", "cartier santos on wrist", "cartier santos", "ancient pot", "mazda mx5", "fish tank" and "Nashville movie flag"

Using Rovercam for the camera controls: https://github.com/freshfork/p5.RoverCam

The function stickDisplays() uses a couple of lines of code taken from the Mazerunner game example linked from the rovercam github page:
camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);

Any code not in sketch.js is in level.js, item.js or changeLevels.js

Voice acting done by Katy (Stage 7 - Three) and Grace (Stage 7 - Tower)

HOW TO PLAY:

Control the player character with WASD and look around with the mouse
Press the enter key to make the game full screen
Collect all the items for the good ending
There is a walkthrough for the game in cheats folder

- - - - - - - - - - - - - - - - - - - - - - -

*/


//Declare variables

//Variable for rovercam
let rover;

//Images
let clear;
let frame;
let floor;
let flag;
let mx5;
let flagFilter;
let juliette;
let lift;
let avery;
let averyFilter;
let deacon;
let sky;
let sword;
let rayna;
let potItem;
let santosItem;
let raynaFilter;
let kingfisher;
let gun;
let arm;
let intempo;
let arch;
let ancientPot;
let deaconClear;
let towerFloor;
let hammer;
let santosHand;
let julietteText;
let graceText;

//Rotations for flying objects
let rots = 0;

//Height for floating images
let imgHeight;

//Text display
let displayTextBox = true;
let displayAlert = false;
let alertOpacity = 255;

//Inital camera height
let playerHeight = -300;

//Audio
let footsteps;
let liftMusic;
let julietteMonologue;
let graceMonologue;
let levelOneMusic;
let levelTwoMusic;
let levelThreeMusic;
let levelFourMusic;
let levelFiveMusic;
let textChange;
let fanfare;
let siren;

//Toggle locking player control
let lockControl = false;
let lockPlayerHeight = true;

//If lift sequence is currently happening
let liftSequence = true;

//Counters, settings etc.
let skyTimer = 0;
let scriptTimer = 0;
let scriptTimerFrames = 200;
let levelCounter = -2;
let scriptCount = 0;
let alertsCount = 0;
let alertColCount = 0;
let endingSequence = 1;
let endingSequenceSpeed = 100;
let hideWeapon = false;

//Initial player weapon height
let weapx = -545;

//Text
let scriptsArr = [];
let script1;
let script2;
let script3;
let script4;
let script5;
let gliderGirls;
let bottomText;
let alerts = [];
let skyText = [["i", "i am", "i'll never"], ["One, I love you", "thinking", "okay!"], ["you", "of you", "you go!"]];

//Background colours
let backgroundColours = {
  levelOneBg: [0, 30, 200],
  levelTwoBg: [0, 10, 20],
  levelThreeBg: [0, 0, 20],
  levelFourBg: [0, 50, 20],
  levelFiveBg: [0, 90, 35]
}

//Alert text colours
let alertColours = [];
let alertColOne, alertColTwo, alertColThree;

//Array for floting image locations
let imageLocs = [];

//Text vibration speeds
let textVib1, textVib2, textVib;

//Levels
let levelOne;
let levelTwo;
let levelThree;
let levelFour;
let levelFive;

//Collectible items
let pot;
let car;
let watch;
let tank;
let graveyard;
let water;
let itemArr = [];

//Location and size of graveyard video when in player inventory
let itemX = 70;
let itemY = 70;
let itemFrameX = 75;
let itemFrameY = 75;
let itemLocX;
let itemLocY = 0;


function preload() {    //Preload images, text files and audio
  graveyard = createVideo('vid/graveyard.mp4');
  water = createVideo('vid/water.mp4');
  graveyard.hide();
  water.hide();
  clear = loadImage('img/clear.png')
  floor = loadImage('img/floor.jpg');
  flag = loadImage('img/flag.jpg');
  tank = loadImage('img/tank.jpg');
  flagFilter = loadImage('img/flag-filter.png');
  juliette = loadImage('img/juliette-nobg-filter.png');
  deaconClear = loadImage('img/deacon-nobg-filter.png');
  avery = loadImage('img/avery.png');
  averyFilter = loadImage('img/avery-filter.png');
  rayna = loadImage('img/rayna.png');
  raynaFilter = loadImage('img/rayna-filter.png');
  deacon = loadImage('img/deacon.jpg');
  sky = loadImage('img/skycircle.png');
  lift = loadImage('img/lift.jpg');
  sword = loadImage('img/energysword.png');
  intempo = loadImage('img/intempo.png');
  gun = loadImage('img/gun.png');
  arm = loadImage('img/arm-filter.png');
  mx5 = loadImage('img/mx5.jpg');
  potItem = loadImage('img/potcollect.jpg');
  santosItem = loadImage('img/santoscollect.jpg');
  frame = loadImage('img/frame.png');
  santosHand = loadImage('img/santos-hand.png');
  hammer = loadImage('img/hammer-filter.png');
  kingfisher = loadImage('img/kingfisher-filter.png');
  arch = loadImage('img/arch.png');
  ancientPot = loadImage('img/ancient-pot.png')
  towerFloor = loadImage('img/tower-floor.png');
  julietteText = loadImage('img/julietteText.png');
  graceText = loadImage('img/gracetext.png')
  gliderGirls = loadFont('fonts/glidergirls.ttf');
  script1 = loadStrings('text/lvl1script.txt');
  script2 = loadStrings('text/lvl2script.txt');
  script3 = loadStrings('text/lvl3script.txt');
  script4 = loadStrings('text/lvl4script.txt');
  script5 = loadStrings('text/lvl5script.txt');
  alerts = loadStrings('text/alerts.txt');
  footsteps = loadSound('audio/footsteps.mp3');
  julietteMonologue = loadSound('audio/juliettemonologue.mp3');
  levelOneMusic = loadSound('audio/levelone.mp3');
  levelTwoMusic = loadSound('audio/leveltwo.mp3');
  levelTwoMusic = loadSound('audio/leveltwo.mp3');
  levelThreeMusic = loadSound('audio/levelthree.mp3');
  levelFourMusic = loadSound('audio/levelfour.mp3');
  levelFiveMusic = loadSound('audio/ive-got-wheels.mp3');
  graceMonologue = loadSound('audio/grace-louder.mp3');
  textChange = loadSound('audio/textchange.wav');
  liftMusic = loadSound('audio/liftmusic.mp3');
  fanfare = loadSound('audio/fanfare.mp3');
  siren = loadSound('audio/tanksiren.mp3');
}

function setup() {    //Begin setup
  createCanvas(1920, 1080, WEBGL);
  rover = createRoverCam();
  rover.usePointerLock();
  rover.setState({
    position: [-500, -400, -200],
    rotation: [1.52, 0.2, 0],
    sensitivity: 0.1,
    speed: 5.6 //True game speed
    // speed: 30 //testing speed
  });

  scriptsArr = [script1, script2, script3, script4, script5];
  alertColOne = color(0, alertOpacity);
  alertColTwo = color(0, 0, 255, alertOpacity);
  alertColThree = color(255, 0, 0, alertOpacity);
  alertColours = [alertColOne, alertColTwo, alertColThree];

  //Random locations for floating images
  generateImgLocs();

  //Initial font settings
  textFont(gliderGirls);
  textSize(50);

  //Create new levels from the Level class
  levelOne = new Level(60000, 60000, floor, averyFilter, backgroundColours.levelOneBg, "7 - ONe");
  levelTwo = new Level(600, 160000, flag, arch, backgroundColours.levelTwoBg, "7 - TWo");
  levelThree = new Level(190000, 190000, flagFilter, juliette, backgroundColours.levelThreeBg, "7 - THRee");
  levelFour = new Level(3000, 3000, towerFloor, juliette, backgroundColours.levelFourBg, "7 - Tower");
  levelFive = new Level(1, 1, juliette, towerFloor, backgroundColours.levelFiveBg, "8 - TANk")

  //Create new collectible items from the item class
  pot = new Item(150, -300, 6000, potItem);
  car = new Item(0, -300, -10000, mx5);
  watch = new Item(2000, -300, 2000, santosItem);
  tank = new Item(2000, -300, 2000, tank);
  grave = new Item(0, -300, -10000, graveyard);
  waterItem = new Item(0, -300, 10500, water);

  //Initial floating image height
  imgHeight = 700;

  //Initial camera position
  rover.position.y = 19000;

  itemLocX = width - 100;

} // Begin draw

function draw() { //Begin draw

  // rover.position.y = -300;
  noStroke();
  rots++;
  lockHeight();
  progressDialogue();
  vibrateSkyText();
  changeLevels();
  displayInventory();
  drawAlert(alertColours[alertColCount], alertOpacity, alerts[alertsCount], alerts[alertsCount + 1]);
  drawFloatingObjects(rots);
  weaponBob(weapx);
} //End Draw


function progressDialogue() {
  if (rover.position.y === -300) {
    //Timing for changing the bottom text box counter (put into function)
    if (scriptTimer >= scriptsArr[scriptCount].length - 1) {
      displayTextBox = false;
      if (levelCounter != 5) {
        displayAlert = true;
      }
    } else if (frameCount % scriptTimerFrames === 0 && julietteMonologue.isPlaying() === false) {
      scriptTimer += 2;
      textChange.play();
      displayTextBox = true;
      displayAlert = false;
    }
  }
}

function weaponBob() {
  if (keyIsDown(87) || keyIsDown(65) === true || keyIsDown(83) === true || keyIsDown(68) === true) {
    if (frameCount % 25 === 0 && weapx === -545) {
      weapx += 10;
    } else if (frameCount % 50 === 0) {
      weapx -= 10;
    }
  }
}

function drawAlert(col, opac, txt1, txt2) {

  push();
  if (displayAlert === true) {
    stickDisplays();
    translate(-500, -300, 0);
    fill(col);
    text(txt1, 100, 0);
    text(txt2, 100, 100);
  }
  pop();

}

//Displays the text box and portrait at the bottom of the screen
//Adapted from Mazerunner example linked from the rovercam github page
//https://editor.p5js.org/jwdunn1/sketches/iI-2XX0Hw
function drawBottomText(txt, portrait) {
  if (displayTextBox === true) {
    push();
    stickDisplays();
    fill(255, 239, 213, 200);
    translate(-600, 490, 0);
    rect(0, -180, 1200, 160);
    textSize(30);
    fill(0);
    text(txt[scriptTimer], 170, -1 - 120);
    text(txt[scriptTimer + 1], 170, -1 - 60);
    tint(200, 0, 255);
    image(portrait, 5, -175, 150, 150);
    pop();
  }
}

//Displays the floating objects that appear around the field of view
//Adapted from Mazerunner example linked from the rovercam github page
//https://editor.p5js.org/jwdunn1/sketches/iI-2XX0Hw
function drawFloatingObjects(rots) {
  push();
  stickDisplays();
  fill(0);
  translate(-700, -230, 0);
  rotateX(radians(rots));
  // rotateZ(radians(rots));
  // rotateY(radians(rots));
  if (levelCounter === -1) {
    for (let i = 0; i < 10; i++) {
      image(sky, 450 + (i * rots / 100), -180, 10, 100);
    }
  }
  rotateZ(radians(rots / 3));
  rotateY(radians(rots / 3));
  image(sky, 950, -180, 10, 100);
  textSize(30);
  fill(0, 250, 250);
  pop();
}

//Displays the "weapon"/player character arm
//Adapted from Mazerunner example linked from the rovercam github page
//https://editor.p5js.org/jwdunn1/sketches/iI-2XX0Hw
function drawWeapon(weap) {
  if (!hideWeapon) {
    push();
    stickDisplays();
    translate(-600, 390, 0);
    tint(200, 0, 255);
    rotateY(radians(-40));
    image(weap, 900, weapx, 650, 950);
    pop();
  }
}

//Displays the images of text files in stages 7 - Three and 7 - Tower
//Adapted from Mazerunner example linked from the rovercam github page
//https://editor.p5js.org/jwdunn1/sketches/iI-2XX0Hw
function drawCentreImage(img) {
  push();
  stickDisplays();
  translate(-600, 390, 0);
  rotateY(radians(-40));
  image(img, 10, -900, 650, 350);
  pop();
}

//Generates random positions for the towers that appear in the game
function generateImgLocs() {
  for (let x = 0; x < 10; x++) {
    for (let z = 0; z < 10; z++) {
      let arr = [random(-30000, 30000), random(-30000, 30000), random(2000, 20000)];
      imageLocs.push(arr);
    }
  }
}

//Displays the images which float up from the ground and reset once they reach a certain height
function drawImgs(img1, img2) {
  if (imgHeight <= 700) {
    imgHeight -= 5;
  }
  if (imgHeight <= -7000) {
    imgHeight = 700;
  }

  for (let i = 0; i < 50; i++) {
    push();
    texture(img1);
    translate(imageLocs[i][0], imgHeight, imageLocs[i][1]);
    rotateY(radians(imgHeight / 30));
    plane(4600, imageLocs[i][2] / 2.5);
    texture(img2);
    translate(1500, 100, -400);
    plane(4600, imageLocs[i][2] / 2.5);
    translate(0, 100, 1700);
    push();
    rotateX(radians(imgHeight / 20));
    rotateZ(radians(imgHeight / 20));
    box(imageLocs[i][2], 10, 60);
    pop();
    pop();
  }
}

//Restricts the player movement in Level 1 so that they can't walk through the walls until the dialogue has finished
function levelOneRestrictMovement() {
  if (rover.position.x > 29500) {
    rover.position.x = 29500;
  }
  if (rover.position.x < -29500) {
    rover.position.x = -29500;
  }
  if (rover.position.z > 29500) {
    rover.position.z = 29500;
  }
  if (rover.position.z < -29500) {
    rover.position.z = -29500;
  }
}

//Restricts the player movement in Level 2 so that they can't walk off the platform
function levelTwoRestrictMovement() {
  if (rover.position.x > 200) {
    rover.position.x = 200;
  }
  if (rover.position.x < -200) {
    rover.position.x = -200;
  }
  if (rover.position.z > 79500) {
    rover.position.z = 79500;
  }
  if (rover.position.z < -79500) {
    rover.position.z = -79500;
  }

}

function lockHeight() {
  if (lockPlayerHeight === true && !liftSequence) {
    rover.position.y = -300;
  }
}

//Makes the player fly by altering the camera Y position
function flyPlayer() {
  lockPlayerHeight = false;
  rover.position.y -= 20;
}

//Displays the floating text in the sky which follows the players position based on the camera
function drawSkyText(txt, vib1, vib2, vib3) {
  //Loops through the different phrases basesd on the framecount
  if (frameCount % 200 === 0 && skyTimer < 2) {
    skyTimer += 1;
  } else if (frameCount % 200 === 0) {
    skyTimer = 0;
  }


  push();
  fill(0, 255, 0);
  push();
  translate(rover.position.x, rover.position.y - 50, rover.position.z + 100);
  rotateX(radians(90));
  rotateY(radians(180));
  text(txt[0], 0, 0 + vib1);
  pop();

  push();
  translate(rover.position.x, rover.position.y - 50, rover.position.z - 100);
  rotateX(radians(90));
  rotateZ(radians(90));
  rotateY(radians(180));
  text(txt[1], 0, 0 + vib2);
  pop();

  push();
  translate(rover.position.x + 200, rover.position.y - 50, rover.position.z + 200);
  rotateX(radians(90));
  rotateY(radians(180));
  text(txt[2], 0, 0 + vib3);
  pop();
}

//Set Sky text vibration
function vibrateSkyText() {
  textVib1 = random(0, 5);
  textVib2 = random(0, 3);
  textVib3 = random(0, 2);
}

function drawLevelFourBuildings() {
  push();
  translate(0, -2700, 9000);
  rotateZ(radians(rots / 2));
  rotateX(radians(rots));
  texture(kingfisher);
  sphere(3500);
  pop();
  push();
  translate(0, -2700, -9000);
  rotateZ(radians(rots / 2));
  rotateX(radians(rots));
  texture(flagFilter);
  sphere(3500);
  pop();
  push();
  translate(11000, -4700, 0);
  rotateZ(radians(rots / 5));
  rotateX(radians(rots / 10));
  texture(raynaFilter);
  sphere(2000);
  texture(deaconClear);
  sphere(5500);
  pop();
  push();
  translate(-9000, -2700, 0);
  rotateZ(radians(rots / 2));
  rotateX(radians(rots));
  texture(raynaFilter);
  sphere(3500);
  pop();
  push();
  translate(0, -5700, 0);
  rotateZ(radians(rots / 2));
  rotateX(radians(rots));
  texture(towerFloor);
  box(500);
  pop();
  push();
  translate(0, 10000, 0);
  texture(towerFloor);
  box(3000, 20000, 3000);
  pop();
  push();
  translate(5000, 10000, 5000);
  texture(towerFloor);
  box(3000, 20000, 3000);
  pop();
  push();
  translate(-5000, 10000, -5000);
  tint(0, 0, 255);
  texture(raynaFilter);
  box(3000, 20000, 3000);
  pop();
}

function drawLevelTwoTube() {
  push();
  rotateX(radians(90));
  rotateY(radians(rots));
  texture(flagFilter);
  cylinder(3000, 160000);
  pop();
}

function drawEndingSequence() {
  if (frameCount % endingSequenceSpeed === 0 && endingSequence <= 8) {
    endingSequence++
  } else if (frameCount % endingSequenceSpeed === 0) {
    endingSequence = 0;
    if (endingSequenceSpeed > 15) {
      endingSequenceSpeed -= 15;
    }
  }

  push();
  switch (endingSequence) {
    case 1:
      levelFive.display();
      texture(kingfisher);
      translate(0, 0, 2000)
      rotateX(radians(rots));
      rotateZ(radians(rots));
      sphere(1000);
      break;
    case 2:
      texture(flagFilter);
      rotateY(radians(rots * 8));
      sphere(1000);
      break;
    case 3:
      levelOne.display();
      translate(0, -230, 0)
      texture(ancientPot);
      rotateY(radians(rots * 2));
      box(1300, 700, 1300);
      break;
    case 4:
      levelFour.display();
      drawLevelFourBuildings();
      drawLevelTwoTube();
      break;
    case 5:
      levelOne.display();
      translate(0, -500, 3000)
      texture(kingfisher);
      rotateZ(radians(-90));
      rotateX(radians(rots * 8));
      sphere(400);
      translate(500, 0, 0)
      sphere(300);
      translate(400, 0, 0)
      sphere(200);
      break;
    case 6:
      levelFour.display();
      drawLevelFourBuildings();
      translate(0, -230, 0)
      texture(ancientPot);
      rotateY(radians(rots * 2));
      box(1300, 700, 1300);
      break;
    case 7:
      levelTwo.display();
      drawLevelTwoTube();
      if (endingSequenceSpeed > 15) {
        levelTwoRestrictMovement();
      }
      break;
    case 8:
      levelThree.display();
      drawLevelFourBuildings();
      break;
  }
  pop();

}

function displayInventory() {
  push();
  stickDisplays();
  translate(-950, -350, 0);

  for (let i = 0; i < 5; i++) {
    if (itemArr[i] === undefined) {
      image(clear, width - 100, i * 100, 70, 70);
    } else if (itemArr[i] === graveyard) { //PUT MOVEMENT STUFF IN FUNCTION
      image(graveyard, itemLocX, itemLocY, itemX, itemY);
      image(frame, itemLocX, itemLocY, itemFrameX, itemFrameY);
      expandFrame();
    } else if (itemArr[i] === water) {
      image(water, itemLocX, itemLocY, itemX, itemY);
      image(frame, itemLocX, itemLocY, itemFrameX, itemFrameY);
      expandFrame();
    }
    else {
      image(itemArr[i], width - 100, i * 100 + 100, 70, 70)
      image(frame, width - 100, i * 100 + 100, 75, 75)
    }
  }
  pop();
}

function expandFrame() {
  setTimeout(() => {
    hideWeapon = true;
    if (itemLocX > 0) {
      itemLocX -= 4;
    }
    if (itemLocY > -180) {
      itemLocY -= 0.4;
    }
    if (itemX < 1900) {
      itemX += 3;
      itemFrameX += 3;
    }
    if (itemY < 1050) {
      itemY += 3;
      itemFrameY += 3;
    }
    setTimeout(() => {
      if (levelCounter === 4) {
        itemX = 70;
        itemY = 70;
        itemFrameX = 75;
        itemFrameY = 75;
        itemLocX = width - 100;
        itemLocY = 0;
        itemArr = [];
        levelFiveMusic.stop();
        siren.loop();
        displayAlert = false;
        levelCounter = 5;
      }
    }, 37000)
  }, 7000);
}

function stickDisplays() {
  camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
}

//Controls the footstep sound when pressing/releasing WASD keys
//Puts the game into fullscreen if they press the enter key
function keyPressed() {
  if (keyCode === 87 && keyIsDown(65) === false && keyIsDown(83) === false && keyIsDown(68) === false) {
    footsteps.loop();
  }
  if (keyCode === 65 && keyIsDown(87) === false && keyIsDown(83) === false && keyIsDown(68) === false) {
    footsteps.loop();
  }
  if (keyCode === 83 && keyIsDown(65) === false && keyIsDown(87) === false && keyIsDown(68) === false) {
    footsteps.loop();
  }
  if (keyCode === 68 && keyIsDown(65) === false && keyIsDown(83) === false && keyIsDown(87) === false) {
    footsteps.loop();
  }
  if (keyCode === 13) {
    fullscreen(true);
  }

  if (levelCounter === 4) {
    graveyard.loop();
    water.loop();
  }

  if (levelCounter === -2 && keyCode === 66) {
    siren.loop();
    levelCounter = -1;
    background(255);
    setTimeout(() => {
      levelOneMusic.loop();
    }, 10000)
  }
}

function keyReleased() {
  if (keyCode === 87 && keyIsDown(65) === false && keyIsDown(83) === false && keyIsDown(68) === false) {
    footsteps.stop();
  }
  if (keyCode === 65 && keyIsDown(87) === false && keyIsDown(83) === false && keyIsDown(68) === false) {
    footsteps.stop();
  }
  if (keyCode === 83 && keyIsDown(65) === false && keyIsDown(87) === false && keyIsDown(68) === false) {
    footsteps.stop();
  }
  if (keyCode === 68 && keyIsDown(65) === false && keyIsDown(83) === false && keyIsDown(87) === false) {
    footsteps.stop();
  }
}