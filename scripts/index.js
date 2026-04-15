// DOM
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");

// Words
const words = [
  "dependent","dog","superficial","admit","juice","javascript",
  "developer","airplane","great","fun","manipulate","cat",
  "transition","school","computer","programming","drag","loving","north"
];

let randomWord;
let score = 0;
let time = 10;

// Random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Add word
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

// Update score
function updateScore() {
  score++;
  scoreEl.innerText = score;
}

// Timer
function updateTime() {
  time--;

  if (time <= 0) {
    time = 0;
    timeEl.innerText = "0s";
    clearInterval(timer);
    gameOver();
    return;
  }

  timeEl.innerText = time + "s";
}

// Game over
function gameOver() {
  endgameEl.style.display = "flex";
  endgameEl.innerHTML = `
    <h1>Game Over</h1>
    <p>Score: ${score}</p>
    <button onclick="location.reload()">Restart</button>
  `;
}

// Input
text.addEventListener("input", (e) => {
  if (e.target.value === randomWord) {
    updateScore();
    addWordToDOM();
    time += 5;
    text.value = "";
  }
});

// Start
addWordToDOM();
const timer = setInterval(updateTime, 1000);