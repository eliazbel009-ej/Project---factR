import { DataSet } from "../class/Dataset.js";
import { StandardDeviation } from "../class/StandardDeviation.js";

let $question = document.getElementById("question");
let $studentAnswer = document.getElementById("studentAnswer");
let $answer = document.getElementById("answer");
let $dataset = document.getElementById("dataset")
const $name = document.getElementById("name")
const $gradeAndSection = document.getElementById("grade-section")
const $topic = document.getElementById("topic");
let currQuizNum = 1
let questionAmount = 5


const $initialize = document.getElementById("initialize");
const $quiz = document.getElementById("quiz");
const $startQuizBtn = document.getElementById("startQuizBtn");

$startQuizBtn.addEventListener("click", () => {
    if($topic.value){
        $initialize.hidden = true;
    $quiz.hidden = false;

    startQuiz($topic.value);
    }
});
// const standardDeviationSituations = [
//     {
//         sample : {
//             grades : [
//                 {
//                     /**
//                      * context : give the context of the situation, a teacher recorded students score   
//                      */
//                     context: "",
//                     setting: "",
//                     targetVariable: "",
//                     unit: ""
//                 }
//             ]
//         },
//         population: {

//         }
//     }
// ]
const standardDeviationSituations = [
    {
        sample: {
            grades: [
                {
                    context: "Mathematics teacher",
                    setting: "Grade 11 class",
                    targetVariable: "quiz scores",
                    unit: "points"
                }
            ],

            travelTime: [
                {
                    context: "school researcher",
                    setting: "Grade 11 students",
                    targetVariable: "travel time to school",
                    unit: "minutes"
                }
            ],

            sleep: [
                {
                    context: "school researcher",
                    setting: "Grade 11 students",
                    targetVariable: "hours of sleep",
                    unit: "hours"
                }
            ]
        },

        population: {
            grades: [
                {
                    context: "Mathematics teacher",
                    setting: "Grade 11 class",
                    targetVariable: "quiz scores",
                    unit: "points"
                }
            ],

            travelTime: [
                {
                    context: "school researcher",
                    setting: "Grade 11 class",
                    targetVariable: "travel time to school",
                    unit: "minutes"
                }
            ],

            sleep: [
                {
                    context: "Grade 11 adviser",
                    setting: "Grade 11 class",
                    targetVariable: "hours of sleep",
                    unit: "hours"
                }
            ]
        }
    }
];
class statistic {
    constructor() {
        this.situations = this.situations = [
            {
                context: "school nurse",
                setting: "Grade 10 students",
                targetVariable: "weight in kilograms",
                amount: 25,
                unit: "kg",
                constraints: { min: 40, max: 85 },
                isPopulation: false // Sample
            },
            {
                context: "science teacher",
                setting: "Grade 11 students",
                targetVariable: "scores in the summative exam",
                amount: 30,
                unit: "points",
                constraints: { min: 10, max: 50 },
                isPopulation: true // Population
            },
            {
                context: "PE instructor",
                setting: "Grade 12 students",
                targetVariable: "height in centimeters",
                amount: 20,
                unit: "cm",
                constraints: { min: 145, max: 185 },
                isPopulation: false
            },
            {
                context: "guidance counselor",
                setting: "Junior High School students",
                targetVariable: "daily allowance in pesos",
                amount: 24,
                unit: "pesos",
                constraints: { min: 50, max: 300 },
                isPopulation: true
            },
            {
                context: "school librarian",
                setting: "Grade 9 students",
                targetVariable: "weekly reading hours",
                amount: 22,
                unit: "hours",
                constraints: { min: 1, max: 15 },
                isPopulation: false
            },
            {
                context: "computer teacher",
                setting: "ICT students",
                targetVariable: "typing speed in words per minute",
                amount: 25,
                unit: "wpm",
                constraints: { min: 20, max: 80 },
                isPopulation: true
            },
            {
                context: "math professor",
                setting: "algebra students",
                targetVariable: "quiz completion time",
                amount: 24,
                unit: "minutes",
                constraints: { min: 5, max: 30 },
                isPopulation: false
            },
            {
                context: "school researcher",
                setting: "Senior High School students",
                targetVariable: "number of books borrowed per semester",
                amount: 20,
                unit: "books",
                constraints: { min: 0, max: 12 },
                isPopulation: true
            },
            {
                context: "health researcher",
                setting: "high school students",
                targetVariable: "daily screen time",
                amount: 24,
                unit: "hours",
                constraints: { min: 4, max: 10 },
                isPopulation: false
            },
            {
                context: "arts teacher",
                setting: "Grade 11 students",
                targetVariable: "digital art project scores",
                amount: 20,
                unit: "points",
                constraints: { min: 70, max: 100 },
                isPopulation: true
            }
        ];
        this._dataset = null;
        this._standardDev = null;
        this.curSituation = this.getRandomSituation()
        // this.sd = new StandardDeviation(this.dataset)
        // $question.innerHTML = this.sd.population()
        // $answer.innerHTML ="k"


    }
    getRandomSituation() {
        const randomIndex = constraint(0, this.situations.length - 1);
        return this.situations[randomIndex];
    }
    //     generateDataset(sit) {
    //     let data = [];
    //     for (let i = 0; i < sit.amount; i++) {
    //         // Uses your custom constraint function for each data point
    //         let val = this.constraint(sit.constraints.min, sit.constraints.max);
    //         data.push(val);
    //     }
    //     return data;
    // }
    question() {
        // $answer.innerHTML ="ssA"
        // this.dataset()
        // a "school researcher" "recorded the travel time to school" of "amount" "grade 11 students". these student represent a random sample of the group.Calculate the sample standard deviation of the following dataset:
        return `A ${this.curSituation.context} recorded the ${this.curSituation.targetVariable} of ${this.curSituation.amount} ${this.curSituation.setting}. These students represent a random sample of the group. Calculate the sample standard deviation of the following dataset:`;
        // return `A ${situation.context} of  ${situation.targetVariable} for ${numberOfObservations} ${situation.setting}. These ${situation.setting} represent ${situation.populationType} of the group. Calculate the standard deviation of the following dataset:`;
        // return `A ${situation.context} recorded ${situation.targetVariable} from ${this.numberOfSubjects} subjects in a ${situation.setting}. These subjects represent ${situation.populationType} of the group. Calculate the standard deviation of the following dataset:`;
    }
    generateStandardDeviation() {
        this._standardDev = new StandardDeviation(this._dataset)
        return this
    }
    getStandarddeviation() {
        return this._standardDev
    }
    // generateDataset(){
    //     let data=[]
    //     for(let i = 0; i < this.situation.amount; i++){
    //         data.push(constraint(10, 50))
    //     }
    //     this._dataset = new DataSet(data)
    //     console.log(this._dataset.mean())

