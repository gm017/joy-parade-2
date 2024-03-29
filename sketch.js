
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

//Location and size of graveyard/water video and frame when in player inventory - used for enlarging and moving at the end
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
    speed: 5.6 //Game speed
    // speed: 30 //testing speed
  });

  scriptsArr = [script1, script2, script3, script4, script5]; //Array containing the scripts for each level
  alertColOne = color(0, alertOpacity);
  alertColTwo = color(0, 0, 255, alertOpacity);
  alertColThree = color(255, 0, 0, alertOpacity);
  alertColours = [alertColOne, alertColTwo, alertColThree];  //Array containing the alert text colours

  //Random locations for floating images
  generateImgLocs();

  //Initial font settings
  textFont(gliderGirls);
  textSize(50);

  //Create new levels from the Level class - Size of the floor plane, textures for floor and walls, background colours and level name text
  levelOne = new Level(60000, 60000, floor, averyFilter, backgroundColours.levelOneBg, "7 - ONe");
  levelTwo = new Level(600, 160000, flag, arch, backgroundColours.levelTwoBg, "7 - TWo");
  levelThree = new Level(190000, 190000, flagFilter, juliette, backgroundColours.levelThreeBg, "7 - THRee");
  levelFour = new Level(3000, 3000, towerFloor, juliette, backgroundColours.levelFourBg, "7 - Tower");
  levelFive = new Level(1, 1, juliette, towerFloor, backgroundColours.levelFiveBg, "8 - TANk")

  //Create new collectible items from the item class - Location and image/video
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
  rots++;                   //Variable used for all animated rotations
  lockHeight();             //Lock's the player's y position
  progressDialogue();       //Moves through the dialogue based on a counter going up
  vibrateSkyText();         //Vibrates the floating text in the first stage
  changeLevels();           //Controls the linear progression through the game based on conditionals
  displayInventory();       //Displays the player "inventory" on the right side of the screen once they collect at least one item
  drawAlert(alertColours[alertColCount], alertOpacity, alerts[alertsCount], alerts[alertsCount + 1]); //Displays the alert text after character dialogue is finished in some stages
  drawFloatingObjects(rots); //Draws the floating blue circle that flies around
  weaponBob(weapx);          //Controls the up and down bobbing of the players "weapon" when the player is moving
} //End Draw


function progressDialogue() {
  if (rover.position.y === -300) {                           //Checks if the player is at the "normal" height before going through the text, so that it doesn't begin during the opening sequence
    //Timing for changing the bottom text box counter 
    if (scriptTimer >= scriptsArr[scriptCount].length - 1) { // Checks if the script has run out of text and hides the text box if so
      displayTextBox = false;
      if (levelCounter != 5) {
        displayAlert = true; //                              //Displays alert text when dialogue has concluded
      }
    } else if (frameCount % scriptTimerFrames === 0 && julietteMonologue.isPlaying() === false) {
      scriptTimer += 2;                                      //Progresses the text shown in the box by checking the framecount and increasing the value of the scriptTimer variable
      textChange.play();                                     //Plays sound effect when text changes lines
      displayTextBox = true;
      displayAlert = false;
    }
  }
}

function weaponBob() {                                       //Checks if movement keys are held down and bobs the player weapon by changing the value of the weapx variable
  if (keyIsDown(87) || keyIsDown(65) === true || keyIsDown(83) === true || keyIsDown(68) === true) {
    if (frameCount % 25 === 0 && weapx === -545) {
      weapx += 10;
    } else if (frameCount % 50 === 0) {
      weapx -= 10;
    }
  }
}

