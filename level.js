//Class to create levels of the game
class Level {
    constructor(x, y, floorTexture, wallTexture, bgColour, script, weapon, portrait) {
        this.x = x;
        this.y = y;
        this.floorTexture = floorTexture;
        this.wallTexture = wallTexture;
        this.bgColour = bgColour;
        this.script = script;
        this.portrait = portrait;
        this.weapon = weapon;
    }
    display() {

        background(this.bgColour);


        push();
        rotateX(radians(90));
        texture(this.floorTexture);
        plane(this.x, this.y);
        pop();
        push();
        translate(0, 0, 30000);
        texture(this.wallTexture);
        plane(60000, 10000);
        pop();
        push()
        translate(0, 0, -30000);
        texture(this.wallTexture);
        plane(60000, 10000);
        pop();
        push();
        translate(30000, 0, 0);
        rotateY(radians(90));
        rotateZ(radians(90));
        texture(this.wallTexture);
        plane(10000, 60000);
        pop();
        push();
        translate(-30000, 0, 0);
        rotateY(radians(90));
        rotateZ(radians(90));
        texture(this.wallTexture);
        plane(10000, 60000);
        pop();
        return true;
    }
    drawTextBox() {
        if (displayTextBox === true) {
            push();
            camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
            ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
            fill(255, 239, 213, 200);
            translate(-600, 490, 0);
            rect(0, -180, 1200, 160);
            textSize(30);
            fill(0, 250, 250);
            text(this.script[scriptTimer2], 170, -1 - 120);
            text(this.script[scriptTimer2 + 1], 170, -1 - 60);
            tint(200, 0, 255);
            image(rayna, 5, -175, 150, 150);
            pop();
        }
    }
}