    //     // this._dataset = new DataSet(data)
    //     // $studentAnswer.innerHTML = `<h1>${data}</h1>`
    //     return this
    // }
    generateDataset() {
        let data = [];

        // Grab the min and max constraints from the current situation
        const min = this.curSituation.constraints.min;
        const max = this.curSituation.constraints.max;

        for (let i = 0; i < this.curSituation.amount; i++) {
            data.push(constraint(min, max));
        }

        this._dataset = new DataSet(data);
        console.log(this._dataset.mean());

        return this;
    }
    getDataSet() {
        return this._dataset
    }

    isMeanCorrect(mean) {
        console.log(mean);

        return roundDecimals(this._dataset.mean(), 2) == mean
    }
    isMedianCorrect(median) {
        return this._dataset.median() == median;
    }

    isModeCorrect(modeInput) {
        // Get the actual mode(s) from your dataset as an array, converted to numbers and sorted
        const actualModes = [].concat(this._dataset.mode()).map(Number).sort((a, b) => a - b);

        // Parse the user's input (handles both single numbers and comma-separated lists like "15, 26")
        const userModes = String(modeInput)
            .split(',')
            .map(m => Number(m.trim()))
            .filter(m => !isNaN(m))
            .sort((a, b) => a - b);

        // Check if lengths match and every value matches
        if (actualModes.length !== userModes.length) return false;
        return actualModes.every((val, index) => val === userModes[index]);
    }

