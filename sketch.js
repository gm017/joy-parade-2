
//Variable for rovercam
let rover;

//Images
let floor;
let flag;
let juliette;
let avery;
let deacon;
let sky;
let sword;
let gun;
let arm;
let arch;
let deaconClear;
let hammer;
let julietteText;

//Models
let truck;

//Rotations for flying objects
let rots = 0;

//Text box display
let displayTextBox = true;
let displayAlert = false;
let alertOpacity = 255;

let playerHeight = -300;

//Audio
let footsteps;
let julietteMonologue;
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
let levelCounter = 0;
let scriptCount = 0;
let alertsCount = 0;
let alertColCount = 0;

let weapx = -545;

//Text
let scriptsArr = [];
let script1;
let script2;
let script3;
let gliderGirls;
let bottomText;
let alerts = [];
let skyText = [["i", "i am", "i'll never"], ["love", "thinking", "let"], ["you", "of you", "you go!"]];


//Background colours
let backgroundColours = {
  levelOneBg: [255, 0, 150],
  levelTwoBg: [255, 100, 50],
  levelThreeBg: [0, 0, 20]
}


//Alert text colours
let alertColours = [];
let alertColOne, alertColTwo, alertColThree;

let towerLocations = [];

//Text vibrations
let textVib1, textVib2, textVib;

//Levels
let levelOne;
let levelTwo;
let levelThree;

let bgOn = true;

function preload() {
  floor = loadImage('img/floor.jpg');
  flag = loadImage('img/flag.jpg');
  juliette = loadImage('img/juliette-nobg.png');
  deaconClear = loadImage('img/deacon-nobg.png');
  avery = loadImage('img/avery.png');
  rayna = loadImage('img/rayna.png');
  deacon = loadImage('img/deacon.jpg');
  sky = loadImage('img/skycircle.png');
  sword = loadImage('img/energysword.png');
  gun = loadImage('img/gun.png');
  arm = loadImage('img/arm.png');
  hammer = loadImage('img/hammer.png');
  arch = loadImage('img/arch.png');
  julietteText = loadImage('img/julietteText.png');
  gliderGirls = loadFont('fonts/glidergirls.ttf');
  script1 = loadStrings('text/lvl1script.txt');
  script2 = loadStrings('text/lvl2script.txt');
  script3 = loadStrings('text/lvl3script.txt');
  alerts = loadStrings('text/alerts.txt');
  footsteps = loadSound('audio/footsteps.mp3');
  julietteMonologue = loadSound('audio/juliettemonologue.mp3');
  levelOneMusic = loadSound('audio/levelone.mp3')
  levelTwoMusic = loadSound('audio/leveltwo.mp3')
  levelThreeMusic = loadSound('audio/levelthree.mp3')
  levelTwoMusic = loadSound('audio/leveltwo.mp3')
  textChange = loadSound('audio/textchange.wav')
  truck = loadModel('models/minitruck.obj');
}

function setup() {
  createCanvas(1920, 1080, WEBGL);
  rover = createRoverCam();
  rover.usePointerLock();
  rover.setState({
    position: [-500, -400, -200],
    rotation: [1.52, 0.2, 0],
    sensitivity: 0.1,
    // speed: 5.6 //True game speed
    speed: 20 //testing speed
  });

  scriptsArr = [script1, script2, script3];
  alertColOne = color(0, alertOpacity);
  alertColTwo = color(0, 0, 255, alertOpacity);
  alertColThree = color(255, 0, 0, alertOpacity);
  alertColours = [alertColOne, alertColTwo, alertColThree];

  console.log(alertColOne);
  console.log(alertColours[alertColCount]);

  //Random locations for towers
  generateTowerLocations();

  //Initial font settings
  textFont(gliderGirls);
  textSize(50);

  levelOneMusic.loop();

  //Create new levels from the Level class
  levelOne = new Level(60000, 60000, floor, avery, backgroundColours.levelOneBg, "7 - ONe");
  levelTwo = new Level(600, 90000, flag, arch, backgroundColours.levelTwoBg, "7 - TWo");
  levelThree = new Level(190000, 190000, flag, arch, backgroundColours.levelThreeBg, "7 - THRee");

} // END SETUP

