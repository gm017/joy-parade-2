class Item {
    constructor(locX, locZ, img) {
        this.locX = locX;
        this.locZ = locZ;
        this.img = img;
    }

    display() {
        push();
        translate(locX, -500, locY);
        plane(500, 500);
        pop();
    }
}