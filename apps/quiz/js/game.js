const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text") );
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let questions = [];

fetch("../../quiz/questions/scratch.json")
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    questions = loadedQuestions;
    startGame();
  })

const CORRECT_BONUS = 2.5;
const MAX_QUESTIONS = 40;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  console.log(availableQuesions)
  getNewQuestion();
}

// Function to shuffle an array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

getNewQuestion = () => {
  localStorage.setItem("mostRecentScore", score);

  if (availableQuesions.length === 0 || questionCounter > MAX_QUESTIONS) {
    return window.location.assign("../pages/end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Create an array of choice objects with their corresponding numbers
  const choiceArray = [
    { number: 1, text: currentQuestion.choice1 },
    { number: 2, text: currentQuestion.choice2 },
    { number: 3, text: currentQuestion.choice3 },
    { number: 4, text: currentQuestion.choice4 }
  ];

  // Shuffle the choices
  const shuffledChoices = shuffleArray([...choiceArray]);

  // Update the correct answer to match the new position
  const correctAnswer = currentQuestion.answer;
  currentQuestion.answer = shuffledChoices.findIndex(choice => choice.number === correctAnswer) + 1;

  // Display shuffled choices
  choices.forEach((choice, index) => {
    const number = choice.dataset["number"];
    choice.innerText = shuffledChoices[index].text;
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
}

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = +selectedChoice.dataset["number"];

    console.log(selectedAnswer === currentQuestion.answer);
    const classToApply = selectedAnswer === currentQuestion.answer ? "correct" : "incorrect";
    selectedChoice.parentElement.classList.add(classToApply);
  
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  })
}); 


incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
}
