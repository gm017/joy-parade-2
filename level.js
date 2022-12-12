//Class to create levels of the game
class Level {
    constructor(x, y, floorTexture, wallTexture, bgColour) {
        this.x = x;
        this.y = y
        this.floorTexture = floorTexture;
        this.wallTexture = wallTexture;
        this.bgColour = bgColour;
    }
    display() {
        if (bgOn === true) {
            background(this.bgColour);
        }
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
    }
}