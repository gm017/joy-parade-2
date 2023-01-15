//Class to create levels of the game
class Level {
    //Constructor sets variables for elements that are shared between all stages
    constructor(x, z, floorTexture, wallTexture, bgColour, lvlNum, script, weapon, portrait,) {
        this.x = x;
        this.z = z;
        this.floorTexture = floorTexture;
        this.wallTexture = wallTexture;
        this.bgColour = bgColour;
        this.script = script;
        this.portrait = portrait;
        this.weapon = weapon;
        this.lvlNum = lvlNum;
    }
    display() {
        //Displays the basics of each stage (walls and floor)
        background(this.bgColour);
        push();
        rotateX(radians(90));
        texture(this.floorTexture);
        plane(this.x, this.z);
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
    showLevelNumber() {
        //Displays stage name/number at the top left of the screen
        push();
        camera(0, 0, (height / 2.0) / tan(PI * 30.0 / 180.0), 0, 0, 0, 0, 1, 0);
        ortho(-width / 2, width / 2, -height / 2, height / 2, 0, 1000);
        fill(0, 0, 213);
        translate(-950, -350, 0);
        textSize(30);
        fill(255);
        rotateY(radians(rots * 1.5))
        text(this.lvlNum, 30, -1 - 120);
        pop();
    }
}