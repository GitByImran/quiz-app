// quiz questions, choices, and correct answers list

const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Paris", "London", "Rome", "Berlin"],
        correct: ["Paris"]
    },
    {
        question: "Which languages are used for web development?",
        choices: ["Python", "HTML", "Java", "CSS"],
        correct: ["HTML", "CSS"]
    },
    {
        question: "What is the largest planet in our solar system?",
        choices: ["Earth", "Mars", "Jupiter", "Saturn"],
        correct: ["Jupiter"]
    },
    {
        question: "Which of the following are programming languages?",
        choices: ["HTML", "Python", "C++", "SQL"],
        correct: ["Python", "C++", "SQL"]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        choices: ["Harper Lee", "Jane Austen", "Mark Twain", "Ernest Hemingway"],
        correct: ["Harper Lee"]
    },
    {
        question: "Which elements are noble gases?",
        choices: ["Helium", "Oxygen", "Nitrogen", "Argon"],
        correct: ["Helium", "Argon"]
    },
    {
        question: "What is the square root of 64?",
        choices: ["6", "7", "8", "9"],
        correct: ["8"]
    },
    {
        question: "Which countries are in the United Kingdom?",
        choices: ["Scotland", "Ireland", "Wales", "England"],
        correct: ["Scotland", "Wales", "England"]
    },
    {
        question: "Which planet is known as the Red Planet?",
        choices: ["Mercury", "Venus", "Earth", "Mars"],
        correct: ["Mars"]
    },
    {
        question: "Who is known as the father of computer science?",
        choices: ["Albert Einstein", "Isaac Newton", "Alan Turing", "Nikola Tesla"],
        correct: ["Alan Turing"]
    }
];

let currentQuestionIndex = 0;
let userAnswers = Array(questions.length);

// grap all the buttons
document.getElementById('start').addEventListener('click', startQuiz);
document.getElementById('prev').addEventListener('click', prevQuestion);
document.getElementById('next').addEventListener('click', nextQuestion);
document.getElementById('submit').addEventListener('click', submitQuiz);
document.getElementById('cancel').addEventListener('click', resetQuiz);
document.getElementById('start-again').addEventListener('click', resetQuiz);

// functionality after quiz start
function startQuiz() {
    const name = document.getElementById('name').value.trim();
    const id = document.getElementById('id').value.trim();

    if (name === '' || id === '') {
        alert('Please enter your name and id to start quiz!');
        return;
    }

    document.getElementById('user-info').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    showQuestion();
}

// load previos question
function prevQuestion() {
    saveAnswer();
    currentQuestionIndex--;
    showQuestion();
}

// load next question
function nextQuestion() {
    const selectedChoices = Array.from(document.querySelectorAll(`input[name="question${currentQuestionIndex}"]:checked`));
    if (selectedChoices.length === 0) {
        alert('Please select at least one option.');
        return;
    }
    saveAnswer();
    currentQuestionIndex++;
    showQuestion();
}

// reset the quiz
function resetQuiz() {
    currentQuestionIndex = 0;
    userAnswers = Array(questions.length).fill(null);
    document.getElementById('user-info').style.display = 'block';
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result').style.display = 'none';
}

// show question
function showQuestion() {
    const quizContainer = document.getElementById('quiz');
    quizContainer.innerHTML = '';

    const q = questions[currentQuestionIndex];
    const questionElement = document.createElement('div');
    questionElement.classList.add('question');
    questionElement.innerHTML = `
        <h3>${q.question}</h3>
        <ul class="choices">
            ${q.choices.map((choice, index) => `
                <li>
                    <input type="checkbox" id="choice-${index}" name="question${currentQuestionIndex}" value="${choice}">
                    <label for="choice-${index}">
                        ${choice}
                    </label>
                </li>
            `).join('')}
        </ul>
    `;

    quizContainer.appendChild(questionElement);

    document.getElementById('prev').disabled = currentQuestionIndex === 0;
    document.getElementById('next').style.display = currentQuestionIndex === questions.length - 1 ? 'none' : 'inline-block';
    document.getElementById('submit').style.display = currentQuestionIndex === questions.length - 1 ? 'inline-block' : 'none';
}

// save the selected answer
function saveAnswer() {
    const selectedChoices = Array.from(document.querySelectorAll(`input[name="question${currentQuestionIndex}"]:checked`)).map(input => input.value);
    userAnswers[currentQuestionIndex] = selectedChoices;
}

// logically comapre answer 
function calculateCorrectAnswer(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

// handle quiz submission
function submitQuiz() {
    saveAnswer();
    let score = 0;

    questions.forEach((q, index) => {
        const correctAnswers = q.correct;
        const userSelectedAnswers = userAnswers[index];

        // Compare the arrays directly
        if (arraysEqual(correctAnswers, userSelectedAnswers)) {
            score++;
        }
    });

    const name = document.getElementById('name').value;
    const id = document.getElementById('id').value;
    const resultContainer = document.getElementById('result-content');
    resultContainer.innerHTML = `Name: ${name}<br>ID: ${id}<br>Score: ${score} / ${questions.length}`;

    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('result').style.display = 'block';
}
