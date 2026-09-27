import { Plane } from "./js/engine/plane.js";

let plane;
let scrollPos;
window.setup = function () {
    createCanvas(1920, 1920);

    plane = new Plane();
};


window.draw = function () {

    background(255);

    translate(width / 2, height / 2);

    plane.axis();

    // Get snapped mouse coordinate
    const coordinate = plane.plot(mouseX, mouseY);

    // Show coordinate
    text(
        `x: ${coordinate.x}, y: ${coordinate.y}`,
        coordinate.x * plane.scale - 5,
        -coordinate.y * plane.scale
    );

    // Show current mouse position
    push();

    strokeWeight(5);
    stroke(0);

    point(
        coordinate.x * plane.scale,
        -coordinate.y * plane.scale
    );

    pop();

    
    // Draw all saved points
    plane.plotPoints();
};


window.mouseClicked = function () {

    const coordinate = plane.plot(mouseX, mouseY);

    plane.addPoint(
        coordinate.x,
        coordinate.y
    );

};