    isPopulationStandardDeviationCorrect(Pdv) {
        return this._standardDev.population() == Pdv
    }
    isSampleStandardDeviationCorrect(Sdv) {
        return this._standardDev.sample() == Sdv
    }
    isRangeCorrect(r) {
        return this._standardDev.range() == r
    }
    /**
     * check and display answer
     */
    _() {
        // state of what is correct and wrong
        const state = []
        const $ = this.isMeanCorrect(document.getElementById("mean").value)
        const $$$ = this.isModeCorrect(document.getElementById("mode").value)
        const $$ = this.isMedianCorrect(document.getElementById("median").value)
        // if(!this.isMedianCorrect(document.getElementById("median").value) || !$ || !this.isModeCorrect(document.getElementById("mode").value) ) $answer.innerHTML += `<h1>Some of your answers are incorrect. Please review your answers.</h1>`
        $answer.innerHTML += `
            <h3></h3>
            <h3>${$?"correct": "incorrect"} mean: ${roundDecimals(this._dataset.mean(), 2)}</h3>
            <h3>${$$?"correct": "incorrect"} median: ${this._dataset.median()}</h3>
            <h3>${$$$?"correct": "incorrect"} mode: ${this._dataset.mode()}</h3>

        `
    }
    _$() {
        this.curSituation.isPopulation ? this.$__() : this._$_()
    }
    $$$() {
        
        $answer.innerHTML += `
            <h3>${this.isRangeCorrect(document.getElementById("range").value) ? "correct": "incorrect" } range: ${this._standardDev.range()}</h3>
        `
    }
    /**
     * display if is population standard deviation correct 
     */
    $__() {
        const $ = this.isPopulationStandardDeviationCorrect(document.getElementById("standard").value)
        $answer.innerHTML += `
        
            <h3>${$?"correct": "incorrect"} Population: ${roundDecimals(this._standardDev.population(), 2)}</h3>

        `
    }
    /**
     * check if sample standard deviation correct
     */
    _$_() {
           const x =  this.isSampleStandardDeviationCorrect(document.getElementById("standard").value)

        $answer.innerHTML += `
            <h3> ${x? "correct": "incorrect"}sample: ${roundDecimals(this._standardDev.sample(), 2)}</h3>

        `
    }




}
//  $answer.innerHTML ="ss"
class option1 extends statistic {
    constructor() {
        super()
    }
    // question() {
    //     return `A ${this.curSituation.context} recorded the ${this.curSituation.targetVariable} of ${this.curSituation.amount} ${this.curSituation.setting}. These students represent a random sample of the group. Find the following measures of central tendency for the given dataset: **Mean, Median, and Mode**.`;
    // }
    question() {
        return `A ${this.curSituation.context} recorded the ${this.curSituation.targetVariable} of ${this.curSituation.amount} ${this.curSituation.setting}. These students represent a random sample of the group. Find the following measures of central tendency for the given dataset: **Mean, Median, and Mode**.`;
    }
    find() {
        return `
             <div class="field-group">
            <label for="mean">Mean:</label>
            <input id="mean" type="number" step="any">
        </div>
        <div class="field-group">
            <label for="median">Median:</label>
            <input id="median" type="number" step="any">
        </div>
        <div class="field-group">
            <label for="mode">Mode:</label>
            <input id="mode" type="text">
        </div>
        `
    }
}
class option2 extends statistic {
    constructor() {
        super()
    }
    /**
     * Calculates the appropriate variability measure based on the
     * current situation's population classification.
     *
     * If the current dataset represents a population, the population
     * calculation is performed. Otherwise, the sample calculation is used.
     *
     * @returns {number} The calculated statistical value for either
     *                   the population or sample.
     */

    question() {
        const popTypeText = this.curSituation.isPopulation
            ? "These students represent the entire population of the group."
            : "These students represent a random sample of the group.";

        const sdTypeLabel = this.curSituation.isPopulation
            ? "population standard deviation"
            : "sample standard deviation";

        return `A ${this.curSituation.context} recorded the ${this.curSituation.targetVariable} of ${this.curSituation.amount} ${this.curSituation.setting}. ${popTypeText} calculate the **${sdTypeLabel}** for the following dataset:`;
    }
    find() {
        return `
  
        <div class="field-group">
            <label for="stdDev">range:</label>
            <input id="range" type="number" step="any">
        </div>
         <div class="field-group">
            <label for="stdDev">Standard Deviation:</label>
            <input id="standard" type="number" step="any">
        </div>  
        `
    }
}
class option3 extends statistic {

    constructor() {
        super()
    }

    question() {
        const popTypeText = this.curSituation.isPopulation
            ? "These students represent the entire population of the group."
            : "These students represent a random sample of the group."

        const sdTypeLabel = this.curSituation.isPopulation
            ? "population standard deviation"
            : "sample standard deviation"

        return `
            A ${this.curSituation.context} recorded the
            ${this.curSituation.targetVariable} of
            ${this.curSituation.amount} ${this.curSituation.setting}.
            ${popTypeText}
            Calculate the following measures for the given dataset:
            **Mean, Median, Mode, Range, and ${sdTypeLabel}.**
        `
    }

    find() {
        return `
            <div class="field-group">
                <label for="mean">Mean:</label>
                <input id="mean" type="number" step="any">
            </div>

            <div class="field-group">
                <label for="median">Median:</label>
                <input id="median" type="number" step="any">
            </div>

            <div class="field-group">
                <label for="mode">Mode:</label>
                <input id="mode" type="text">
            </div>

            <div class="field-group">
                <label for="range">Range:</label>
                <input id="range" type="number" step="any">
            </div>

            <div class="field-group">
                <label for="standard">Standard Deviation:</label>
                <input id="standard" type="number" step="any">
            </div>
        `
    }
}


