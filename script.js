// Define the quiz questions and options
const quizQuestions = [
  {
  question: "What does the acronym API stand for?",
  options: ["Application Performance Interface", "Application Program Interface", "Application Programming Index", "Application Privacy Interface"],
  answer: "Application Program Interface"
  },
  {
  question: "Which HTTP method is typically used for retrieving data from a web API?",
  options: ["GET", "POST", "PUT", "DELETE"],
  answer: "GET"
  },
  {
  question: "Which format is commonly used for data exchange in web APIs?",
  options: ["JSON", "HTML", "XML", "CSV"],
  answer: "JSON"
  },
  {
  question: "Which header should be included in a request to a web API to indicate the expected response format?",
  options: ["Accept-Language", "Accept-Encoding", "Content-Type", "Accept"],
  answer: "Accept"
  },
  {
  question: "What is the purpose of rate limiting in web APIs?",
  options: ["To prevent unauthorized access", "To improve performance", "To limit the amount of data that can be accessed", "To prevent excessive usage and ensure fair access for all users"],
  answer: "To prevent excessive usage and ensure fair access for all users"
  }
  ];
  
  // Define variables for the quiz game
  const quizContainer = document.querySelector(".quiz-container");
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const timeLeftElement = document.getElementById("time-left");
  const scoreElement = document.getElementById("score-value");
  const highScoreBtn = document.getElementById("high-score-btn");
  const highScoreContainer = document.querySelector(".high-score-container");
  const highScoreList = document.getElementById("high-score-list");
  const closeBtn = document.getElementById("close-btn");
  let currentQuestionIndex = 0;
  let timerId;
  let timeLeft = 60;
  let score = 0;
  let highScores = [];
  
  // Set up the quiz game
  function setupQuiz() {
  showQuestion();
  startTimer();
  }
    // Reset the options for the next question
    function resetOptions() {

      while (optionsElement.firstChild) {
        optionsElement.removeChild(optionsElement.firstChild);
      }
    }
  // Show the current question and options
  function showQuestion() {
  resetOptions();
  if (currentQuestionIndex < quizQuestions.length) {
    questionElement.innerText = quizQuestions[currentQuestionIndex].question;
    quizQuestions[currentQuestionIndex].options.forEach((option) => {
      const optionElement = document.createElement("div");
      optionElement.classList.add("option");
      optionElement.innerText = option;
      optionElement.addEventListener("click", checkAnswer);
      optionsElement.appendChild(optionElement);
    });
  }}
  
  // Reset the options for the next question
  function resetOptions() {

  while (optionsElement.firstChild) {
    optionsElement.removeChild(optionsElement.firstChild);
  }
}

// Start the timer
function startTimer() {
  timerId = setInterval(() => {
  timeLeft--;
  timeLeftElement.innerText = timeLeft;
  if (timeLeft === 0) {
  endGame();
  }
  }, 1000);
  }
  
  // Check if the selected option is the correct answer
  function checkAnswer(event) {
  const selectedOption = event.target.innerText;
  if (selectedOption === quizQuestions[currentQuestionIndex].answer) {
  score++;
  scoreElement.innerText = score;
  } else {
  timeLeft -= 5;
  if (timeLeft < 0) {
  timeLeft = 0;
  }
  timeLeftElement.innerText = timeLeft;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex === quizQuestions.length) {
  endGame();
  } else {
  showQuestion();
  }
  }
  
  // End the quiz game
  function endGame() {
  clearInterval(timerId);
  quizContainer.style.display = "none";
  highScoreBtn.style.display = "block";
  const name = prompt("Enter your name:");
  if (name) {
  highScores.push({ name, score });
  }
  highScores.sort((a, b) => b.score - a.score);
  saveHighScores();
  }
  
  // Save the high scores to local storage
  function saveHighScores() {
  localStorage.setItem("highScores", JSON.stringify(highScores));
  }
  
  // Load the high scores from local storage
  function loadHighScores() {
  const highScoresData = localStorage.getItem("highScores");
  if (highScoresData) {
  highScores = JSON.parse(highScoresData);
  }
  }
  
  // Show the high scores
  function showHighScores() {
  highScoreList.innerHTML = "";
  highScores.forEach((highScore) => {
  const li = document.createElement("li");
  li.classList.add("high-score");
  li.innerText = `${highScore.name}: ${highScore.score}`;
  highScoreList.appendChild(li);
  });
  highScoreContainer.style.display = "block";
  }
  
  // Hide the high scores
  function hideHighScores() {
  highScoreContainer.style.display = "none";
  }
  
  // Initialize the quiz game
  function init() {
  loadHighScores();
  setupQuiz();
  highScoreBtn.addEventListener("click", showHighScores);
  closeBtn.addEventListener("click", hideHighScores);
  }
  
  init();
  
  