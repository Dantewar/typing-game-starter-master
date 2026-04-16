// ================= MATRIX BACKGROUND =================
const canvas = document.createElement("canvas");
canvas.id = "matrix";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

let fontSize = 14;
let columns;
let drops;

function setupMatrix() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  columns = Math.floor(canvas.width / fontSize);
  drops = Array(columns).fill(1);
}

setupMatrix();
window.addEventListener("resize", setupMatrix);

const letters = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&*+-";

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff9f";
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

// ================= GAME LOGIC =================
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
let difficulty = localStorage.getItem("difficulty") || "easy";
let highScore = localStorage.getItem("highScore") || 0;

// ================= WORD =================
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

// ================= SCORE =================
function updateScore() {
  score++;
  scoreEl.innerText = score;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }
}

// ================= TIME =================
function updateTime() {
  time--;
  timeEl.innerText = time + "s";

  if (time <= 0) {
    gameOver();
  }
}

function startTimer() {
  clearInterval(timeInterval);
  timeInterval = setInterval(updateTime, 1000);
}

// ================= GAME OVER =================
function gameOver() {
  clearInterval(timeInterval);

  endGameEl.style.display = "flex";
  endGameEl.innerHTML = `
    <h2>Game Over</h2>
    <p>Score: ${score}</p>
    <p>High Score: ${highScore}</p>
    <button onclick="location.reload()">Restart</button>
  `;
}

// ================= INPUT =================
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    updateScore();
    addWordToDOM();

    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    timeEl.innerText = time + "s";
    e.target.value = "";
  }
});

// ================= SETTINGS =================
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("show");
});

difficultySelect.value = difficulty;

difficultySelect.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});

// ================= INIT =================
function init() {
  addWordToDOM();
  startTimer();
  text.focus();
}

init();