function roundDecimals(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
function opt1() {
    const s = new option1()
    $answer.innerHTML = ""

    s.generateDataset()

    $question.innerHTML = `
        <div>${s.question()}</div>
    `

    $dataset.innerText = `
        dataset: ${s.getDataSet()
            .getData()
            .map(Number)
            .sort((a, b) => a - b)}
    `

    $studentAnswer.innerHTML = `
        <h1>Find:</h1>
        ${s.find()}
        <button id="confirm">Confirm</button>
    `

    document.getElementById("confirm").addEventListener("click", () => {
        s._()


        updateQuiz()

        const $btn = document.createElement("button")
        $btn.onclick = opt1
        $btn.innerText = "Next"

        $answer.appendChild($btn)
    })
}

function opt2() {
    const s = new option2();
    $answer.innerHTML = ""

    s.generateDataset()
    s.generateStandardDeviation()
    $question.innerHTML = `
        <div>${s.question()}</div>
    `;

    $dataset.innerText = `dataset: ${s.getDataSet().getData().map(Number).sort((a, b) => a - b)}`;

    $studentAnswer.innerHTML = `
                   <h1>Find:</h1>
        
       ${s.find()}
        <button id="confirm">Confirm</button>
    `;

    document.getElementById("confirm").addEventListener("click", () => {
        $answer.innerHTML = "";
        s._$()
        s.$$$()
        updateQuiz()

        const $btn = document.createElement("button")
        $btn.onclick = opt2
        $btn.innerText = "next"
        $answer.appendChild($btn)
    });
}
function opt3() {
    const s = new option3()

    $answer.innerHTML = ""

    s.generateDataset()
    s.generateStandardDeviation()

    $question.innerHTML = `
        <div>${s.question()}</div>
    `

    $dataset.innerText = `
        dataset: ${s.getDataSet()
            .getData()
            .map(Number)
            .sort((a, b) => a - b)}
    `

    $studentAnswer.innerHTML = `
        <h1>Find:</h1>
        ${s.find()}
        <button id="confirm">Confirm</button>
    `

    document.getElementById("confirm").addEventListener("click", () => {
        $answer.innerHTML = ""

        s._()
        s.$$$()
        s._$()
        updateQuiz()
        const $btn = document.createElement("button")
        $btn.onclick = opt3
        $btn.innerText = "next"
        $answer.appendChild($btn)
    })
}
const sessionKey = "statistic"
function createNewSession() {
    opt1()
    const topic = $topic.value

    localStorage.setItem(sessionKey, {
        currScore: 0,
        currQuestionNumber: 0,
        questionNumber: 20,
        quizTopic: topic
    })
}
function getSession() {
    return localStorage.getItem(sessionKey)
}
function updateQuiz() {

    if (currQuizNum + 1 > questionAmount) {
        endQuiz();
        return;
    }

    document.getElementById("confirm").disabled = true;

    currQuizNum++;
}
function startQuiz(val) {
    switch (val) {
        case "1":
            opt1()
            break;
        case "2":
            opt2()
            break;
        case "3":
            opt3()
            break;

        default:
            opt1()
            break;
    }
    currQuizNum = 1
}
function endQuiz() {

    const $quiz = document.getElementById("quiz");

    $quiz.innerHTML = `
        <div class="container">
            <div class="wrapper quiz-end">

                <div class="quiz-end-header">
                    <span class="quiz-end-title">
                        Quiz Completed
                    </span>

                    <span class="quiz-end-message">
                        You have completed the quiz.
                    </span>
                </div>

                <div class="quiz-result">

                    <div class="result-item">
                        <span class="result-label">Score</span>
                        <span class="result-value" id="finalScore">
                            0 / ${questionAmount}
                        </span>
                    </div>

                    <div class="result-item">
                        <span class="result-label">Percentage</span>
                        <span class="result-value" id="finalPercentage">
                            0%
                        </span>
                    </div>

                </div>
            
                <div class="quiz-end-actions">

                    <button
                        type="button"
                        id="backMenuBtn">
                        Back to Menu
                    </button>

                </div>


            </div>
        </div>
    `;

        // <div class="field-group">
                //     <label for="topic">topic</label>
                //     <select name="" id="newTopic">
                //         <option value="1">
                //              Measures of Central Tendency 
                //         </option>
                //         <option value="2">
                //               Measures of Variability  
                //         </option>
                //         <option value="3">
                //               Measures of Central Tendency and Measures of Variability   
                //         </option>
                //     </select>
                // </div>
//     document.getElementById("newTopic").addEventListener("change", ()=>{
//     startQuiz(document.getElementById("newTopic").value)
// })
    document.getElementById("backMenuBtn").addEventListener("click", backToMenu);
}
function backToMenu() {

    $quiz.hidden = true;
    $initialize.hidden = false;

    resetQuiz();
}
function resetQuiz() {

    const $quiz = document.getElementById("quiz");

    // Restore original quiz interface
    $quiz.innerHTML = `
        <div class="container">
            <div class="wrapper" id="question-wrapper">

                <div class="wrapper">
                    <span id="question">question</span>

                    <span
                        class="dataset"
                        id="dataset">
                        [...] this is dataset
                    </span>
                </div>

                <div
                    class="wrapper"
                    id="studentAnswer">
                </div>

                <div
                    class="wrapper"
                    id="answer">
                </div>

            </div>
        </div>
    `;
    
    // Reconnect DOM elements
    $question = document.getElementById("question");
    $studentAnswer = document.getElementById("studentAnswer");
    $answer = document.getElementById("answer");
    $dataset = document.getElementById("dataset");

    // Reset quiz progress
    currQuizNum = 1;

    // Start a new quiz using the currently selected topic
    // startQuiz($topic.value);
}
// startQuiz()
// $topic.addEventListener("change", ()=>{
//     startQuiz($topic.value)
// })



// try {
// $answer.innerHTML = "ss"
// // const st = new statistic()



// } catch (error) {
//  $answer.innerHTML =error
// }
//  $answer.innerHTML ="ssLS"
// class statistic{
//     constructor(){}
// }
// $question.innerHTML =_.question()/
/*
function generateQuestionForStandardDeviation() {

    const situation =
        standardDeviationSituations[
            constraint(0, standardDeviationSituations.length - 1)
        ];

    const numberOfSubjects = constraint(
        situation.minSubjects,
        situation.maxSubjects
    );
    // 
    return `A ${situation.context} recorded ${situation.targetVariable} for ${numberOfSubjects} ${situation.setting}. These ${situation.setting} represent ${situation.populationType} of the group. Calculate the standard deviation of the following dataset:`;
//  return `A ${situation.context} recorded ${situation.targetVariable} from ${numberOfSubjects} subjects in a ${situation.setting}. These subjects represent ${situation.populationType} of the group. Calculate the standard deviation of the following dataset:`;

}
   

// */

// startQuiz($topic.value)
function generateSampleSize(populationSize) {
    const min = 5;
    const max = Math.min(15, populationSize - 1);
    return constraint(min, max)
}

function constraint(c1, c2) {
    // check if c1 and c2 have valid value
    if ((c1.length === 0 || c1 === null) || (c2.length === 0 || c2 === null)) {
        return 0;
    }
    if (c1 > c2) {
        return 0;
    }

    return Math.floor(Math.random() * (Math.floor(c2) - Math.ceil(c1) + 1)) + Math.ceil(c1)
}

/**
    case 1
        Given the following dataset, find the measures of central tendency.

        find:
            mean 
            median
            mode
    case 2
        question compute the standard deveition
        Given the following dataset, calculate the standard deviation. Determine whether the dataset should be treated as a population or a sample based on the given situation.
        find:
            standard deviation:
                population or sample: base on the question and what data
    case 3:
        Given the following dataset, find the measures of central tendency and calculate the standard deviation. Determine whether the dataset represents a population or a sample.
        find:
            mean,median,mode
            standard population, sample
    requirements
        real world application context based - base the situation and the dataset form a real world situation   
        generate a random data set - 
        solve:
            mean:_x = [x/n
                _x = mean 
                [x = sum of all values
                n = number of values    
            median: 
                if isOdd
                    median = X (n+1/2)
                else 
                    median = (xn/2 + xn/2+1) / 2
            mode: 
                mode:
                    k = current most frequent number
                    n =  current number of frequency
                    
                    for d in data 
                        if n == 0
                            k = d
                            n = 1
                        elif
                            k == d
                            n++
                        else
                            n--
            Population Variance:
                q2 = [(x-u)**2/n
                Where:

                q2 \(\sigma^2\) = population variance
                x \(x\) = each data value
                u \(\mu\) = population mean
                n \(N\) = total number of values
            Sample Standard Deviation:
                s = sqrt([(x-_x)**2/n-1)

                s = sample standard deviation
                \(x\) = each value
                \(\bar{x}\) = sample mean
                \(n\) = number of values






*/