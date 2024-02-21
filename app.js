const startButton = document.getElementById('start-btn');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const resultContainer = document.getElementById('result-container');
const scoreDisplay = document.getElementById('score');
const initialsInput = document.getElementById('initials-input');
const saveScoreButton = document.getElementById('save-score-btn');
const highScoresButton = document.getElementById('high-scores-btn');
const highScoresContainer = document.getElementById('high-scores-container');
const highScoresList = document.getElementById('high-scores-list');
const lastTestScoreDisplay = document.getElementById('last-test-score');
const restartQuizButton = document.getElementById('restart-quiz-btn');

let currentQuestionIndex = 0;
let score = 0;
let lastTestInitials = '';
let lastTestScore = 0;
let timerInterval;
let timeLeft = 60;

const questions = [
    {
        question: 'What is the name of Skillhat web dev instructor?',
        answers: [
          { text: 'E.A Apostol', correct: false },
          { text: 'Linus', correct: true },
          { text: 'Charles Babbage', correct: false }
        ]
      },
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '5', correct: false },
      { text: '6', correct: false }
    ]
  },
  
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'London', correct: false },
      { text: 'Paris', correct: true },
      { text: 'Berlin', correct: false }
    ]
  },
  {
    question: 'What does HTML stand for?',
    answers: [
      { text: 'Hyper Text Markup Language', correct: true },
      { text: 'Hyperlinks and Text Markup Language', correct: false },
      { text: 'Home Tool Markup Language', correct: false }
    ]
  },
  {
    question: 'Which CSS property is used to change the text color of an element?',
    answers: [
      { text: 'color', correct: true },
      { text: 'font-color', correct: false },
      { text: 'text-color', correct: false }
    ]
  },
  {
    question: 'What is the result of 2 + "2" in JavaScript?',
    answers: [
      { text: '22', correct: true },
      { text: '4', correct: false },
      { text: 'Error', correct: false }
    ]
  },
  {
    question: 'What is the result of the expression 5 % 2?',
    answers: [
      { text: '2', correct: false },
      { text: '1', correct: true },
      { text: '0.5', correct: false }
    ]
  },
  {
    question: 'Which of the following is a valid type of function in JavaScript?',
    answers: [
      { text: 'named function', correct: true },
      { text: 'lambda function', correct: true },
      { text: 'anonymous function', correct: true }
    ]
  },
  {
    question: 'What is the result of type of null in JavaScript?',
    answers: [
      { text: 'object', correct: true },
      { text: 'null', correct: false },
      { text: 'undefined', correct: false }
    ]
  },
  {
    question: 'What does CSS stand for?',
    answers: [
      { text: 'Cascading Style Sheets', correct: true },
      { text: 'Creative Style Sheets', correct: false },
      { text: 'Computer Style Sheets', correct: false }
    ]
  },
  {
    question: 'What does the || operator do in JavaScript?',
    answers: [
      { text: 'Logical OR', correct: true },
      { text: 'Logical AND', correct: false },
      { text: 'Assignment', correct: false }
    ]
  },
];

startButton.addEventListener('click', startQuiz);
saveScoreButton.addEventListener('click', saveScore);
highScoresButton.addEventListener('click', showHighScores);
restartQuizButton.addEventListener('click', restartQuiz);

function startQuiz() {
  startButton.style.display = 'none';
  questionContainer.style.display = 'block';
  highScoresContainer.style.display = 'none';
  showQuestion();
  startTimer();
}

function startTimer() {
  updateTimerDisplay();
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionText.innerText = currentQuestion.question;
  answerButtons.innerHTML = '';
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer.correct));
    answerButtons.appendChild(button);
  });
}

function selectAnswer(correct) {
  if (correct) {
    score++;
    scoreDisplay.innerText = score;
    showResult('Correct');
  } else {
    timeLeft -= 10;
    if (timeLeft < 0) timeLeft = 0;
    updateTimerDisplay();
    showResult('Incorrect');
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function showResult(result) {
  resultContainer.innerHTML = '';
  const resultElement = document.createElement('p');
  resultElement.innerText = result;
  resultContainer.appendChild(resultElement);
}

function endQuiz() {
  clearInterval(timerInterval);
  questionContainer.style.display = 'none';
  resultContainer.style.display = 'block';
  saveScoreButton.style.display = 'none';
  restartQuizButton.style.display = 'block';
  lastTestInitials = initialsInput.value;
  lastTestScore = score;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  resultContainer.style.display = 'none';
  restartQuizButton.style.display = 'none';
  startQuiz();
}

function saveScore() {
  const initials = initialsInput.value;
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScores.push({ initials, score });
  highScores.sort((a, b) => b.score - a.score);
  localStorage.setItem('highScores', JSON.stringify(highScores));
  showHighScores();
}

function showHighScores() {
  resultContainer.style.display = 'none';
  highScoresContainer.style.display = 'block';
  highScoresList.innerHTML = '';
  const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
  highScores.forEach(score => {
    const li = document.createElement('li');
    li.innerText = `${score.initials}: ${score.score}`;
    highScoresList.appendChild(li);
  });
  lastTestScoreDisplay.innerText = `Your last test score: ${lastTestInitials}: ${lastTestScore}`;
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer').innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
