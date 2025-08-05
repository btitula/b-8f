const highScoresList = document.getElementById("highScoresList");
console.log(`highScoresList: ${highScoresList}`);
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(`here are the high scores: ${highScores}`);

highScoresList.innerHTML = highScores.map(score => `<li class="high-score"><span>${score.name}</span> <span>${score.score}</span></li>`).join("");