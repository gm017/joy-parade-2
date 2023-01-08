//Controls the level progression system
function changeLevels() {
    if (levelCounter === 0) {
        levelOne.display()


        if (rover.position.y === -300) {
            drawImgs(deaconClear, juliette);
            drawBottomText(scriptsArr[levelCounter], rayna);
            drawSkyText(skyText[skyTimer], textVib1, textVib2, textVib3,);
            pot.display();
            pot.playerCollect();
        }

        if (rover.position.y > -300) {
            lockPlayerHeight = false;
            rover.position.y -= 10;

            push();
            translate(0, rover.position.y + 1000, 0);
            rotateX(radians(90));
            texture(towerFloor);
            plane(5000, 5000);
            pop();

            if (rover.position.y > 1500) {
                push();
                translate(0, rover.position.y - 1900, 0);
                rotateX(radians(90));
                texture(towerFloor);
                plane(5000, 5000);
            }


            pop();

            if (rover.position.x > 2000) {
                rover.position.x = 2000
            }
            if (rover.position.x < -2000) {
                rover.position.x = -2000
            }
            if (rover.position.z > 2000) {
                rover.position.z = 2000
            }
            if (rover.position.z < -2000) {
                rover.position.z = -2000
            }

            console.log(rover.position.y)

        } else if (lockPlayerHeight = true) {
            liftSequence = false;
        }

        console.log(lockPlayerHeight)

        push();
        texture(lift);
        translate(0, 10000, 0);
        box(5000, 20000, 5000);
        pop();




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

        drawImgs(raynaFilter, flagFilter);
        levelTwo.showLevelNumber();
        levelTwoRestrictMovement();
        drawBottomText(scriptsArr[levelCounter], avery);

        car.display();
        car.playerCollect();



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
        watch.display();
        watch.playerCollect();

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
    }

    if (levelCounter === 3) {

        levelFour.display();
        drawLevelFourBuildings();
        levelFour.showLevelNumber();
        tank.display();
        tank.playerCollect();

        if (graceMonologue.isPlaying() === true) {
            drawCentreImage(graceText);
            scriptTimer = 0;
            textChange.stop();
        }

        if (graceMonologue.isPlaying() === false) {
            displayAlert = false;
            drawBottomText(scriptsArr[levelCounter], juliette);

            if (levelCounter === 3 && displayTextBox === false) {
                scriptCount = 4;
                alertsCount += 2;
                scriptTimer = 0;
                rover.position.x = 0;
                rover.position.z = 0;
                levelFourMusic.stop();
                levelCounter = 4;
            }
        }

        drawWeapon(arm);
    }

    if (levelCounter === 4) {
        drawEndingSequence();
        drawImgs(kingfisher, ancientPot);
        levelFive.showLevelNumber();
        grave.display();
        grave.playerCollect();
        drawBottomText(scriptsArr[levelCounter], arm);
        drawWeapon(arm);
    }
}


