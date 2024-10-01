const canvas = document.getElementById("gameCanvas");  
const ctx = canvas.getContext("2d");  

const box = 20;  
let snake = [{ x: 9 * box, y: 9 * box }];  
let direction = "RIGHT";  
let food = spawnFood();  
let score = 0;  

document.addEventListener("keydown", directionControl);  

function directionControl(event) {  
    if (event.key === "ArrowUp" && direction !== "DOWN") {  
        direction = "UP";  
    } else if (event.key === "ArrowDown" && direction !== "UP") {  
        direction = "DOWN";  
    } else if (event.key === "ArrowLeft" && direction !== "RIGHT") {  
        direction = "LEFT";  
    } else if (event.key === "ArrowRight" && direction !== "LEFT") {  
        direction = "RIGHT";  
    }  
}  

function spawnFood() {  
    return {  
        x: Math.floor(Math.random() * (canvas.width / box)) * box,  
        y: Math.floor(Math.random() * (canvas.height / box)) * box  
    };  
}  

function gameLoop() {  
    ctx.clearRect(0, 0, canvas.width, canvas.height);  

    ctx.fillStyle = "gray";  
    ctx.fillRect(0, 0, canvas.width, canvas.height);  

    ctx.fillStyle = "red";  
    ctx.fillRect(food.x, food.y, box, box);  

    const head = { x: snake[0].x, y: snake[0].y };  

    if (direction === "LEFT") head.x -= box;  
    if (direction === "UP") head.y -= box;  
    if (direction === "RIGHT") head.x += box;  
    if (direction === "DOWN") head.y += box;  

    if (head.x < 0) {  
        head.x = canvas.width - box;  
    } else if (head.x >= canvas.width) {  
        head.x = 0;  
    }  

    if (head.y < 0) {  
        head.y = canvas.height - box;  
    } else if (head.y >= canvas.height) {  
        head.y = 0;  
    }  

    if (head.x === food.x && head.y === food.y) {  
        score++;  
        food = spawnFood();  
    } else {  
        snake.pop();  
    }  

    snake.unshift(head);  

    for (let i = 0; i < snake.length; i++) {  
        ctx.fillStyle = i === 0 ? "green" : "lightgreen";  
        ctx.fillRect(snake[i].x, snake[i].y, box, box);  
        ctx.strokeStyle = "black";  
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);  
    }  

    if (gameOver()) return alert("Game Over! Điểm số của bạn: " + score);  
}  

function gameOver() {  
    const head = snake[0];  
    for (let i = 1; i < snake.length; i++) {  
        if (head.x === snake[i].x && head.y === snake[i].y) {  
            return true;  
        }  
    }  
    return false;  
}  

setInterval(gameLoop, 100);
