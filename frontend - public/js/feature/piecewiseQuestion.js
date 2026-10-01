import { Transportation } from "../class/transportation.js";
import { Piece } from "../class/PieceWise.js";
import { constraint } from "../helper/constraint.js";
const $debugDisplay = document.getElementById("debug")
const $questionTextDisplay = document.getElementById("display-text")
const $answerTextDisplay = document.getElementById("answer")
const $submitBtn = document.getElementById("submit-answer")
const $answerInput = document.getElementById("answer-input")
const $AnswerContainer = document.getElementById("answer-container")
const $studentName = document.getElementById("student-name")
const $sectionname = document.getElementById("section-name");
const $gradeLevel = document.getElementById("grade-level")
const $studentInformationForm = document.getElementById("student-information")
const $continueBtn = document.getElementById("continue")
const $stat = document.getElementById("stats")
const $questionCount = document.getElementById("question-count")
let currSession;

const dataTransportation = {
    transportation: [
        {
            vehicle: "Traditional Jeepney",
            baseDistance: 4,
            baseFare: 13,
            additionalFarePerKm: 2.00
        },
        {
            vehicle: "Modern Jeepney",
            baseDistance: 4,
            baseFare: 15,
            additionalFarePerKm: 2.50
        },
        {
            vehicle: "Bus",
            baseDistance: 5,
            baseFare: 15,
            additionalFarePerKm: 2.50
        },
        {
            vehicle: "Air-conditioned Bus",
            baseDistance: 5,
            baseFare: 18,
            additionalFarePerKm: 3.00
        },
        {
            vehicle: "Taxi",
            baseDistance: 2,
            baseFare: 50,
            additionalFarePerKm: 13.50
        },
        {
            vehicle: "UV Express",
            baseDistance: 4,
            baseFare: 20,
            additionalFarePerKm: 2.50
        },
        {
            vehicle: "Tricycle",
            baseDistance: 1,
            baseFare: 20,
            additionalFarePerKm: 5.00
        },
        {
            vehicle: "Motorcycle Taxi",
            baseDistance: 2,
            baseFare: 50,
            additionalFarePerKm: 10.00
        }
    ]
};
function createTransportation() {
    const d =  dataTransportation.transportation[constraint(0, dataTransportation.transportation.length-1)]
    const t = 
    new Transportation(
    d.vehicle,
    d.baseFare,
    d.baseDistance,
    d.additionalFarePerKm,
    constraint(8, 20)
);
    return t

    // $debugDisplay.innerHTML =
    //     JSON.stringify(transportation, null, 2) ;
}

// function newSession() {

//     // Randomly select a transportation data
//     const d = dataTransportation.transportation[
//         constraint(0, dataTransportation.transportation.length - 1)
//     ];

//     // Randomly generate the travel distance
//     const targetDistance = constraint(
//         d.baseDistance + 1,
//         20
//     );

//     // Create Transportation object
//     currSession = new Transportation(
//     d.vehicle,
//     d.baseFare,
//     d.baseDistance,
//     d.additionalFarePerKm,
//     targetDistance
// );

// $questionTextDisplay.innerHTML = currSession.TemplateQuestion;
// }

 function newSession(){
   try {
   
      $answerTextDisplay.innerHTML = ""
    //   $AnswerContainer.innerHTML = ""
      currSession = new Session();
    currSession.showSession()

   } catch (error) {
        $debugDisplay = `<pre>${error.message}</pre>`
   }
}
// class Session {
//     #_;
//     #answer;
//     #studentAnswer;
//     constructor(){
//         this.#_ = createTransportation()
//         this.#answer = this.#_.calculateFare()
//         this.#studentAnswer = null;
//         $submitBtn.addEventListener("click", ()=>{
//              this.#studentAnswer = $answerInput.value;
//              if(this.#checkAnswer()){
//                 $answerTextDisplay.innerHTML = `<h1>c   orrect</h1>
                
//                     ${this.#answer}
//                 `
//                 this.#showAnswer("correct", "the answer is")
                
