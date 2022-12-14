
//"One I Love You Two I'm Thinking Of You"

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

//Models
let truck;

//Rotations for flying objects
let rots = 0;

//Text box display
let displayTextBox = true;
let displayAlert = false;
let alertOpacity = 0;

//Audio
let footsteps;
let levelOneMusic;
let levelTwoMusic;

//Toggle locking player control
let lockControl = false;

//Counters
let scriptTimer = 0;
let scriptTimer2 = 0;
let levelCounter = 0;

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
  gliderGirls = loadFont('fonts/glidergirls.ttf');
  script = loadStrings('gamescript.txt');
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
  for (let x = 0; x < 10; x++) {
    for (let z = 0; z < 10; z++) {
      let arr = [random(-30000, 30000), random(-30000, 30000), random(2000, 20000)];
      towerLocations.push(arr);
    }
  }

  //Initial font settings
  textFont(gliderGirls);
  textSize(50);

  fullscreen(true);

  levelOneMusic.play();

  //Create new levels from the Level class
  levelOne = new Level(60000, 60000, floor, avery, backgroundColours.levelOneBg);
  levelTwo = new Level(60000, 60000, flag, deacon, backgroundColours.levelTwoBg);
}



function draw() {

  //Lock the player camera height

  rover.position.y = -300;


  // rover.position.y -= 10;

  noStroke();

  //Timer for changing the sky text counter
  if (frameCount % 200 === 0 && scriptTimer < 2) {
    scriptTimer += 1;
  } else if (frameCount % 200 === 0) {
    scriptTimer = 0;
  }

  //Timing for changing the bottom text box counter
  if (frameCount % 400 === 0 && scriptTimer2 < script.length) {
    scriptTimer2 += 2;
  } else if (frameCount % 400 === 0) {
    displayTextBox = false;
    displayAlert = true;
  }

  if (frameCount % 400 === 0) {
    scriptTimer2++;
  } else if (frameCount % 400 === 0) {
    scriptTimer2 = 0;
  }

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
  drawSkybox(rots);
  drawTowers();
  drawSkyText(skyText[scriptTimer], textVib1, textVib2, textVib3,);
  drawBottomText(script);
  drawAlert(alertOpacity);

} //End Draw


function keyPressed() {

  if (keyCode === 87 || keyCode === 65 || keyCode === 83 || keyCode === 68) {
    footsteps.play();

  }
  if (keyCode === 13) {
    fullscreen(true);
  }
}

function keyReleased() {
  if (keyCode === 87 || keyCode === 65 || keyCode === 83 || keyCode === 68) {
    footsteps.stop();
  }
}

function drawFloor(x, y, tex) {
  push();
  // translate(-30050, 0, -20950);
  rotateX(radians(90));
  texture(tex);
  plane(x, y);
  pop();
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

  for (let i = 0; i < 100; i++) {
    push();
    texture(juliette);
    translate(towerLocations[i][0], -700, towerLocations[i][1]);
    box(600, towerLocations[i][2], 600);
    box(towerLocations[i][2], 10, 60);
    pop();
  }
}

function changeLevels() {
  if (rover.position.x > 30000 || rover.position.x < -30000 || rover.position.z > 30000 || rover.position.z < -30000) {
    rover.position.x = 0;
    rover.position.z = 0;
    levelCounter++;
    displayAlert = false;
    levelOneMusic.stop();
    levelTwoMusic.play();
  }
  if (levelCounter >= 2) {
    levelCounter = 0;
  }
  if (levelCounter === 0) {
    levelOne.display()
  }
  if (levelCounter === 1) {
    levelTwo.display();
  }
}

//Adapted from Mazerunner example linked from the rovercam github page
function drawBottomText(txt) {

  if (displayTextBox === true) {
    push();
    camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
    ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
    fill(255, 239, 213, 200);
    translate(-600, 390, 0);
    rect(0, -180, 1200, 160);
    textSize(30);
    fill(0, 250, 250);
    text(txt[scriptTimer2], 170, -1 - 120);
    text(txt[scriptTimer2 + 1], 170, -1 - 60);
    tint(200, 0, 255);
    image(rayna, 5, -175, 150, 150);
    rotateY(radians(-20));
    image(sword, 900, -545, 150, 650);
    pop();
  }
}

function drawSkybox(rots) {
  push();
  camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
  ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
  fill(0);
  translate(-700, -230, 0);
  rotateX(radians(rots));
  rotateZ(radians(rots));
  rotateY(radians(rots));
  image(sky, 450, -180, 10, 100);
  rotateZ(radians(- rots));
  rotateY(radians(rots));
  image(sky, 950, -180, 10, 100);
  textSize(30);
  fill(0, 250, 250);
  pop();
}
