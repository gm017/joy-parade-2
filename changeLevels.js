//Controls the level progression system
function changeLevels() {
    if (levelCounter === 0) {
        levelOne.display()
        drawImgs(deaconClear, juliette);
        drawBottomText(scriptsArr[levelCounter], rayna);
        drawSkyText(skyText[skyTimer], textVib1, textVib2, textVib3,);
        drawWeapon(arm);
        levelOne.showLevelNumber();

        if (displayAlert === false) {
            levelOneRestrictMovement();
        }

        if (rover.position.x > 30000 || rover.position.x < -30000 || rover.position.z > 30000 || rover.position.z < -30000) {
            if (displayAlert === true) {
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
    }

    if (levelCounter === 1) {
        levelTwo.display();

<<<<<<< HEAD

        drawLevelTwoTube();
=======
        push();
        rotateX(radians(90));
        rotateY(radians(rots));
        texture(flagFilter);
        cylinder(3000, 160000);
        pop();
>>>>>>> 076b8f62f8f1cf3433e035f7728f08d523da364a

        drawImgs(raynaFilter, flagFilter);
        levelTwo.showLevelNumber();
        levelTwoRestrictMovement();
        drawBottomText(scriptsArr[levelCounter], avery);
        drawWeapon(hammer);

        if (displayAlert === true) {
            flyPlayer();
        }

        if (rover.position.y < -10000) {
            levelCounter = 2;
            alertsCount += 2;
            scriptCount = 2;
            scriptTimer = 0;
            lockPlayerHeight = true;
            levelTwoMusic.stop();
            julietteMonologue.play();
            rover.position.x = 0;
            rover.position.z = 0;
            displayAlert = false;
            setTimeout(() => {
                levelThreeMusic.loop();
            }, 51000)
        }
    }

    if (levelCounter === 2) {
        levelThree.display();
        levelThree.showLevelNumber();
        if (julietteMonologue.isPlaying()) {
            drawCentreImage(julietteText, 10150, 9050);
            scriptTimer = 0;
        } else {
            drawBottomText(scriptsArr[levelCounter], avery);
            drawWeapon(santosHand);

            if (displayAlert === true) {

                // alertsCount += 2;
                scriptCount = 3;
                scriptTimer = 0;
                rover.position.x = 0;
                rover.position.z = 0;
                scriptTimer = 0;
                levelThreeMusic.stop();
                levelCounter = 3;
                alertsCount += 2;
                displayAlert = false;
                levelThreeMusic.stop();
                levelOneMusic.stop();
                graceMonologue.play();
            }
        }

        // lockPlayerHeight = true;
        // displayAlert = false;
        // displayTextBox = true;
    }
    if (levelCounter === 3) {

        levelFour.display();
        drawLevelFourBuildings();
        levelFour.showLevelNumber();
        drawBottomText(scriptsArr[levelCounter], juliette);

        if (graceMonologue.isPlaying() === true) {
            drawCentreImage(graceText);
            displayAlert = false;
        }

        drawWeapon(arm);
    }
    if (levelCounter === 4) {

        // if (endingSequenceSpeed > 5) {
        //     rover.position.x = 0;
        //     rover.position.z = 0;
        // }

        if (frameCount % endingSequenceSpeed === 0 && endingSequence <= 8) {
            endingSequence++
            console.log(endingSequence)
        } else if (frameCount % endingSequenceSpeed === 0) {
            endingSequence = 0;
            if (endingSequenceSpeed > 5) {
                endingSequenceSpeed -= 5;
                console.log(endingSequenceSpeed)
            }
        }

        push();

        // endingSequence = 4

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
                // rotateZ(radians(90));
                rotateY(radians(rots * 2));
                box(1300, 700, 1300);
                // translate(500, 0, 0)
                // sphere(300);
                // translate(400, 0, 0)
                // sphere(200);
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
                // rotateZ(radians(90));
                rotateY(radians(rots * 2));
                box(1300, 700, 1300);
                // translate(500, 0, 0)
                // sphere(300);
                // translate(400, 0, 0)
                // sphere(200);
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


        drawImgs(kingfisher, ancientPot);

        drawWeapon(arm);


        // levelFive.display();
        // drawBottomText(scriptsArr[levelCounter], arm);
        // drawSkyText(skyText[skyTimer], textVib1, textVib2, textVib3,);
        levelFive.showLevelNumber();

    }
}