function draw() {
  noStroke();
  rots++;


  //Lock the player camera height

  if (lockPlayerHeight === true) {
    rover.position.y = -300;
  }

  //Timer for changing the sky text counter


  //Timing for changing the bottom text box counter
  if (scriptTimer >= scriptsArr[scriptCount].length - 1) {
    displayTextBox = false;
    displayAlert = true;
    // rover.position.z += 150;
  } else if (frameCount % 200 === 0 && julietteMonologue.isPlaying() === false) {
    scriptTimer += 2;
    textChange.play();
    displayTextBox = true;
    displayAlert = false;
  }

  if (frameCount % 50 === 0) {
    if (alertOpacity === 0) {
      alertOpacity = 255;
    } else {
      alertOpacity = 0;
    }
  }

  vibrateSkyText();


  // fill(255, 0, 0);


  changeLevels();

  // drawBottomText(script1);
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


//Controls the level progression system
function changeLevels() {
  if (levelCounter === 0) {
    levelOne.display()
    drawTowers();
    drawBottomText(scriptsArr[levelCounter], rayna);
    drawSkyText(skyText[skyTimer], textVib1, textVib2, textVib3,);
    drawWeapon(arm);
    levelOne.showLevelNumber();

    if (rover.position.x > 30000 || rover.position.x < -30000 || rover.position.z > 30000 || rover.position.z < -30000) {
      rover.position.x = 0;
      rover.position.z = 0;
      levelCounter++;
      displayAlert = false;
      alertsCount += 2;
      alertColCount++;
      levelOneMusic.stop();
      levelTwoMusic.loop();
      scriptCount = 1;
      scriptTimer = 0;
    }
  }
  if (levelCounter === 1) {
    levelTwo.display();
    levelTwo.showLevelNumber();
    restrictMovement();
    drawBottomText(scriptsArr[levelCounter], avery);
    drawWeapon(hammer);
    if (rover.position.z > 30000 && rover.position.y > -10000 || rover.position.z < -30000 && rover.position.y > -10000) {
      flyPlayer();
    }
    if (rover.position.z > 30000 && rover.position.y < -10000 || rover.position.z < -30000 && rover.position.y < -10000) {
      levelCounter = 2;
      alertsCount += 2;
      scriptCount = 2;
      scriptTimer = 0;
      lockPlayerHeight = true;
      levelTwoMusic.stop();
      julietteMonologue.play();
      rover.position.x = 0;
      rover.position.z = 0;
      setTimeout(() => {
        levelThreeMusic.loop();
      }, 51000)
    }
  }
  if (levelCounter === 2) {
    levelThree.display();
    levelThree.showLevelNumber();
    if (julietteMonologue.isPlaying()) {
      drawCentreImage(julietteText);
      scriptTimer = 0;
    } else {
      drawBottomText(scriptsArr[levelCounter], avery);
    }

    // lockPlayerHeight = true;
    // displayAlert = false;
    // displayTextBox = true;
  }
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

function drawCentreImage(img) {
  push();
  camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
  translate(-600, 390, 0);
  rotateY(radians(-40));
  image(img, 10, -900, 1150, 950);
  pop();
}

//Generates random positions for the towers that appear in the game
function generateTowerLocations() {
  for (let x = 0; x < 10; x++) {
    for (let z = 0; z < 10; z++) {
      let arr = [random(-30000, 30000), random(-30000, 30000), random(2000, 20000)];
      towerLocations.push(arr);
    }
  }
}

function drawTowers() {
  // push();
  // translate(100, -700, 6000);;
  // tint(255, 0, 255);
  // texture(juliette);
  // cylinder(600, 5700 + random(0, 10));
  // translate(1500, 0, 0);
  // texture(avery);
  // cylinder(600, 17000);
  // // model(truck);
  // pop();

  for (let i = 0; i < 50; i++) {
    push();
    texture(deaconClear);
    translate(towerLocations[i][0], -700, towerLocations[i][1]);
    plane(600, towerLocations[i][2] / 20);
    texture(juliette);
    translate(100, 100, -100);
    plane(600, towerLocations[i][2] / 20);
    translate(0, 100, 0);
    box(towerLocations[i][2], 10, 60);
    pop();
  }
}

//Restricts the player movement in Level 2 so that they can't walk off the platform
function restrictMovement() {
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
  rover.position.y -= 10;
}

function drawSkyText(txt, vib1, vib2, vib3) {

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
  pop();
}


//Set Sky text vibration
function vibrateSkyText() {
  textVib1 = random(0, 5);
  textVib2 = random(0, 3);
  textVib3 = random(0, 2);
}

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