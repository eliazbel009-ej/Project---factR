const $question = document.getElementById("question");


export class Plane {
    constructor() {
        this.dimension = {
            x: 10,
            y: 10
        };
        /**
         * A vector (list) containing the points plotted on the Cartesian plane.
         *
         * Each point stores its position using x and y coordinates.
         */
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
    // Calculate how far the mouse has dragged since the previous frame
    let targetX = this.xOffset + (mouseX - pmouseX);
    let targetY = this.yOffset + (mouseY - pmouseY);

    // Calculate the maximum distance the center point can slide
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



    export class Session extends Plane{
    constructor(){
        super()
        this.randomPoints = []
    }
     renderQuestion(){
        const pointsHTML = this.randomPoints
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

    // document
    //     .getElementById("check-answer")
    //     .addEventListener("click", ()=> this.checkPoint());
     }
     
   

    checkPoint(){
        const $feedback = document.getElementById("feedback");

    if (this.points.length === 0) {
        $feedback.textContent = "Plot a point first.";
        $feedback.className = "feedback error";
        return;
    }

    let correctCount = 0;

    this.points.forEach(point => {

        // Check if this plotted point exists
        // anywhere in the random target points
        const matchingTarget = this.randomPoints.find(target =>
            point.x === target.x &&
            point.y === target.y
        );

        point.correct = matchingTarget !== undefined;

        if (point.correct) {
            correctCount++;
        }
    });

    const wrongCount =
        this.points.length - correctCount;

    $feedback.textContent =
        `${correctCount} correct, ${wrongCount} incorrect.`;

    $feedback.className =
        wrongCount === 0
            ? "feedback success"
            : "feedback error";


    }
  
    
}
export class RandomizedPoint extends Plane{
    constructor(){
       super()
       this.randomPoints = []
       this.$question = document.getElementById("question");
       this.plane = null
    }
    createQuestion(){
        randomPoints = [];
        this.plane = new RandomizedPoint
    
        for (let i = 0; i < 5; i++) {
            randomPoints.push(this.randomPoint());
        }
    
        this.renderQuestion();
    }
    renderQuestion(){
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
        .addEventListener("click", this.checkPoint);

    document
        .getElementById("next-question")
        .addEventListener("click", this.createQuestion);

    }
    checkPoint(){
        const $feedback = document.getElementById("feedback");

    if (this.points.length === 0) {
        $feedback.textContent = "Plot a point first.";
        $feedback.className = "feedback error";
        return;
    }

    let correctCount = 0;

    this.points.forEach(point => {

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
        this.points.length - correctCount;

    $feedback.textContent =
        `${correctCount} correct, ${wrongCount} incorrect.`;

    $feedback.className =
        wrongCount === 0
            ? "feedback success"
            : "feedback error";


    }
  
}
export class Quadratic extends Session{}

export class Linear extends Session{
    constructor(){
        super()
        this.randomLinearPoints= []
        this.generateLinearPoints()
    }
    generateLinearPoints(){
        let h = constraint(-3, 3) 
        h = h == 0 ? 1 : h
        const c = this.dimension.y - (h*h) - 1
        const n =  constraint(-c , c) 
        console.log(h, n );
        
        
        const y  = (x) => x *  h + n
        for(let x = -2; x <= 2;x++){
            this.randomLinearPoints.push(createVector(x,y(x)))
            this.addPoint(x,y(x))
            this.randomPoints.push(createVector(x,y(x)))
            console.log("x: " + x,"y: "+ y(x));
            
        }
       
        
        
    }
    createQuestion(){
        console.log(this.points);
        // this.resetPlaneState()
        this.generateLinearPoints()
        this.renderQuestion()
        
        
    }

}


function constraint(c1, c2){
    // check if c1 and c2 have valid value
    if((c1.length === 0 || c1 === null) ||  (c2.length === 0 || c2 === null)){
        return 0;
    }
    if(c1 > c2){
        return 0;
    }

    return Math.floor(Math.random() * (Math.floor(c2)-Math.ceil(c1)+1) )+ Math.ceil(c1)
}
export class Quiz{
    constructor(){
        this.activeInstance = null
        this.currentMode = "linear"
        // this.setupListener()
        this.startNewQuiz()
    }
    startNewQuiz(){
        console.log('hello');
        
        if(this.activeInstance){
            this.activeInstance = null
        }

        if (this.currentMode === 'random') {
            this.activeInstance = new RandomizedPoint();
        } else if (this.currentMode === 'linear') {
            this.activeInstance = new Linear();
        } else if(this.currentMode === 'quadratic') {
            this.activeInstance = new Quadratic();
        }
        this.activeInstance.renderQuestion()

        /**
         * 
         *  <div class="button-group">
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
         */

        // const div = document.createElement("div")
        // div.classList.add("button-group")
        // const chkBtn = document.createElement("button")
        // chkBtn.classList.add("submit-button")
        // chkBtn.id = "check-answer"
        // chkBtn.textContent = "check points"
        // const nxtBtn = document.createElement("button")
        // nxtBtn.classList.add("next-button")
        // nxtBtn.textContent = "next question" 
        // nxtBtn.id = "next-button"

        // div.appendChild(chkBtn)
        // div.appendChild(nxtBtn)
        // $question.appendChild(div)
        // const $nextBtn = document.getElementById("next-question");
        // if ($nextBtn) {
        //     $nextBtn.addEventListener("click", () => this.startNewQuestion(), { once: true });
        // }
    }
    setupListener(){
        const $parent = $question

        // Listen to the parent container permanently
        $parent.addEventListener("click", (event) => {
            // Check if the clicked element was the "Check Points" button
            if (event.target.id === "check-answer" && this.activeInstance) {
                
                this.activeInstance.checkPoint();
            }

            // Check if the clicked element was the "Next Question" button
            if (event.target.id === "next-question") {
                this.startNewQuiz(); // Destroys old plane, boots up a fresh one!
            }
        });
    }
    instance(){
        return this.activeInstance
    }
}