function drawAlert(col, opac, txt1, txt2) {                //Draws the alert text on the screen, taking colours from the alertColours variable and text from alerts.txt

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



function drawBottomText(txt, portrait) {                 //Displays the text box and portrait at the bottom of the screen
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


function drawFloatingObjects(rots) {                  //Displays the floating objects that appear around the field of view
  push();
  stickDisplays();
  fill(0);
  translate(-700, -230, 0);
  rotateX(radians(rots));
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

function drawWeapon(weap) {                           //Displays the "weapon"/player character arm              
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


function drawCentreImage(img) {                      //Displays the images of text files in stages 7 - Three and 7 - Tower
  push();
  stickDisplays();
  translate(-600, 390, 0);
  rotateY(radians(-40));
  image(img, 10, -900, 650, 350);
  pop();
}

function generateImgLocs() {                         //Generates random positions for the towers that appear in the game, and pushes them to the imageLocs array
  for (let x = 0; x < 10; x++) {
    for (let z = 0; z < 10; z++) {
      let arr = [random(-30000, 30000), random(-30000, 30000), random(2000, 20000)];
      imageLocs.push(arr);
    }
  }
}


function drawImgs(img1, img2) {                     //Displays the images which float up from the ground and reset once they reach a certain height
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


function restrictMovement(x, z) {             //Restricts the player movement so they can't leave certain areas, taking an argument for the camera positions for x and z
  if (rover.position.x > x) {
    rover.position.x = x;
  }
  if (rover.position.x < -x) {
    rover.position.x = -x;
  }
  if (rover.position.z > z) {
    rover.position.z = z;
  }
  if (rover.position.z < -z) {
    rover.position.z = -z;
  }
}


function lockHeight() {
  if (lockPlayerHeight === true && !liftSequence) { //Checks to see if the opening lift sequence is happening and locks the players height if not
    rover.position.y = -300;
  }
}


function flyPlayer() {                                //Makes the player fly by altering the camera Y position
  lockPlayerHeight = false;
  rover.position.y -= 20;
}


function drawSkyText(txt, vib1, vib2, vib3) {    //Displays the floating text in the sky which follows the players position based on the camera

  if (frameCount % 200 === 0 && skyTimer < 2) {   //Loops through the different phrases basesd on the framecount
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


function vibrateSkyText() { //Set Sky text vibration
  textVib1 = random(0, 5);
  textVib2 = random(0, 3);
  textVib3 = random(0, 2);
}

function drawLevelFourBuildings() { //Draws the buildings in the foruth stage
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

function drawLevelTwoTube() { //Draws the rotating tube in the second stage
  push();
  rotateX(radians(90));
  rotateY(radians(rots));
  texture(flagFilter);
  cylinder(3000, 160000);
  pop();
}

function drawEndingSequence() { //Uses the framecount to cycle through different scenarios in the fifth stage. The endingSequence variable is increased by 1 unless it reaches 8 then resets. This counter used to cycle through the different scenarios in switch statement The speed of this cycle increases as more cycles occur.
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
        restrictMovement(200, 79500);
      }
      break;
    case 8:
      levelThree.display();
      drawLevelFourBuildings();
      break;
  }
  pop();

}

function displayInventory() {   //Displays the player inventory that appears on the right side of the screen if they collect an item. 
  push();
  stickDisplays();
  translate(-950, -350, 0);

  for (let i = 0; i < 5; i++) {
    if (itemArr[i] === undefined) { //Clear image if array item is undefined
      image(clear, width - 100, i * 100, 70, 70);
    } else if (itemArr[i] === graveyard) {                            //Checks for graveyard and water elements which act differently and trigger the end of the game. These have variables for their postion that the other items don't so that they can be moved and expanded individually.
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

function expandFrame() { //This function is executed when the player collects the item in the last stage, after 7 seconds the video and frame in the inventory expand to fill the screen. After 30 seconds the game ends.
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

function stickDisplays() { //This code was lifted from the Mazerunner game example linked from the rovercam guthub page. This is used to create the static elements on the screen. 
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

  if (levelCounter === 4) { //This checks if the player is in the fifth stage and plays the videos inside the collectible items which are then displayed in the inventory.
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

function keyReleased() { //Stops the footsteps noise if the player is not pressing any of the wasd keys.
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