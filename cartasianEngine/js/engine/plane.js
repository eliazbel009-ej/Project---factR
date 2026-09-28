export class Plane {
    constructor() {
        this.dimension = {
            x: 10,
            y: 10
        };
        this.points = []
        this.zoom = 0.7;
        this.defaultZoom()

        this.xOffset = 0;
        this.yOffset = 0;
        this.zoomScalar = 0.05
        this.scale = width/this.scalar;
        this.scale = (width / (this.dimension.x * 2)) * this.zoom;
        this.isDragging = false;
        this.startX = 0;
        this.startY = 0;
        this.enableZooming = true
        this.enablePanning = true
    }
defaultZoom(){
    this.zoom = 1
}
pan() {
    // 1. Calculate how far the mouse has dragged since the previous frame
    let targetX = this.xOffset + (mouseX - pmouseX);
    let targetY = this.yOffset + (mouseY - pmouseY);

    // 2. Calculate the maximum distance the center point can slide
    // before the outer boundaries of your grid hit the edges of the canvas screen.
    const maxPanX = (this.dimension.x * this.scale) - (width / 2);
    const maxPanY = (this.dimension.y * this.scale) - (height / 2);

    // 3. Keep the plane locked inside boundaries relative to center (0,0)
    // If zoomed out far (maxPan is negative), lock it perfectly at 0 (center)
    this.xOffset = maxPanX > 0 ? constrain(targetX, -maxPanX, maxPanX) : 0;
    this.yOffset = maxPanY > 0 ? constrain(targetY, -maxPanY, maxPanY) : 0;
    this.pointsToPlot = []
}
    zoomOut(){
        this.zoom += this.zoomScalar
        this.zoom = Math.min(this.zoom, 3.0); 
    }

    zoomIn(){
        this.zoom -= this.zoomScalar
        this.zoom = Math.max(this.zoom, 0.15); 

    }
    updateZoom(){
            this.minZoom = 0.5; 

    // 2. Ensure your zoom value never drops below this dynamic boundary constraint
    this.zoom = Math.max(this.zoom, this.minZoom);


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
        
    
   plot(mx, my) {
        // FIX: Clean mapping from raw screen values to snapping coordinates
        const x = mx / this.scale;
        const y = -my / this.scale; // Inverted because canvas standard pixels run downwards

        const snappedX = Math.round(x);
        const snappedY = Math.round(y);

        return createVector(snappedX, snappedY);
    }
    randomPoint() {

        const x = Math.floor(Math.random() * (this.dimension.x * 2 + 1)) - this.dimension.x;
        const y = Math.floor(Math.random() * (this.dimension.y * 2 + 1)) - this.dimension.y;
        // this.pointsToPlot.push(createVector(x,y))
        return createVector(x,y)
    }
    drawPoints() {

    this.points.forEach(point => {

        const x = point.x * this.scale;
        const y = -point.y * this.scale;

        if (point.correct === true) {
            fill(0, 180, 80);      // correct
        } else if (point.correct === false) {
            fill(220, 40, 40);     // wrong
        } else {
            fill(0);               // not checked yet
        }

        noStroke();

        circle(x, y, 12);
    });
}

// plotPoints() {

//     this.points.forEach(vector => {

//         push();

//         stroke(100);
//         strokeWeight(8);

//         // Cartesian → Canvas
//         point(
//             vector.x * this.scale,
//             -vector.y * this.scale
//         );

//         pop();

//     });
// }
plotPoints() {
    this.points.forEach(point => {
        const x = point.x * this.scale;
        const y = -point.y * this.scale;

        push();

        noStroke();

        if (point.correct === true) {
            // Correct point
            fill(0, 180, 80);
        } else if (point.correct === false) {
            // Wrong point
            fill(220, 40, 40);
        } else {
            // Not checked yet
            fill(100);
        }

        circle(x, y, 12);

        pop();
    });
}

addPoint(x, y) {

    this.points.push(
        createVector(x, y)
    );

}


  getMouseCoordinate() {
        // This helper should match the updated plot input calculations
        const translatedMX = mouseX - (width / 2) - this.xOffset;
        const translatedMY = mouseY - (height / 2) - this.yOffset;
        return this.plot(translatedMX, translatedMY);
    }}