export class Plane {
    constructor() {
        this.dimension = {
            x: 20,
            y: 20
        };
        this.points = []
        this.zoom = 2;
        this.xOffset = width/2
        this.yOffset = height/2
        this.scale = width/this.scalar;
        this.scale = (width / (this.dimension.x * 2)) * this.zoom;

    }
    
    axis() {
        // Vertical grid lines
        for (let x = -this.dimension.x; x <= this.dimension.x; x++) {
             
            textSize(6)
            //  text( x ,  5+x * this.dimension.x * this.scale/ 10, 5+  0);
            
            // text(x, x * this.scale + 5, 5);
            const currX = x * this.scale;

    if (x === -this.dimension.x) {
        textAlign(LEFT, TOP);
        text(x, currX + 5, 5);
    } 
    else if (x === this.dimension.x) {
        textAlign(RIGHT, TOP);
        text(x, currX - 5, 5);
    } 
    else {
        textAlign(CENTER, TOP);
        text(x, currX, 5);
    }
    push()
    stroke(200);
            line(
                x * this.scale,
                -this.dimension.y * this.scale,
                x * this.scale,
                this.dimension.y * this.scale
            );
        }
        pop()
     for (let y = -this.dimension.y; y <= this.dimension.y; y++) {

    const currY = y * this.scale;

    // Draw horizontal grid line
    line(
        -this.dimension.x * this.scale,
        currY,
        this.dimension.x * this.scale,
        currY
    );

    // Don't draw Y label for 0
    if (y === 0) {
        continue;
    }

    if (y === -this.dimension.y) {
        textAlign(RIGHT, BOTTOM);
        text(y, -5, -currY - 5);

    } else if (y === this.dimension.y) {
        textAlign(RIGHT, TOP);
        text(y, -5, -currY + 5);

    } else {
        textAlign(RIGHT, CENTER);
        text(y, -5, -currY);
    }
}
}     
        
    
plot(mouseX, mouseY) {

    // Canvas → Cartesian
    const x = (mouseX - this.xOffset) / this.scale;
    const y = (this.yOffset - mouseY) / this.scale;

    // Snap to nearest coordinate
    const snappedX = Math.round(x);
    const snappedY = Math.round(y);

    return createVector(snappedX, snappedY);
}


plotPoints() {

    this.points.forEach(vector => {

        push();

        stroke(100);
        strokeWeight(8);

        // Cartesian → Canvas
        point(
            vector.x * this.scale,
            -vector.y * this.scale
        );

        pop();

    });
}


addPoint(x, y) {

    this.points.push(
        createVector(x, y)
    );

}


getMouseCoordinate() {

    return this.plot(mouseX, mouseY);

}}