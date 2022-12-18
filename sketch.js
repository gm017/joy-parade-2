
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

//Models
let truck;

//Rotations for flying objects
let rots = 0;

//Text box display
let displayTextBox = true;
let displayAlert = false;
let alertOpacity = 0;

let playerHeight = -300;

//Audio
let footsteps;
let levelOneMusic;
let levelTwoMusic;

//Toggle locking player control
let lockControl = false;
let lockPlayerHeight = false;

//Counters
let scriptTimer = 0;
let scriptTimer2 = 0;
let levelCounter = 0;

let weapx = -545;

//Text
let script;
let gliderGirls;
let bottomText;
let skyText = [["i", "i am", "i'll never"], ["love", "thinking", "let"], ["you", "of you", "you go!"]];

//Background colours
let backgroundColours = {
  levelOneBg: [255, 0, 150],
  levelTwoBg: [255, 100, 50]
}

let towerLocations = [];

//Text vibrations
let textVib1, textVib2, textVib;

//Levels
let levelOne;
let levelTwo;

let bgOn = true;

function preload() {
  floor = loadImage('img/floor.jpg');
  flag = loadImage('img/flag.jpg');
  juliette = loadImage('img/juliette.png');
  avery = loadImage('img/avery.png');
  rayna = loadImage('img/rayna.png');
  deacon = loadImage('img/deacon.jpg');
  sky = loadImage('img/skycircle.png');
  sword = loadImage('img/energysword.png');
  gun = loadImage('img/gun.png');
  arm = loadImage('img/arm.png');
  arch = loadImage('img/arch.png');
  gliderGirls = loadFont('fonts/glidergirls.ttf');
  script1 = loadStrings('text/lvl1script.txt');
  script2 = loadStrings('text/lvl2script.txt');
  footsteps = loadSound('audio/footsteps.mp3');
  levelOneMusic = loadSound('audio/levelone.mp3')
  levelTwoMusic = loadSound('audio/leveltwo.mp3')
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
    speed: 20
  });

  //Random locations for towers
  generateTowerLocations();

  //Initial font settings
  textFont(gliderGirls);
  textSize(50);

  levelOneMusic.loop();

  //Create new levels from the Level class
  levelOne = new Level(60000, 60000, floor, avery, backgroundColours.levelOneBg);
  levelTwo = new Level(600, 90000, flag, arch, backgroundColours.levelTwoBg);


} // END SETUP

function draw() {

  //Lock the player camera height

  if (lockPlayerHeight = true) {
    rover.position.y = -300;
  }

  // flyPlayer();

  // rover.position.y -= 10;

  noStroke();

  //Timer for changing the sky text counter
  if (frameCount % 200 === 0 && scriptTimer < 2) {
    scriptTimer += 1;
  } else if (frameCount % 200 === 0) {
    scriptTimer = 0;
  }

  //Timing for changing the bottom text box counter
  if (script1[scriptTimer2] === undefined) {
    displayTextBox = false;
    displayAlert = true;
    // rover.position.z += 150;
  } else if (frameCount % 50 === 0) {
    scriptTimer2 += 2;
  }

  // if (frameCount % 400 === 0) {
  //   scriptTimer2++;
  // } else if (frameCount % 400 === 0) {
  //   scriptTimer2 = 0;
  // }

  if (frameCount % 50 === 0) {
    if (alertOpacity === 0) {
      alertOpacity = 255;
    } else {
      alertOpacity = 0;
    }
  }

  //Set sky text vibration
  textVib1 = random(0, 5);
  textVib2 = random(0, 3);
  textVib3 = random(0, 2);

  fill(255, 0, 0);

  rots++;

  changeLevels();

  drawTowers();
  drawSkyText(skyText[scriptTimer], textVib1, textVib2, textVib3,);
  // drawBottomText(script1);
  drawAlert(alertOpacity);
  drawWeapon();
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


function drawAlert(o) {
  push();
  if (displayAlert === true) {
    camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
    ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
    // fill(255, 239, 213, 200);
    translate(-500, -300, 0);
    fill(0, o);
    text("You're done here,", 100, 0);
    text("fall through the walls!", 100, 100);
    pop();
  }
}

function drawSkyText(txt, vib1, vib2, vib3) {
  push();
  fill(0, 255, 0);
  push();
  translate(rover.position.x, rover.position.y - 50, rover.position.z + 100);
  rotateX(radians(90));
  rotateY(radians(180));
  text(txt[0], 0, 0 + vib1)

  pop();

  push();
  translate(rover.position.x, rover.position.y - 50, rover.position.z - 100);
  rotateX(radians(90));
  rotateZ(radians(90));
  rotateY(radians(180));
  text(txt[1], 0, 0 + vib2)
  pop();

  push();
  translate(rover.position.x + 200, rover.position.y - 50, rover.position.z + 200);
  rotateX(radians(90));
  rotateY(radians(180));
  text(txt[2], 0, 0 + vib3)
  pop();
  pop();
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
    texture(juliette);
    translate(towerLocations[i][0], -700, towerLocations[i][1]);
    box(600, towerLocations[i][2], 600);
    box(towerLocations[i][2], 10, 60);
    pop();
  }
}

function changeLevels() {

  if (levelCounter >= 2) {
    levelCounter = 0;
  }
  // if (levelCounter === -1) {
  //   push();
  //   camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  //   ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
  //   fill(255, 239, 213, 200);
  //   rect(-970, -600, 2300, 1300);
  //   textSize(30);
  //   fill(0, 250, 250);
  //   text("test", 0, 0);
  //   pop();
  // }
  if (levelCounter === 0) {
    levelOne.display()
    drawBottomText(script1, rayna);
    if (rover.position.x > 30000 || rover.position.x < -30000 || rover.position.z > 30000 || rover.position.z < -30000) {
      rover.position.x = 0;
      rover.position.z = 0;
      levelCounter++;
      levelOneMusic.stop();
      levelTwoMusic.loop();
    }
  }
  if (levelCounter === 1) {
    levelTwo.display();
    displayAlert = false;
    displayTextBox = true;
    restrictMovement();
    drawBottomText(script2, avery);
    flyPlayer();
  }
}

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
    fill(0, 250, 250);
    text(txt[scriptTimer2], 170, -1 - 120);
    text(txt[scriptTimer2 + 1], 170, -1 - 60);
    tint(200, 0, 255);
    image(portrait, 5, -175, 150, 150);
    pop();
  }
}

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
    image(sky, 450 + (i * 100), -180, 10, 100);
  }
  rotateZ(radians(- rots));
  rotateY(radians(rots));
  image(sky, 950, -180, 10, 100);
  textSize(30);
  fill(0, 250, 250);
  pop();
}

function drawWeapon() {
  push();
  camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
  translate(-600, 390, 0);
  tint(200, 0, 255);
  rotateY(radians(-40));
  image(arm, 900, weapx, 650, 950);
  pop();
}

function generateTowerLocations() {
  for (let x = 0; x < 10; x++) {
    for (let z = 0; z < 10; z++) {
      let arr = [random(-30000, 30000), random(-30000, 30000), random(2000, 20000)];
      towerLocations.push(arr);
    }
  }
}

function restrictMovement() {
  if (rover.position.x > 200) {
    rover.position.x = 200;
  }
  if (rover.position.x < -200) {
    rover.position.x = -200;
  }
}

function flyPlayer() {

  lockPlayerHeight = false;
  rover.position.y -= 10;

}