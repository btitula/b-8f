const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const retryBtn = document.getElementById("retryBtn");
const homeBtn = document.getElementById("homeBtn");

const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");
finalScore.innerText = mostRecentScore;


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const listQuestionsWithUserAnswer = JSON.parse(localStorage.getItem("listQuestionsWithUserAnswer")) || [];

const toggleButtons = (isDisabled) => {
  saveScoreBtn.disabled = isDisabled;
  retryBtn.disabled = isDisabled;
  homeBtn.disabled = isDisabled;
};

username.addEventListener("keyup", () => {
  toggleButtons(username.value === "");
});

if (listQuestionsWithUserAnswer.length > 0) {
  const reviewContainer = document.getElementById("reviewContainer");
  let arr = []

  for (let i = 0; i < listQuestionsWithUserAnswer.length; i++) {
    const q = listQuestionsWithUserAnswer[i];
    const { choice1, choice2, choice3, choice4, answer, userAnswer, question } = q;

    console.log(answer, userAnswer);
    arr.push(`
    <div class="game justify-center flex-column ${userAnswer !== answer ? "alert-container" : ""}">
      <h2 id="question">${question}</h2>

      <div class="choice-container ${answer === 1 ? " correct" : ""} ${userAnswer === 1 ? "incorrect" : ""}">
        <p class="choice-prefix">A</p>
        <p class="choice-text" data-number="1">${choice1}</p>
      </div>

      <div class="choice-container ${answer === 2 ? " correct" : ""} ${userAnswer === 2 ? "incorrect" : ""}">
        <p class="choice-prefix">B</p>
        <p class="choice-text" data-number="2">${choice2}</p>
      </div>

      <div class="choice-container ${answer === 3 ? " correct" : ""} ${userAnswer === 3 ? "incorrect" : ""}">
        <p class="choice-prefix">C</p>
        <p class="choice-text" data-number="3">${choice3}</p>
      </div>

      <div class="choice-container ${answer === 4 ? " correct" : ""} ${userAnswer === 4 ? "incorrect" : ""}">
        <p class="choice-prefix">D</p>
        <p class="choice-text" data-number="4">${choice4}</p>
      </div>
    </div>
  `);
  }
  console.log(arr);
  reviewContainer.innerHTML = arr.join("");
}


saveHighScore = (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  highScores.push({
    score: parseInt(mostRecentScore),
    name: username,
  });

  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);
  localStorage.setItem("highScores", JSON.stringify(highScores));
  localStorage.removeItem("listQuestionsWithUserAnswer");
  window.location.assign("../pages/highscores.html");
}

retryBtn.addEventListener("click", () => {
  window.location.assign("../pages/game.html");
});

homeBtn.addEventListener("click", () => {
  window.location.assign("../index.html");
});