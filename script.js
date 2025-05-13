const gameArea = document.getElementById('gameArea');
const scoreBoard = document.getElementById('scoreBoard');
const startBtn = document.getElementById('startBtn');

let score = 0;
let timeLeft = 30;
let gameInterval;
let timerInterval;

function spawnCircle() {
  const circle = document.createElement('div');
  circle.classList.add('circle');

  const maxX = gameArea.clientWidth - 50;
  const maxY = gameArea.clientHeight - 50;

  const x = Math.random() * maxX;
  const y = Math.random() * maxY;

  circle.style.left = `${x}px`;
  circle.style.top = `${y}px`;

  circle.onclick = function () {
    score++;
    updateScore();
    gameArea.removeChild(circle);
    spawnCircle();
  };

  gameArea.appendChild(circle);
}

function updateScore() {
  scoreBoard.textContent = `Score: ${score} | Time: ${timeLeft}s`;
}

function startGame() {
  score = 0;
  timeLeft = 30;
  updateScore();
  startBtn.disabled = true;
  gameArea.innerHTML = '';
  spawnCircle();

  gameInterval = setInterval(() => {
    if (gameArea.children.length === 0) {
      spawnCircle();
    }
  }, 1000);

  timerInterval = setInterval(() => {
    timeLeft--;
    updateScore();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      clearInterval(gameInterval);
      gameArea.innerHTML = '';
      alert('Time up! Your final score: ' + score);
      startBtn.disabled = false;
    }
  }, 1000);
}

startBtn.addEventListener('click', startGame);