//              }else{
//                  $answerTextDisplay.innerHTML = `<h1>incorrect</h1>
                
//                     ₱${this.#answer}
//                 `
//                 this.#showAnswer("incorrect", "")
//                 // const btn = document.createElement("button")

//                 // btn.onclick = newSession
//                 // btn.innerText = "next question"
//                 // $answerTextDisplay.appendChild(btn)
//              }
//              const btn = document.createElement("button")
//                 btn.onclick = newSession
//                 btn.innerText = "next question"
//                 $answerTextDisplay.appendChild(btn)
//         })


//     }
//     showSession(){
//         this.#showQuestion()
        
//     }
//     set studentAnswer(ans){
//         this.#studentAnswer = ans
//     }
//     #showQuestion(){
//         $questionTextDisplay.innerHTML = this.#_.templateQuestion()
//     }
//     #showAnswer(state, message){
//          $answerTextDisplay.innerHTML = `<h1> ${state}</h1> the answer is ${this.#answer} <br>`
//     }
//     #checkAnswer(){
//         return this.#answer == this.#studentAnswer
//     }
// }
// newSession()

class Session {
    #questions;
    #currentIndex;
    #studentAnswer;
    #SESSION_KEY;
    constructor() {
        this.#questions = [];
        this.#currentIndex = 0;
        this.#studentAnswer = null;
        this.#SESSION_KEY = "hello";
        this.#createQuestions();
        this.#setupSubmit();
        /**
         * sessionData [
         * {
         * question,
         * studentAnswer,
         * answer,
         * isCorrect,
         * itemNumber,
         * }
         * 
         * ]
         */
        const savedSession = localStorage.getItem(this.#SESSION_KEY);

    this.savedData = JSON.parse(localStorage.getItem(this.#SESSION_KEY))
    this.defaultData = {
        _ : [], // questions and answer
        sessionData : {
            studentName: "_",
            section: "_",
            gradeLevel: "_",
            score: 0,
            isSaved: false,
            isSessionDone: false
        } // session data, student name, section, final score
    }
    localStorage.removeItem(this.#SESSION_KEY);
    this.data = this.defaultData
    this.#questions.forEach(q => {
    this.data._.push(q.getQuestionAndAnswer());
});
    
    localStorage.setItem(this.#SESSION_KEY, JSON.stringify(this.data))
    
    this.__ = JSON.parse(localStorage.getItem(this.#SESSION_KEY))
    this._ = this.__._
       
      $debugDisplay.innerHTML = JSON.stringify(this.__)

    // JSON.stringify(this.#questions[1].getQuestionAndAnswer())
        // $debugDisplay.innerHTML 

        this.saveData()
        $studentInformationForm.hidden = this.data.sessionData.isSaved;
        document.getElementById("piecewise-information").hidden = !this.data.sessionData.isSaved;
    $continueBtn.onclick = () => {
        if(this.setSessionDataInData()){
                this.#questions = [];
                this.#currentIndex = 0;
                this.data._ = [];
                this.data.sessionData.score = 0;
                this.#createQuestions(Number($questionCount.value));
                this.#questions.forEach(q => this.data._.push(q.getQuestionAndAnswer()));
            this.data.sessionData.isSaved = true
            this.saveData()
            this.showStat()
            $studentInformationForm.hidden = true;
            document.getElementById("piecewise-information").hidden = false;
                this.#showQuestion()
        }
        
        }
    
    }

    
    getSaveData(){
        return localStorage.getItem(this.#SESSION_KEY)
    }

    
    #createQuestions(questionCount = 20) {
        for (let i = 0; i < questionCount; i++) {
            this.#questions.push(createTransportation());
        }
    }
    setSessionDataInData() {

    const studentName =
        $studentName.value.trim();

    const section =
        $sectionname.value.trim();

    const gradeLevel =
        $gradeLevel.value;

    const errors = [];

    if (!studentName) {
        errors.push("Student name is required.");
    }

    if (!section) {
        errors.push("Section is required.");
    }

    if (!gradeLevel) {
        errors.push("Grade level is required.");
    }

    if (errors.length > 0) {
        $debugDisplay.innerHTML =
            errors.join("<br>");

        return false;
    }

    this.data.sessionData.studentName =
        studentName;

    this.data.sessionData.section =
        section;

    this.data.sessionData.gradeLevel =
        gradeLevel;

    this.saveData();

    return true;
}
    saveData(){
        localStorage.setItem(this.#SESSION_KEY, JSON.stringify(this.data))
        $debugDisplay.innerHTML = JSON.stringify(this.data)
    }
    getSessionData(){
        return localStorage.getItem(this.#SESSION_KEY)
    }
    #setupSubmit() {
        $submitBtn.onclick = () => {
            if ($submitBtn.disabled) return;

            this.#studentAnswer = $answerInput.value;
            $submitBtn.disabled = true;
            this.#checkAnswer();
        };
    }
    showStat(){
        $stat.innerHTML = `
            <span>name: ${this.data.sessionData.studentName}</span> 
            <span>section: ${this.data.sessionData.section}</span> 
            <span>gradeLevel: ${this.data.sessionData.gradeLevel}</span>
        `
    }
    showSession() {
        this.#showQuestion();
    }

    #showQuestion() {
        const transportation = this.#questions[this.#currentIndex];

        $questionTextDisplay.innerHTML =
            `<strong>Question ${this.#currentIndex + 1} of ${this.#questions.length}</strong><br><br>
             ${transportation.templateQuestion()}`;

        $answerInput.value = "";
    $submitBtn.disabled = false;
        $answerTextDisplay.innerHTML = "";
    }

    #checkAnswer() {
        const transportation = this.#questions[this.#currentIndex];

        const correctAnswer = transportation.calculateFare();

        if (Number(this.#studentAnswer) === Number(correctAnswer)) {
            this.#showAnswer("Correct", correctAnswer);
            this.incrementScore()
        } else {
            this.#showAnswer("Incorrect", correctAnswer);
        }
    }
    incrementScore(){
        this.data.sessionData.score = Number(this.data.sessionData.score ) + 1
        this.saveData()
    }
    #showAnswer(state, answer) {
        $answerTextDisplay.innerHTML = `
            <div class="answer-feedback">
                <h3 class="answer-state ${state.toLowerCase()}">${state}</h3>
                <p class="answer-reveal">The answer is <strong>₱${answer}</strong></p>
            </div>
        `;

        const btn = document.createElement("button");
        btn.className = "answer-next";

        if (this.#currentIndex < this.#questions.length - 1) {
            btn.innerText = "Next Question";
            btn.onclick = () => {
                this.#currentIndex++;
                this.#showQuestion();
            };
        } else {
            btn.innerText = "Finish";
            btn.onclick = () => {
                this.#finishSession();
            };
        }

        $answerTextDisplay.appendChild(btn);
    }

    #finishSession() {
        $questionTextDisplay.innerHTML = `
            <div class="completion-summary">
                <p class="quiz-eyebrow">GRADE 11 MATHEMATICS</p>
                <h2>Quiz Completed</h2>
                <p>You completed ${this.#questions.length} questions.</p>
                <dl>
                    <div><dt>Student</dt><dd id="finish-student"></dd></div>
                    <div><dt>Section</dt><dd id="finish-section"></dd></div>
                    <div><dt>Grade</dt><dd id="finish-grade"></dd></div>
                    <div><dt>Score</dt><dd>${this.data.sessionData.score} / ${this.#questions.length}</dd></div>
                    <div><dt>Percentage</dt><dd>${Math.round(this.data.sessionData.score / this.#questions.length * 100)}%</dd></div>
                </dl>
            </div>
        `;

        $answerTextDisplay.innerHTML = "";
        document.getElementById("finish-student").textContent = this.data.sessionData.studentName;
        document.getElementById("finish-section").textContent = this.data.sessionData.section;
        document.getElementById("finish-grade").textContent = this.data.sessionData.gradeLevel;
        document.getElementById("answer-input-container").hidden = true;
        document.getElementById("answer-container").hidden = true;
    }
}
newSession()