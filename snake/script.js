const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const box = 20; // Size of the snake and food
let snake = [{ x: 9 * box, y: 9 * box }]; // Snake starting position
let direction; // Direction of snake
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
let score = 0;

document.addEventListener('keydown', directionControl);
document.getElementById('restartBtn').addEventListener('click', restartGame);

function directionControl(event) {
    if (event.keyCode === 37 && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.keyCode === 38 && direction !== 'DOWN') direction = 'UP';
    else if (event.keyCode === 39 && direction !== 'LEFT') direction = 'RIGHT';
    else if (event.keyCode === 40 && direction !== 'UP') direction = 'DOWN';
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

function draw() {
    ctx.fillStyle = '#ecf0f1'; // Light background for canvas
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i === 0) ? '#27ae60' : '#2ecc71'; // Green colors for snake
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeStyle = '#1e6f3d'; // Darker green for stroke
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    // Draw food
    ctx.fillStyle = '#e74c3c'; // Red color for food
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        score++;
        document.getElementById('score').innerText = score;
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert('Game Over! Your score: ' + score);
        document.getElementById('restartBtn').style.display = 'block'; // Show restart button
    }

    snake.unshift(newHead);
}

function restartGame() {
    snake = [{ x: 9 * box, y: 9 * box }];
    direction = null;
    food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
    score = 0;
    document.getElementById('score').innerText = score;
    document.getElementById('restartBtn').style.display = 'none'; // Hide restart button
    game = setInterval(draw, 100);
}

// Start the game
let game = setInterval(draw, 100);
