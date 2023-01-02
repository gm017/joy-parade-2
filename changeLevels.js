//Controls the level progression system
function changeLevels() {
    if (levelCounter === 0) {
        levelOne.display()
        drawImgs(deaconClear, juliette);
        drawBottomText(scriptsArr[levelCounter], rayna);
        drawSkyText(skyText[skyTimer], textVib1, textVib2, textVib3,);
        drawWeapon(arm);
        levelOne.showLevelNumber();

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
        drawImgs(raynaFilter, flagFilter);
        levelTwo.showLevelNumber();
        levelTwoRestrictMovement();
        drawBottomText(scriptsArr[levelCounter], avery);
        drawWeapon(hammer);
        if (rover.position.z > 30000 && rover.position.y > -10000 || rover.position.z < -30000 && rover.position.y > -10000) {
            if (displayAlert === true) {
                flyPlayer();
            }
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
}
