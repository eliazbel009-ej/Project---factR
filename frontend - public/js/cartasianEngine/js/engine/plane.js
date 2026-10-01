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

            <p id="question-progress" class="question-progress"></p>

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
     
   

   checkPoint() {
    const $feedback = document.getElementById("feedback");

    if (this.points.length === 0) {
        $feedback.textContent = "Plot a point first.";
        $feedback.className = "feedback error";
        return null;
    }

    let correctCount = 0;

    this.points.forEach(point => {
        const matchingTarget = this.randomPoints.find(target =>
            point.x === target.x && point.y === target.y
        );
        point.correct = matchingTarget !== undefined;
        if (point.correct) correctCount++;
    });

    const wrongCount = this.points.length - correctCount;

    const isComplete = correctCount === this.randomPoints.length && wrongCount === 0;
    $feedback.textContent = `${correctCount} of ${this.randomPoints.length} target points correct; ${wrongCount} incorrect.`;
    $feedback.className = isComplete ? "feedback success" : "feedback error";

    return {
        correct: correctCount,
        wrong: wrongCount,
        total: this.randomPoints.length
    };
}
  
    
}
export class RandomizedPoint extends Session{
    constructor(){
       super()
      this.generateRandomPoints()
    }
    generateRandomPoints(){
        for (let i = 1 ; i <= 5; i++) {
            const r = createVector(
                constraint(-( this.dimension.x - 1), this.dimension.x - 1),
                constraint(-( this.dimension.y - 1), this.dimension.y- 1)
            )
        
            this.randomPoints.push(r) ;
        }
    }
    createQuestion(){
        this.generateRandomPoints()
        this.renderQuestion();
    }

  
  
}
export class Quadratic extends Session{
    constructor(){
        super()
        this.generateQuadraticPoints()
        this.v = 4
    }
    generateQuadraticPoints(){
        let unary = constraint(-1,1)
        unary = unary == 0 ? 1 : unary
        let k, h;
        if(unary == 1){
            k = constraint(-9,5)
            h = constraint(-7,7)
        }else{
            h = constraint(-7,7)
            k = constraint(-5, 9)
        }

        let y = (x)=> x*x 
        for(let x = -2; x <= 2; x++){
            let hx = x + h
            this.randomPoints.push(createVector(hx, unary*y(x) + k))
        }

        
    }
    createQuestion(){
        this.generateQuadraticPoints()
        this.renderQuestion()
    }
}



export class LinearAbsolute extends Session{
    constructor(){

        super()
        this.randomAbsoluteLinearPoints = []
        this.v = 4
        this.generateAbsoluteLinearPoints()
    }
    generateAbsoluteLinearPoints(){
        /**
         * The slope value constrained within the plane's
         * minimum and maximum coordinate range.
         */
        let s = constraint(-this.v, this.v) 
        // make h 1 if 0, 
        s = s == 0 ? 1 : s

        /**
         * The maximum vertical intercept range based on
         * the plane dimensions and the selected slope.
         */
        const c = this.dimension.y - (s*s) - 2

        /**
         * The maximum vertical intercept range based on
         * the plane dimensions and the selected slope.
         */
        const n =  constraint(-c , c) 
        // console.log(h, n );
        /**
         * Represents the linear function using the
         * selected slope and vertical intercept.
         *
         * @param {number} x - The x-coordinate.
         * @returns {number} The corresponding y-coordinate.
         */
        const y  = (x) => Math.abs(x *  s) + n
        let k;
        let h = constraint(-7, 7);
        let unary = constraint(-1, 1)
        unary = unary == 0 ? 1: unary
        for(let x = -2; x <= 2;x++){
            this.randomAbsoluteLinearPoints.push(createVector(x,y(x)))
            this.randomPoints.push(createVector(x, unary * y(x)))
            console.log("x: " + x,"y: "+ y(x));
            
        }
       
    }
    createQuestion(){
        this.generateAbsoluteLinearPoints()
        this.renderQuestion()
    }

    
}
export class Linear extends Session{
    constructor(){
        super()
        this.randomLinearPoints= []
        this.generateLinearPoints()
        this.v = 4
    }
    generateLinearPoints(){
        /**
         * The slope value constrained within the plane's
         * minimum and maximum coordinate range.
         */
        let h = constraint(-4, 4) 
        // make h 1 if 0, 
        h = h == 0 ? 1 : h

        /**
         * The maximum vertical intercept range based on
         * the plane dimensions and the selected slope.
         */
        const c = this.dimension.y - (h*h) - 1

        /**
         * The maximum vertical intercept range based on
         * the plane dimensions and the selected slope.
         */
        const n =  constraint(-c , c) 
        // console.log(h, n );
        /**
         * Represents the linear function using the
         * selected slope and vertical intercept.
         *
         * @param {number} x - The x-coordinate.
         * @returns {number} The corresponding y-coordinate.
         */
        const y  = (x) => x *  h + n
        for(let x = -2; x <= 2;x++){
            this.randomLinearPoints.push(createVector(x,y(x)))
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
        this.currentMode = "random" 
       
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
        } else if(this.currentMode === "linearAbsolute"){
            this.activeInstance = new LinearAbsolute();
            
        } 
        
        else if(this.currentMode === 'quadratic') {
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