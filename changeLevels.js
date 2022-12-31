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
        drawImgs(rayna, flag);
        levelTwo.showLevelNumber();
        restrictMovement();
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
            drawWeapon(santosHand);
        }

        // lockPlayerHeight = true;
        // displayAlert = false;
        // displayTextBox = true;
    }
    if (levelCounter === 3) {
        levelFour.display();
        levelFour.showLevelNumber();
    }
}
