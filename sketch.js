
// - - - - - - - - - - - - - - - - - - - - - - -
//"One, I Love You"
//Gabriel Manzi

//Images in the game taken from google image searches: "nashville (character) tv show", "hand holding (object)", "arm with watch stock image", "cartier santos on wrist" and "Nashville movie flag"
//Using Rovercam for the camera controls https://github.com/freshfork/p5.RoverCam
//Some functions adapted from the Mazerunner game example on the rovercam github (these are noted in the comments next to them)
//Custom knife chat in stage "7 - Tower" taken from Rodzilla Hunk's comment on "Casio G-Shock collectors" Facebook group
//Juliette Barnes voiced by Katy (Stage 7 - Three) and Grace (Stage 7 - Tower)

//Control the player character with WASD and look around with the mouse
//Press the enter key to make the game full screen
//Any code not in sketch.js is in level.js or changeLevels.js
//There is a walkthrough for the game in the files 
// - - - - - - - - - - - - - - - - - - - - - - -

//Variable for rovercam
let rover;

//Images
let floor;
let flag;
let flagFilter;
let juliette;
let avery;
let averyFilter;
let deacon;
let sky;
let sword;
let rayna;
let raynaFilter;
let kingfisher;
let gun;
let arm;
let arch;
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
let julietteMonologue;
let graceMonologue;
let levelOneMusic;
let levelTwoMusic;
let levelThreeMusic;
let textChange;

//Toggle locking player control
let lockControl = false;
let lockPlayerHeight = true;

//Counters
let skyTimer = 0;
let scriptTimer = 0;
let scriptTimerFrames = 20;
let levelCounter = 0;
let scriptCount = 0;
let alertsCount = 0;
let alertColCount = 0;

//Initial player weapon height
let weapx = -545;

//Text
let scriptsArr = [];
let script1;
let script2;
let script3;
let script4;
let gliderGirls;
let bottomText;
let alerts = [];
let skyText = [["i", "i am", "i'll never"], ["love", "thinking", "let"], ["you", "of you", "you go!"]];


