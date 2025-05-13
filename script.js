<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Click the Circle Game</title>
  <style>
    body {
      margin: 0;
      font-family: sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      flex-direction: column;
      background-color: #f0f0f0;
    }

    #gameArea {
      position: relative;
      width: 600px;
      height: 400px;
      background-color: white;
      border: 2px solid #333;
      overflow: hidden;
      margin-bottom: 20px;
    }

    .circle {
      position: absolute;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: crimson;
      cursor: pointer;
    }

    #scoreBoard {
      font-size: 24px;
      margin-bottom: 10px;
    }

    #startBtn {
      padding: 10px 20px;
      font-size: 18px;
    }
  </style>
</head>
<body>

  <div id="scoreBoard">Score: 0 | Time: 30s</div>
  <div id="gameArea"></div>
  <button id="startBtn">Start Game</button>

  <script>
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

      // Random position within game area
      const maxX = gameArea.clientWidth - 50;
      const maxY = gameArea.clientHeight - 50;

      circle.style.left = Math.random() * maxX + 'px';
      circle.style.top = Math.random() * maxY + 'px';

      // On click, increase score and spawn a new circle
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
  </script>
</body>
</html>
