//Controls the level progression system
function changeLevels() {
    if (levelCounter === -2) {
        push();
        stickDisplays();
        translate(-500, -300, 0);
        strokeWeight(20);
        fill(0, 150, 255);
        text("b key to start", 100, 0);
        pop();
    }

    if (levelCounter === -1) {
        push();
        stickDisplays();
        translate(-500, -300, 0);
        strokeWeight(20);
        fill(0, 150, 255);
        text("Joy Parade", 100, 0);
        pop();
        setTimeout(() => {
            siren.stop();
            levelCounter = 0;
        }, 10000);
    }

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

        } else if (lockPlayerHeight = true) {
            liftSequence = false;
        }

        push();
        texture(lift);
        translate(0, 10000, 0);
        box(5000, 20000, 5000);
        pop();

        drawWeapon(intempo);
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
            }, 47000)
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
        levelFourMusic.setVolume(0.6)

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
                levelFiveMusic.loop();
            }
        }
        drawWeapon(arm);
    }

    if (levelCounter === 4) {
        drawEndingSequence();
        drawImgs(kingfisher, ancientPot);
        levelFive.showLevelNumber();


        if (itemArr.length <= 3) {
            grave.display();
            grave.playerCollect();
        } else {
            waterItem.display();
            waterItem.playerCollect();
        }

        drawBottomText(scriptsArr[levelCounter], arm);
        drawWeapon(arm);
    }

    if (levelCounter === 5) {
        background(255);
        push();
        stickDisplays();
        translate(-500, -300, 0);
        strokeWeight(20);
        fill(0, 150, 255);
        text("Thanks for playing", 100, 0);
        translate(200, 200, 0);
        image(sky, 0, 0, 500, 500);
        pop();
    }
}