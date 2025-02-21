const gameContainer = document.getElementById('game-container');
const car = document.getElementById('car');
const scoreDisplay = document.getElementById('score');
const titleScreen = document.getElementById('title-screen');
const gameOverDisplay = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const backgroundMusic = document.getElementById('background-music');
const jumpSound = document.getElementById('jump-sound');
const coinSound = document.getElementById('coin-sound');

let score = 0;
let gameRunning = false;

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        if (!gameRunning) {
            startGame();
        } else {
            jump();
        }
    }
});

function startGame() {
    titleScreen.style.display = 'none';
    gameOverDisplay.style.display = 'none';
    score = 0;
    scoreDisplay.innerText = "Score: 0";
    gameRunning = true;
    backgroundMusic.play();
    generateObstacles();
}

function jump() {
    if (!gameRunning) return;
    car.style.transform = "translateY(-50px)";
    jumpSound.play();
    setTimeout(() => {
        car.style.transform = "translateY(0)";
    }, 500);
}

function generateObstacles() {
    if (!gameRunning) return;

    let obstacle = document.createElement('div');
    obstacle.classList.add('coin');
    obstacle.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/8/8c/Bitcoin_Logo.png" alt="Coin">`;
    obstacle.style.top = `${Math.random() * 300 + 50}px`;
    gameContainer.appendChild(obstacle);

    setTimeout(() => {
        if (gameRunning) generateObstacles();
    }, 2000);
}

function endGame() {
    gameRunning = false;
    gameOverDisplay.style.display = 'block';
    finalScoreDisplay.innerText = score;
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

setInterval(() => {
    if (gameRunning) {
        score++;
        scoreDisplay.innerText = `Score: ${score}`;
    }
}, 1000);
