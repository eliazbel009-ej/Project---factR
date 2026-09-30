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
         $studentInformationForm.style.display = this.data.sessionData.isSaved ? "none" : "flex"
    $continueBtn.onclick = () => {
        if(this.setSessionDataInData()){
            this.data.sessionData.isSaved = true
            this.saveData()
            this.showStat()
            $studentInformationForm.style.display = 'none'
        }
        
        }
    
    }

    
    getSaveData(){
        return localStorage.getItem(this.#SESSION_KEY)
    }

    
    #createQuestions() {
        for (let i = 0; i < 20; i++) {
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
            this.#studentAnswer = $answerInput.value;

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
            <h1>${state}</h1>
            The answer is ₱${answer}
        `;

        const btn = document.createElement("button");

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
            <h1>Session Complete</h1>
            <p>You have completed all 20 questions.</p>
            <strong>${this.data.sessionData.score}/20</strong>
            
        `;

        $answerTextDisplay.innerHTML = "";
    }
}
newSession()