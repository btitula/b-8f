const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const retryBtn = document.getElementById("retryBtn");
const homeBtn = document.getElementById("homeBtn");

const mostRecentScore = localStorage.getItem("mostRecentScore");
const finalScore = document.getElementById("finalScore");
finalScore.innerText = mostRecentScore;


const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const toggleButtons = (isDisabled) => {
  saveScoreBtn.disabled = isDisabled;
  retryBtn.disabled = isDisabled;
  homeBtn.disabled = isDisabled;
};

username.addEventListener("keyup", () => {
  toggleButtons(username.value === "");
});

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
  window.location.assign("../pages/highscores.html");
} 

retryBtn.addEventListener("click", () => {
  window.location.assign("../pages/game.html");
});

homeBtn.addEventListener("click", () => {
  window.location.assign("../index.html");
});