const questions = [
  {
    question: "What does MERN stand for?",
    options: ["MongoDB, Express, React, Node", "MySQL, Express, React, Node", "MongoDB, Ember, React, Node", "MongoDB, Express, Redux, Node"],
    correctAnswer: "MongoDB, Express, React, Node",
  },
  {
    question: "Which component of the MERN stack is used to build the user interface?",
    options: ["MongoDB", "Node.js", "React.js", "Express.js"],
    correctAnswer: "React.js",
  },
  {
    question: "What is MongoDB?",
    options: ["A relational database", "A NoSQL database", "A front-end framework", "A backend framework"],
    correctAnswer: "A NoSQL database",
  },
  {
    question: "Which of the following is a Node.js framework?",
    options: ["Express.js", "React.js", "Angular.js", "MongoDB"],
    correctAnswer: "Express.js",
  },
  {
    question: "Which method is used to connect MongoDB in a Node.js application?",
    options: ["mongoConnect()", "mongoose.connect()", "connectDB()", "dbConnect()"],
    correctAnswer: "mongoose.connect()",
  },
  {
    question: "Which command creates a new React application?",
    options: ["create-react", "npx create-react-app", "npm start react", "npm create app"],
    correctAnswer: "npx create-react-app",
  },
  {
    question: "Which HTTP method is used to update data on the server?",
    options: ["GET", "POST", "PUT", "FETCH"],
    correctAnswer: "PUT",
  },
  {
    question: "What does JSX stand for in React?",
    options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JavaScript XAML"],
    correctAnswer: "JavaScript XML",
  },
  {
    question: "Which of the following is used to create RESTful APIs in the MERN stack?",
    options: ["React", "Express", "MongoDB", "Redux"],
    correctAnswer: "Express",
  },
  {
    question: "What is the default port for MongoDB?",
    options: ["27017", "8080", "3000", "5432"],
    correctAnswer: "27017",
  },
  {
    question: "Which of these is used for routing in React?",
    options: ["React-Router", "React-Route", "React-Navigation", "React-Links"],
    correctAnswer: "React-Router",
  },
  {
    question: "Which Node.js module is commonly used to create a server?",
    options: ["http", "server", "express", "net"],
    correctAnswer: "http",
  },
  {
    question: "How do you send data to an API using React?",
    options: ["fetch()", "getData()", "sendData()", "post()"],
    correctAnswer: "fetch()",
  },
  {
    question: "Which of the following is used to manage global state in React?",
    options: ["Redux", "Express", "Node", "MongoDB"],
    correctAnswer: "Redux",
  },
  {
    question: "What is the purpose of `useState` in React?",
    options: ["To connect to the database", "To update the backend", "To manage state in functional components", "To style components"],
    correctAnswer: "To manage state in functional components",
  },
  {
    question: "Which middleware in Express.js is used to parse incoming JSON data?",
    options: ["body-parser", "json-parser", "data-parser", "express-json"],
    correctAnswer: "body-parser",
  },
  {
    question: "Which keyword is used in Node.js to import a module?",
    options: ["import", "require", "include", "load"],
    correctAnswer: "require",
  },
  {
    question: "How do you define a schema in MongoDB using Mongoose?",
    options: ["mongoose.schema()", "mongoose.Schema()", "mongo.Schema()", "Schema.mongoose()"],
    correctAnswer: "mongoose.Schema()",
  },
  {
    question: "What does `npm` stand for?",
    options: ["Node Programming Manager", "Node Package Manager", "New Project Manager", "Network Package Manager"],
    correctAnswer: "Node Package Manager",
  },
  {
    question: "Which of the following is a hook in React?",
    options: ["useData()", "useFetch()", "useEffect()", "getData()"],
    correctAnswer: "useEffect()",
  }
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
let timerDuration = 120; // Total quiz time (all questions) in seconds
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
