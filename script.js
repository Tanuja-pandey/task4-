//fetch the jok]e from the API and display it
document.addEventListener('DOMContentLoaded', function() {
    const jokeBtn = document.getElementById('getJokeBtn');
    const jokeDisplay = document.getElementById('jokeDisplay');
    if (jokeBtn && jokeDisplay) {
        jokeBtn.addEventListener('click', function() {
            jokeDisplay.textContent = 'Loading...';
            fetch('https://official-joke-api.appspot.com/random_joke')
                .then(response => response.json())
                .then(data => {
                    jokeDisplay.textContent = data.setup + ' - ' + data.punchline;
                })
                .catch(error => {
                    jokeDisplay.textContent = 'Failed to fetch joke.';
                });
        });
    }
});
const questions = [
    {
        question: "What is the full form of HTML?",
        answers: [
            { text: "style", correct: false },
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Text Makeup Language", correct: false },
            { text: "High Text Markup Language", correct: false }
        ]
    },
    {
        question: "What is the full form of CSS?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Cascading Style Sheep", correct: false },
            { text: "Cartoon Style Sheets", correct: false },
            { text: "Cascading Super Sheets", correct: false }
        ]
    },
    {
        question: "What is the full form of JS?",
        answers: [
            { text: "JavaSuper", correct: false },
            { text: "JustScript", correct: false },
            { text: "JavaScript", correct: true },
            { text: "JavaScript Object Notation", correct: false }
        ]
    },
    {
        question: "What is the full form of HTTP?",
        answers: [
            { text: "HyperText Transfer Product", correct: false },
            { text: "HyperText Test Protocol", correct: false },
            { text: "HyperText Transfer Protocol", correct: true },
            { text: "HyperText Test Product", correct: false }
        ]
    },
    {
        question: "What is the full form of URL?",
        answers: [
            { text: "Uniform Resource Locator", correct: true },
            { text: "Uniform Resource Link", correct: false },
            { text: "Uniform Reference Link", correct: false },
            { text: "Uniform Reference Locator", correct: false }
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
});
nextButton.style.display = "block";
}
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length ) {
        handleNextButton();
    } else {
        startQuiz();
    }
});
startQuiz();