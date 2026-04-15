// MATRIX BACKGROUND (NO HTML EDIT)
const canvas = document.createElement("canvas");
canvas.id = "matrix";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+-";
const fontSize = 14;

let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff00";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const char = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(char, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 33);

// GAME LOGIC
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endGameEl = document.getElementById("end-game-container");

const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const difficultySelect = document.getElementById("difficulty");

const words = [
  "apple","banana","computer","javascript","typing",
  "keyboard","screen","developer","function","variable"
];

let randomWord;
let score = 0;
let time = 10;
let timeInterval;
let difficulty = "easy";

// WORD
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWord() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

// SCORE
function updateScore() {
  score++;
  scoreEl.innerText = score;
}

// GAME OVER
function gameOver() {
  clearInterval(timeInterval);

  endGameEl.innerHTML = `
    <h2>Game Over</h2>
    <p>Score: ${score}</p>
    <button onclick="location.reload()">Restart</button>
  `;
}

// TIMER
function updateTime() {
  time--;
  timeEl.innerText = time + "s";

  if (time === 0) gameOver();
}

function startTimer() {
  timeInterval = setInterval(updateTime, 1000);
}

// START
function init() {
  addWord();
  startTimer();
}
init();

// INPUT
text.addEventListener("input", (e) => {
  if (e.target.value === randomWord) {
    updateScore();
    e.target.value = "";
    addWord();

    time = difficulty === "hard" ? 3 : difficulty === "medium" ? 5 : 10;
    timeEl.innerText = time + "s";
  }
});

// SETTINGS
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("show");
});

difficultySelect.addEventListener("change", (e) => {
  difficulty = e.target.value;
});