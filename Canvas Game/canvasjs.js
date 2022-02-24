const canvas = document.querySelector('.canvas-container');
const ctx = canvas.getContext('2d');
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;

const ballRadius = 10;

let paddleHeight = 10;
let paddleWidth = 175;
let paddleX = (canvas.width - paddleWidth) / 2;

let rightPressed = false;
let leftPressed = false;

const brickRowCount = 3;
const brickColumnCount = 7;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 20;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let gameScore = 0;

const bricks = [];

for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgb(67 160 35)';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = 'rgb(67 160 35)';
    ctx.fill();
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();

    detectCollision();

    x = x + dx;
    y = y + dy;

    if (x > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }

    if (y > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            //lost
            alert('Sorry, you lost! Start a new game');
            clearGame();
            startGame();
        }
    }

    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    } else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }
}

function movePaddle(event) {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
        rightPressed = true;
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
        leftPressed = true;
    }
}

function stopPaddle(event) {
    if (event.key === 'Right' || event.key === 'ArrowRight') {
        rightPressed = false;
    } else if (event.key === 'Left' || event.key === 'ArrowLeft') {
        leftPressed = false;
    }
}

function drawBricks() {
    bricks.map((column, columnIndex) =>
        column.map((brick, brickIndex) => {
            if (brick.status === 1) {
                brick.x = columnIndex * (brickWidth + brickPadding) + brickOffsetLeft;
                brick.y = brickIndex * (brickHeight + brickPadding) + brickOffsetTop;
                ctx.beginPath();
                ctx.rect(brick.x, brick.y, brickWidth, brickHeight);
                ctx.fillStyle = '#0095DD';
                ctx.fill();
                ctx.closePath();
            }
        })
    );
}

/*
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            var brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = '#0095DD';
            ctx.fill();
            ctx.closePath();
        }
    }
}


*/

function detectCollision() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x - ballRadius && x < b.x + brickWidth + ballRadius && y > b.y - ballRadius && y < b.y + brickHeight + ballRadius) {
                    b.status = 0;
                    dy = -dy;

                    addScore();
                }
            }
        }
    }
}

function addScore(lost) {
    gameScore++;
    if (gameScore >= brickRowCount * brickColumnCount) {
        alert('Congrats, you won! Start a new game');
        clearGame();
        startGame();
    }
}

function drawScore() {
    ctx.font = '25px Arial';
    ctx.fillStyle = '#0095DD';
    ctx.fillText('Score: ' + gameScore, (canvas.width - 100) / 2, 25);
}

function clearGame() {
    clearInterval(interval);
}

function startGame() {
    document.location.reload();
}

const interval = setInterval(draw, 10);

document.addEventListener('keydown', movePaddle);
document.addEventListener('keyup', stopPaddle);
