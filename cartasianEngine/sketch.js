import { Plane } from "./js/engine/plane.js";

let plane;
let ctx;
let randomPoints = []
const $question = document.getElementById("question");
window.setup = function () {

    const container = document.getElementById("canvas-container");

    const size = Math.min(
        container.clientWidth,
        520
    );

    ctx = createCanvas(size, size);

    ctx.id("canvas");
    ctx.parent("canvas-container");

    plane = new Plane();

    createQuestion();
};
    // plane = new Plane();
    // const p = []
    // for(let i = 0; i < 5; i++){
    //     p.push(plane.randomPoint())
    // }
    // $question.innerHTML= p
window.draw = function () {
    background(255);

    // 1. Center the viewport origin 0,0 in the middle of the screen
    translate(width / 2, height / 2);

    // 2. LAYER IN DRAG OFFSETS: Shift your grid system space by mouse drag values
    // translate(plane.xOffset, plane.yOffset);

    // Render the grid background
    plane.axis();

    // FIX: Subtract center displacement parameters to align cursor position perfectly
    const translatedMX = mouseX - (width / 2) - plane.xOffset;
    const translatedMY = mouseY - (height / 2) - plane.yOffset;
    const coordinate = plane.plot(translatedMX, translatedMY);

    // Show tracking text layout
    fill(0);
    noStroke();
    textSize(14);
    text(
        `x: ${coordinate.x}, y: ${coordinate.y}`,
        coordinate.x * plane.scale + 10,
        -coordinate.y * plane.scale - 10
    );

    // Draw interactive tracking guide mouse dot
    push();
    strokeWeight(10);
    stroke(0, 150, 255); // Nice bright blue color tracking dot
    point(
        coordinate.x * plane.scale,
        -coordinate.y * plane.scale
    );
    pop();

    // Draw permanent dots array onto the screen
    plane.plotPoints();
};

window.mouseClicked = function () {
    // Apply matching offset logic to clicking captures
    const translatedMX = mouseX - (width / 2) - plane.xOffset;
    const translatedMY = mouseY - (height / 2) - plane.yOffset;
    const coordinate = plane.plot(translatedMX, translatedMY);

    // Prevent saving out of bounds context if desired
    if(Math.abs(coordinate.x) <= plane.dimension.x && Math.abs(coordinate.y) <= plane.dimension.y) {
        plane.addPoint(coordinate.x, coordinate.y);
    }
};


function createQuestion() {
    randomPoints = [];
    plane = new Plane

    for (let i = 0; i < 5; i++) {
        randomPoints.push(plane.randomPoint());
    }

    renderQuestion();

}function renderQuestion() {

    const pointsHTML = randomPoints
        .map(point => `(${point.x}, ${point.y})`)
        .join(", ");

    $question.innerHTML = `
        <div class="quiz-header">
            <p class="eyebrow">CARTESIAN PLANE</p>

            <h1>Coordinate Challenge</h1>

            <p class="description">
                Plot all the given points on the coordinate plane.
            </p>
        </div>

        <div class="target-point">
            <span class="point-label">POINTS</span>

            <span class="coordinate">
                ${pointsHTML}
            </span>
        </div>

        <p id="feedback"></p>

        <div class="button-group">
            <button
                type="button"
                id="check-answer"
                class="submit-button"
            >
                Check Points
            </button>

            <button
                type="button"
                id="next-question"
                class="next-button"
            >
                Next Question
            </button>
        </div>
    `;

    document
        .getElementById("check-answer")
        .addEventListener("click", checkPoint);

    document
        .getElementById("next-question")
        .addEventListener("click", createQuestion);
}
function checkPoint() {
    const $feedback = document.getElementById("feedback");

    if (plane.points.length === 0) {
        $feedback.textContent = "Plot a point first.";
        $feedback.className = "feedback error";
        return;
    }

    let correctCount = 0;

    plane.points.forEach(point => {

        // Check if this plotted point exists
        // anywhere in the random target points
        const matchingTarget = randomPoints.find(target =>
            point.x === target.x &&
            point.y === target.y
        );

        point.correct = matchingTarget !== undefined;

        if (point.correct) {
            correctCount++;
        }
    });

    const wrongCount =
        plane.points.length - correctCount;

    $feedback.textContent =
        `${correctCount} correct, ${wrongCount} incorrect.`;

    $feedback.className =
        wrongCount === 0
            ? "feedback success"
            : "feedback error";
}

function checkAnswer(event) {
    event.preventDefault();

    const $answer = document.getElementById("answer");
    const $feedback = document.getElementById("feedback");

    const enteredLines = $answer.value.trim().split(/\n+/);

    if (enteredLines.length !== randomPoints.length) {
        $feedback.textContent =
            "Please enter all five coordinate pairs.";
        $feedback.className = "feedback error";
        return;
    }

    const parsedAnswers = enteredLines.map(line => {
        const match = line.match(
            /^\s*[A-E]\s*:\s*\(?\s*(-?\d+)\s*,\s*(-?\d+)\s*\)?\s*$/i
        );

        return match
            ? { x: Number(match[1]), y: Number(match[2]) }
            : null;
    });

    if (parsedAnswers.some(answer => answer === null)) {
        $feedback.textContent =
            "Use the format A: (x, y), one point per line.";
        $feedback.className = "feedback error";
        return;
    }

    const correct = parsedAnswers.every((answer, index) => {
        const point = randomPoints[index];
        return answer.x === point.x && answer.y === point.y;
    });

    if (correct) {
        $feedback.textContent = "Correct! All coordinates match.";
        $feedback.className = "feedback success";
    } else {
        $feedback.textContent =
            "Some coordinates are incorrect. Check the graph and try again.";
        $feedback.className = "feedback error";
    }
}