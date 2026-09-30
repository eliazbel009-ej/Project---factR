class Plane {
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

        //  zoom value never drops below this dynamic boundary constraint
        this.zoom = Math.max(this.zoom, this.minZoom);
        this.scale = (width / (this.dimension.x * 2)) * this.zoom;
        
    }
    axis() {
    
    ctx.save(); // Equivalent to push()
    
    // --- Vertical Grid Lines & X-Labels ---
    for (let x = -this.dimension.x; x <= this.dimension.x; x++) {
        const currX = x * this.scale;

        // Font and text alignment mapping
        ctx.font = "6px sans-serif"; // Equivalent to textSize(6)
        ctx.fillStyle = "#000000";   // Default text color

        // Handle textAlign equivalents
        if (x === -this.dimension.x) {
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            ctx.fillText(x, currX + 5, 5);
        } 
        else if (x === this.dimension.x) {
            ctx.textAlign = "right";
            ctx.textBaseline = "top";
            ctx.fillText(x, currX - 5, 5);
        } 
        else {
            ctx.textAlign = "center";
            ctx.textBaseline = "top";
            ctx.fillText(x, currX, 5);
        }

        // Draw vertical line with stroke(200) equivalent (rgb(200, 200, 200))
        ctx.strokeStyle = "rgb(200, 200, 200)";
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.moveTo(x * this.scale, -this.dimension.y * this.scale);
        ctx.lineTo(x * this.scale, this.dimension.y * this.scale);
        ctx.stroke();
    }

    // --- Horizontal Grid Lines & Y-Labels ---
    for (let y = -this.dimension.y; y <= this.dimension.y; y++) {
        const currY = y * this.scale;

        // Draw horizontal grid line
        ctx.strokeStyle = "rgb(200, 200, 200)";
        ctx.lineWidth = 1;
        
        ctx.beginPath();
        ctx.moveTo(-this.dimension.x * this.scale, currY);
        ctx.lineTo(this.dimension.x * this.scale, currY);
        ctx.stroke();

        // Don't draw Y label for 0
        if (y === 0) {
            continue;
        }

        ctx.font = "6px sans-serif";
        ctx.fillStyle = "#000000";

        if (y === -this.dimension.y) {
            ctx.textAlign = "right";
            ctx.textBaseline = "bottom";
            ctx.fillText(y, -5, -currY - 5);
        } 
        else if (y === this.dimension.y) {
            ctx.textAlign = "right";
            ctx.textBaseline = "top";
            ctx.fillText(y, -5, -currY + 5);
        } 
        else {
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillText(y, -5, -currY);
        }
    }

    ctx.restore(); // Equivalent to pop()
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

class Linear extends Plane{
    constructor(){
        
    }
    generateRandomLine(){
        for(let x = -2; x < 2;x++){
           this.addPoint(x, x + 2)
        }   const y = x + constrain(-this.dimension.x, this.dimension.x)
    }
}