class Item {
    constructor(locX, locY, locZ, img) {
        this.locX = locX;
        this.locY = locY;
        this.locZ = locZ;
        this.collected = false;
        this.img = img;
    }
    display() {

        if (!this.collected) {
            push();
            translate(this.locX, this.locY, this.locZ);
            rotateY(radians(rots));
            texture(this.img);
            box(500, 500);
            pop();
        }
    }
    playerCollect() {
        if (rover.position.x - this.locX <= 400 && rover.position.x - this.locX > 0 && rover.position.z - this.locZ <= 400 && rover.position.z - this.locZ > 0) {
            if (!this.collected) {
                itemArr.push(this.img);
                fanfare.play();
            }
            this.collected = true;
        }

    }
}
