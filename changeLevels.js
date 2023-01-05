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
        drawLevelTwoTube();
        push();
        rotateX(radians(90));
        rotateY(radians(rots));
        texture(flagFilter);
        cylinder(3000, 160000);
        pop();

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
                scriptTimer = 0;
                // alertsCount += 2;
                scriptCount = 3;
                rover.position.x = 0;
                rover.position.z = 0;
                levelThreeMusic.stop();
                levelCounter = 3;
                alertsCount += 2;
                displayAlert = false;
                levelThreeMusic.stop();
                levelOneMusic.stop();
                graceMonologue.play();
                levelFourMusic.loop();
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

        if (graceMonologue.isPlaying() === true) {
            drawCentreImage(graceText);
            scriptTimer = 0;
            textChange.stop();
        }

        if (graceMonologue.isPlaying() === false) {
            displayAlert = false;
            drawBottomText(scriptsArr[levelCounter], juliette);
            setTimeout(() => {
                if (levelCounter === 3) {
                    scriptCount = 4;
                    scriptTimer = 0;
                    rover.position.x = 0;
                    rover.position.z = 0;
                    levelFourMusic.stop();
                    levelCounter = 4;
                }
            }, 60000)
        }

        drawWeapon(arm);
    }
    if (levelCounter === 4) {

        drawEndingSequence();
        drawImgs(kingfisher, ancientPot);
        levelFive.showLevelNumber();
        drawBottomText(scriptsArr[levelCounter], arm);
        drawWeapon(arm);

    }
}