//Background colours
let backgroundColours = {
  // levelOneBg: [255, 0, 150],
  levelOneBg: [0, 30, 200],
  // levelTwoBg: [255, 100, 50],
  levelTwoBg: [0, 10, 20],
  levelThreeBg: [0, 0, 20],
  levelFourBg: [0, 50, 20]
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

//Preload images, text files and audio
function preload() {
  floor = loadImage('img/floor.jpg');
  flag = loadImage('img/flag.jpg');
  flagFilter = loadImage('img/flag-filter.png');
  juliette = loadImage('img/juliette-nobg-filter.png');
  deaconClear = loadImage('img/deacon-nobg-filter.png');
  avery = loadImage('img/avery.png');
  averyFilter = loadImage('img/avery-filter.png');
  rayna = loadImage('img/rayna.png');
  raynaFilter = loadImage('img/rayna-filter.png');
  deacon = loadImage('img/deacon.jpg');
  sky = loadImage('img/skycircle.png');
  sword = loadImage('img/energysword.png');
  gun = loadImage('img/gun.png');
  arm = loadImage('img/arm-filter.png');
  santosHand = loadImage('img/santos-hand.png');
  hammer = loadImage('img/hammer-filter.png');
  kingfisher = loadImage('img/kingfisher-filter.png');
  arch = loadImage('img/arch.png');
  towerFloor = loadImage('img/tower-floor.png');
  julietteText = loadImage('img/julietteText.png');
  graceText = loadImage('img/gracetext.png')
  gliderGirls = loadFont('fonts/glidergirls.ttf');
  script1 = loadStrings('text/lvl1script.txt');
  script2 = loadStrings('text/lvl2script.txt');
  script3 = loadStrings('text/lvl3script.txt');
  script4 = loadStrings('text/lvl4script.txt');
  alerts = loadStrings('text/alerts.txt');
  footsteps = loadSound('audio/footsteps.mp3');
  julietteMonologue = loadSound('audio/juliettemonologue.mp3');
  levelOneMusic = loadSound('audio/levelone.mp3')
  levelTwoMusic = loadSound('audio/leveltwo.mp3')
  levelThreeMusic = loadSound('audio/levelthree.mp3')
  levelTwoMusic = loadSound('audio/leveltwo.mp3')
  graceMonologue = loadSound('audio/grace-monologue.mp3')
  textChange = loadSound('audio/textchange.wav')
}

function setup() {
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

  scriptsArr = [script1, script2, script3, script4];
  alertColOne = color(0, alertOpacity);
  alertColTwo = color(0, 0, 255, alertOpacity);
  alertColThree = color(255, 0, 0, alertOpacity);
  alertColours = [alertColOne, alertColTwo, alertColThree];

  //Random locations for floating images
  generateImgLocs();

  //Initial font settings
  textFont(gliderGirls);
  textSize(50);

  //Starts music for the first stage
  levelOneMusic.loop();

  //Create new levels from the Level class
  levelOne = new Level(60000, 60000, floor, averyFilter, backgroundColours.levelOneBg, "7 - ONe");
  levelTwo = new Level(600, 90000, flag, arch, backgroundColours.levelTwoBg, "7 - TWo");
  levelThree = new Level(190000, 190000, flagFilter, juliette, backgroundColours.levelThreeBg, "7 - THRee");
  levelFour = new Level(3000, 3000, towerFloor, juliette, backgroundColours.levelFourBg, "7 - Tower");

  //Initial floating image height
  imgHeight = 700;

} // END SETUP

function draw() {
  noStroke();
  rots++;
  //Lock the player camera height
  if (lockPlayerHeight === true) {
    rover.position.y = -300;
  }

  //Timing for changing the bottom text box counter
  if (scriptTimer >= scriptsArr[scriptCount].length - 1) {
    displayTextBox = false;
    displayAlert = true;
  } else if (frameCount % scriptTimerFrames === 0 && julietteMonologue.isPlaying() === false) {
    scriptTimer += 2;
    textChange.play();
    displayTextBox = true;
    displayAlert = false;
  }

  vibrateSkyText();

  changeLevels();

  drawAlert(alertColours[alertColCount], alertOpacity, alerts[alertsCount], alerts[alertsCount + 1]);
  drawFloatingObjects(rots);
  weaponBob(weapx);

} //End Draw

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
    camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
    ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
    // fill(255, 239, 213, 200);
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
    camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
    ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
    fill(255, 239, 213, 200);
    translate(-600, 490, 0);
    rect(0, -180, 1200, 160);
    textSize(30);
    // fill(0, 250, 250);
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
  camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
  fill(0);
  translate(-700, -230, 0);
  rotateX(radians(rots));
  rotateZ(radians(rots));
  rotateY(radians(rots));
  for (let i = 0; i < 10; i++) {
    image(sky, 450 + (i * rots / 100), -180, 10, 100);
  }
  rotateZ(radians(- rots));
  rotateY(radians(rots));
  image(sky, 950, -180, 10, 100);
  textSize(30);
  fill(0, 250, 250);
  pop();
}

//Displays the "weapon"/player character arm
//Adapted from Mazerunner example linked from the rovercam github page
//https://editor.p5js.org/jwdunn1/sketches/iI-2XX0Hw
function drawWeapon(weap) {
  push();
  camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
  translate(-600, 390, 0);
  tint(200, 0, 255);
  rotateY(radians(-40));
  image(weap, 900, weapx, 650, 950);
  pop();
}

//Displays the images of text files in stages 7 - Three and 7 - Tower
//Adapted from Mazerunner example linked from the rovercam github page
//https://editor.p5js.org/jwdunn1/sketches/iI-2XX0Hw
function drawCentreImage(img) {
  push();
  camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
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
  console.log(rover.position.x);
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
  cylinder(3000, 90000);
  pop();
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