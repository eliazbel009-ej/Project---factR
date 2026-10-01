import { Linear, Plane, Quiz } from "./js/engine/plane.js";

let plane;
let ctx;
let randomPoints = []
let m
let currMode
const $question = document.getElementById("question");
let score = 0;
let quizeIndex = 0 ; 
let isQuizing = false
window.setup = function () {

    const container = document.getElementById("canvas-container");
    score = 0
    quizeIndex = 1
    const size = Math.min(
        container.clientWidth,
        520
    );

    ctx = createCanvas(size, size);

    ctx.id("canvas");
    ctx.parent("canvas-container");
    m = new Quiz()
    // plane = m.instance();
    setupQuizControls();

    // 2. Start the first question cycle
    startNewGameRound();
    currMode = document.getElementById("menu-option").value
    // createQuestion();
    // plane.renderQuestion()
    // plane.generateLinearPoints()

};
    // plane = new Plane();
    // const p = []
    // for(let i = 0; i < 5; i++){
    //     p.push(plane.randomPoint())
    // }
    // $question.innerHTML= p
function startNewGameRound() {
    // True Option 2 Reset: Re-instantiate the session via the manager
    // This cleanly completely resets zoom, offsets, and points state
    if(!isQuizing){
        hide_()
        show$()
    }
    quizeIndex++
    const quizAmount =5
    if(quizeIndex ==quizAmount){

        
    }
    m.startNewQuiz()
    plane = m.instance(); 
    
    // Generate data and build the HTML inside $question
    // plane.createQuestion(); 
}
function hide_(){
    $question.classList.add("hide")
    document.getElementById("canvas-container").classList.add("hide")
}
function show$(){
    
}
function show_(){
     $question.classList.remove("hide")
    document.getElementById("canvas-container").classList.remove("hide")
}

function setupQuizControls() {
    // Listen to the permanent parent container. It catches button clicks even when 
    // the inner HTML is completely blown away and rebuilt!
    $question.addEventListener("click", (event) => {
        
        // Match the "Check Points" Button click
        if (event.target.id === "check-answer") {
            plane.checkPoint();
        }

        // Match the "Next Question" Button click
        if (event.target.id === "next-question") {
            startNewGameRound(); // discard old plane and boot new plane instance
        }
    //     if(event.target.id === "menu-option"){
    //        if(event.target.value){
    //          m.currentMode = event.target.value
    //           let t = event.target.value
    //         startNewGameRound()
    //         document.getElementById(event.target.id).value = t
    //        }
    //     }

        if (event.target.id === "menu-option") {
    const mode = event.target.value;

    if (!mode) return;

    m.currentMode = mode;

    startNewGameRound();
}
    });
    

}
window.draw = function () {
    background(255);
    // const mouse = getCanvasMouse(window.event);

    // Center the viewport origin 0,0 in the middle of the screen
    translate(width / 2, height / 2);

    //  LAYER IN DRAG OFFSETS: Shift your grid system space by mouse drag values
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
    
    // console.log(plane.points[0].y);
    
};

window.mouseClicked = function () {
    // Apply matching offset logic to clicking captures
    const translatedMX = mouseX - (width / 2) - plane.xOffset;
    const translatedMY = mouseY - (height / 2) - plane.yOffset;
    const coordinate = plane.plot(translatedMX, translatedMY);

    // Prevent saving out of bounds context if desired
     if (
        Math.abs(coordinate.x) <= plane.dimension.x &&
        Math.abs(coordinate.y) <= plane.dimension.y
    ) {
        const index = plane.points.findIndex(
            p => p.x === coordinate.x &&
                 p.y === coordinate.y
        );

        if (index !== -1) {
            // Point already exists → remove it
            plane.points.splice(index, 1);
        } else {
            // Point does not exist → add it
            plane.addPoint(coordinate.x, coordinate.y);
        }
    }
};


function createQuestion() {
    randomPoints = [];
    plane = new Linear

    for (let i = 0; i < 5; i++) {
        randomPoints.push(plane.randomPoint());
    }

    renderQuestion();

}
function renderQuestion() {

    const pointsHTML = randomPoints
        .map(point => `(${point.x}, ${point.y})`)
        .join(", <br>");

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

