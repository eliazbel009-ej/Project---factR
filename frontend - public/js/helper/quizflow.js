let studentName = "";
let studentSection = "";

let selectedMode = "";

let timerInterval = null;
let timeElapsed = 0;


/* ================================
   STUDENT DETAILS
   ================================ */

function proceedToModeSelect() {

    studentName =
        document.getElementById("fullName").value.trim();

    studentSection =
        document.getElementById("section").value.trim();


    if (!studentName || !studentSection) {

        alert("Please enter your name and section.");

        return;
    }


    // Hide student form
    document.getElementById("studentStart").style.display = "none";


    // Show quiz type selection
    document.getElementById("modeSelect").style.display = "block";
}


/* ================================
   START QUIZ
   ================================ */

function startQuizWithCountdown(mode) {

    selectedMode = mode;

    timeElapsed = 0;


    // Append student information
    document.getElementById("showName").textContent =
        studentName;

    document.getElementById("showSection").textContent =
        studentSection;


    // Hide quiz type selection
    document.getElementById("modeSelect").style.display =
        "none";


    // Get countdown elements
    const overlay =
        document.getElementById("countdownOverlay");

    const number =
        document.getElementById("countdownNumber");


    // Show countdown
    overlay.style.display = "flex";


    let count = 3;

    number.textContent = count;


    const countdown = setInterval(() => {

        count--;


        if (count > 0) {

            number.textContent = count;

        }

        else if (count === 0) {

            number.textContent = "GO!";

        }

        else {

            clearInterval(countdown);


            // Hide countdown
            overlay.style.display = "none";


            // Show student information
            document.getElementById("studentInfo").style.display =
                "block";


            // Show quiz
            document.getElementById("quizArea").style.display =
                "block";


            // Start timer
            startTimer();

        }

    }, 1000);
}


/* ================================
   TIMER
   ================================ */

function startTimer() {

    // Prevent duplicate timers
    if (timerInterval) {

        clearInterval(timerInterval);

    }


    timerInterval = setInterval(() => {

        timeElapsed++;


        const minutes =
            Math.floor(timeElapsed / 60);

        const seconds =
            timeElapsed % 60;


        document.getElementById("timerDisplay").textContent =
            `Time Elapsed: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    }, 1000);
}