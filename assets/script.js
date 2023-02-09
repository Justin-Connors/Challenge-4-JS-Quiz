//DOM Selectors
const question = document.querySelector("#question");
const choices = document.querySelectorAll(".choice-text");
const scoreText = document.querySelector("#score");

//Assigning global variables
let currentQuestion = {};
let availableQuestions = [];
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;

//Questions object array
var questions = [{
    question: "What does JS stand for?",
    choice1: "JavaScript",
    choice2: "Jelly Slime",
    choice3: "Juice Stand",
    choice4: "None of the above",
    answer: 1

}, {
    question: "JavaScript file has an extension of:",
    choice1: ".js",
    choice2: ".java",
    choice3: ".javascript",
    choice4: "None of the above",
    answer: 1
}, {
    question: "IsNaN() Evaluates an Argument to determine if give value:",
    choice1: "Is Not a number",
    choice2: "Is Not a NULL",
    choice3: "Is Not a new Object",
    choice4: "None of the above",
    answer: 1
}, {
    question: "Which of the dialog box display a message and a Data entry field?",
    choice1: "Alert()",
    choice2: "Confirm()",
    choice3: "Prompt()",
    choice4: "None of the above",
    answer: 3
}, {
    question: "Method Prompt() contain _____ Number of parameter(s)",
    choice1: "One",
    choice2: "Two",
    choice3: "Three",
    choice4: "None of the above",
    answer: 2
}, {
    question: "GetMonth() returns the month as a",
    choice1: "String",
    choice2: "Int",
    choice3: "Date",
    choice4: "None of the above",
    answer: 2
}, {
    question: "A function associated with an object is called:",
    choice1: "Function",
    choice2: "Method",
    choice3: "Constructor",
    choice4: "None of the above",
    answer: 2
}, {
    question: "If Button is clicked ______ Event Handler is invoked.",
    choice1: "OnSubmit()",
    choice2: "OnClick()",
    choice3: "OnLoad()",
    choice4: "None of the above",
    answer: 2
}, {
    question: "Function is used to parse string to int",
    choice1: "Int.Parse",
    choice2: "Integer.Parse",
    choice3: "Parse.Int",
    choice4: "None of the above",
    answer: 1
}];

//Score per correct question
const SCORE_POINTS = 100;
//Total number of questions
const MAX_QUESTIONS = 9;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);

        return window.location.assign("/end.html");
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionsIndex, 1);
    
    acceptingAnswers = true;
}

choices.forEach(choice => {

    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;
        acceptingAnswers = false;

        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = selectedAnswer == currentQuestion.answer? "correct" : "incorrect";

        if (classToApply === "correct") {
            incrementScore(SCORE_POINTS);
        }
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
            acceptingAnswers = true;
        }, 500
    )});
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();