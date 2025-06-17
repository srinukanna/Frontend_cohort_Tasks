// Select elements
const gameContainer = document.getElementById('game-container');
const player = document.getElementById('player');
const scoreElement = document.getElementById('score');

// Global variables
let playerPosition = gameContainer.clientWidth / 2 - 25; // Center position
let playerSpeed = 20;
let score = 0;
let gameInterval;

// Move player using left/right arrow keys
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && playerPosition > 0) {
        playerPosition -= playerSpeed;
    } else if (event.key === 'ArrowRight' && playerPosition < gameContainer.clientWidth - 50) {
        playerPosition += playerSpeed;
    }
    player.style.left = playerPosition + 'px';
});

// Function to create falling blocks
function createFallingBlock() {
    let block = document.createElement('div');
    block.classList.add('falling-block');
    block.style.left = Math.random() * (gameContainer.clientWidth - 50) + 'px';
    gameContainer.appendChild(block);
    
    let blockPosition = 0;
    let blockSpeed = 2 + Math.random() * 3; // Random speed
    
    let blockInterval = setInterval(() => {
        blockPosition += blockSpeed;
        block.style.top = blockPosition + 'px';

        // Check if block hits the player
        if (blockPosition > gameContainer.clientHeight - 60) {
            let blockLeft = parseInt(block.style.left);
            let playerLeft = playerPosition;
            if (blockLeft >= playerLeft && blockLeft <= playerLeft + 50) {
                // Collision detected - Game Over
                clearInterval(gameInterval);
                clearInterval(blockInterval);
                alert('Game Over! Your score: ' + score);
                window.location.reload();
            }
        }

        // Remove block if it falls off screen
        if (blockPosition > gameContainer.clientHeight) {
            clearInterval(blockInterval);
            gameContainer.removeChild(block);
            score++;
            scoreElement.textContent = 'Score: ' + score;
        }
    }, 20);
}

// Start the game
function startGame() {
    gameInterval = setInterval(() => {
        createFallingBlock();
    }, 1000); // New block every second
}

// Call startGame to begin
startGame();
