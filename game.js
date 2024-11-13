// game.js

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Speler-object
let player = {
    x: 50,
    y: canvas.height - 60,
    width: 40,
    height: 40,
    color: "green",
    speed: 5,
    velocityY: 0,
    jumpPower: -15,
    isJumping: false,
};

const gravity = 0.8;
let platforms = [
    { x: 100, y: canvas.height - 100, width: 200, height: 20 },
    { x: 400, y: canvas.height - 200, width: 200, height: 20 },
    { x: 700, y: canvas.height - 300, width: 200, height: 20 },
];

// Teken de speler
function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Teken de platforms
function drawPlatforms() {
    ctx.fillStyle = "blue";
    platforms.forEach(platform => {
        ctx.fillRect(platform.x, platform.y, platform.width, platform.height);
    });
}

// Update de speler
function updatePlayer() {
    // Voeg zwaartekracht toe
    player.velocityY += gravity;
    player.y += player.velocityY;

    // Beperk de speler aan de onderkant van het canvas
    if (player.y + player.height >= canvas.height) {
        player.y = canvas.height - player.height;
        player.isJumping = false;
    }

    // Platformdetectie
    platforms.forEach(platform => {
        if (
            player.x < platform.x + platform.width &&
            player.x + player.width > platform.x &&
            player.y + player.height > platform.y &&
            player.y + player.height < platform.y + platform.height
        ) {
            player.y = platform.y - player.height;
            player.isJumping = false;
        }
    });
}

// Hoofd gameloop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawPlatforms();
    updatePlayer();

    requestAnimationFrame(gameLoop);
}

// Spelerinvoer
function handleInput(event) {
    if (event.key === "ArrowRight") player.x += player.speed;
    if (event.key === "ArrowLeft") player.x -= player.speed;
    if (event.key === " " && !player.isJumping) {
        player.velocityY = player.jumpPower;
        player.isJumping = true;
    }
}

// Voeg eventlistener toe voor toetsenbordinvoer
window.addEventListener("keydown", handleInput);

// Start de gameloop
gameLoop();
