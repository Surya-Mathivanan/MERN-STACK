const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Jupiter",
  },
  {
    question: "What is the smallest country in the world?",
    options: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"],
    correctAnswer: "Vatican City",
  },
];

const questionsE1 = document.getElementById("question");
const optionsE1 = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const score = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");
const progressBar = document.getElementById("progressBar");
const correctSound = document.getElementById("correctSound");
const wrongSound = document.getElementById("wrongSound");
const timerDisplay = document.getElementById("timer");
const alarmSound = document.getElementById("completeSound");

let currentQuestion = 0;
let suffledQuestions = suffleArray([...questions]);
let selectedOption = null;
let userScore = 0;
let timerDuration = 10; // Total quiz time (all questions) in seconds
let timerInterval;

function startQuiz() {
  currentQuestion = 0;
  userScore = 0;
  suffledQuestions = suffleArray([...questions]);
  selectedOption = null;
  score.innerHTML = "";
  nextBtn.disabled = true;
  nextBtn.style.display = "inline-block";
  restartBtn.style.display = "none";
  startTimer(timerDuration);
  loadQuestion();
}

function loadQuestion() {
  questionsE1.textContent = suffledQuestions[currentQuestion].question;
  optionsE1.innerHTML = "";
  nextBtn.disabled = true;
  selectedOption = null;

  suffledQuestions[currentQuestion].options.forEach((optionText) => {
    const option = document.createElement("div");
    option.textContent = optionText;
    option.className = "option";
    option.addEventListener("click", () => selectOption(option, optionText));
    optionsE1.appendChild(option);
  });

  updateProgressBar();
}

function selectOption(optionElement, selectedText) {
  if (selectedOption) return;
  selectedOption = optionElement;
  nextBtn.disabled = false;

  if (selectedText === suffledQuestions[currentQuestion].correctAnswer) {
    optionElement.style.backgroundColor = "lightgreen";
    userScore++;
    correctSound.play();
  } else {
    optionElement.style.backgroundColor = "red";
    wrongSound.play();
    Array.from(optionsE1.children).forEach((opt) => {
      if (opt.textContent === suffledQuestions[currentQuestion].correctAnswer) {
        opt.style.backgroundColor = "lightgreen";
      }
    });
  }
}

nextBtn.addEventListener("click", () => {
  if (selectedOption === null) {
    alert("Please select an option before proceeding!");
    return;
  }
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    endQuiz(false);
  }
});

restartBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  startQuiz();
});

function endQuiz(timeExpired = false) {
  clearInterval(timerInterval);
  questionsE1.textContent = "Quiz Completed!";
  optionsE1.innerHTML = "";
  nextBtn.disabled = true;
  nextBtn.style.display = "none";

  let message = "";
  if (timeExpired) {
    alarmSound.play();                
     if (userScore === questions.length) {
    message = "Excellent!";
  } else if (userScore >= questions.length / 2) {
    message = "Good job!";
  } else {
    message = "Keep trying!";
  }
  } else if (userScore === questions.length) {
    message = "Excellent!";
  } else if (userScore >= questions.length / 2) {
    message = "Good job!";
  } else {
    message = "Keep trying!";
  }

  let highScore = getHighScore();
  let newHigh = false;
  if (userScore > highScore) {
    setHighScore(userScore);
    highScore = userScore;
    newHigh = true;
  }

  score.innerHTML = `
    <div class="scoreboard">
      <h3>Scoreboard</h3>
      <p>Your Score: <strong>${userScore} / ${questions.length}</strong></p>
      <p>High Score: <strong>${highScore}</strong> ${newHigh ? "(New!)" : ""}</p>
      <p>${message}</p>
    </div>
  `;
  restartBtn.style.display = "inline-block";
}

function updateProgressBar() {
  const progress = ((currentQuestion + 1) / suffledQuestions.length) * 100;
  progressBar.style.width = `${progress}%`;
  progressBar.textContent = `${currentQuestion + 1} / ${suffledQuestions.length}`;
  nextBtn.textContent = currentQuestion === suffledQuestions.length - 1 ? "Finish" : "Next";
}

function suffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getHighScore() {
  return Number(localStorage.getItem("quizHighScore") || 0);
}

function setHighScore(score) {
  localStorage.setItem("quizHighScore", score);
}

function startTimer(duration) {
  let timeLeft = duration;
  timerDisplay.textContent = formatTime(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz(true); // Time expired
    }
  }, 1000);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}


startQuiz();
