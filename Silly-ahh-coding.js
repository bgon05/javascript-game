var canvas = document.getElementById("myCanvas");
canvas.style.backgroundColor = "#B2AC88";
var ctx = canvas.getContext("2d");
//ball
var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 3;
var dy = -3;
//paddle
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth) / 2;
//keys
var rightPressed = false;
var leftPressed = false;
//bricks
var brickRowCount = 8;
var brickColumnCount = 5;
var brickWidth = 50;
var brickHeight = 15;
var brickPadding = 3;
var brickOffsetTop = 45;
var brickOffsetLeft = 28;
//score
var score = 0;
var lives = 3;
//new ball
var newBallActive = false;
var newBallX = canvas.width / 2;
var newBallY = canvas.height - 30;
var newBallDx = 3;
var newBallDy = -3;

//loop through rows and columns to create bricks
var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

//event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

//key handlers
function keyDownHandler(e) {
  if (e.code == "ArrowRight") {
    rightPressed = true;
  } else if (e.code == "ArrowLeft") {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.code == "ArrowRight") {
    rightPressed = false;
  } else if (e.code == "ArrowLeft") {
    leftPressed = false;
  }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}

function collisionDetection() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status == 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
        if (newBallActive && newBallX > b.x && newBallX < b.x + brickWidth && newBallY > b.y && newBallY < b.y + brickHeight) {
          newBallDy = -newBallDy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.closePath();

  if (newBallActive) {
    ctx.beginPath();
    ctx.arc(newBallX, newBallY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#5D382F"; // diff color for the new ball
    ctx.fill();
    ctx.closePath();
  }
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#590016";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

const frameRate = 120;
const frameTime = 1000 / frameRate;
let lastTime = 0;
let fps = 0;
let fpsInterval = 1000;
let fpsLastTime = 0;

function draw(currentTime) {
  const deltaTime = currentTime - lastTime;
  if (deltaTime < frameTime) {
    requestAnimationFrame(draw);
    return;
  }
  lastTime = currentTime;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives--;
      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (newBallActive) {
    if (newBallX + newBallDx > canvas.width - ballRadius || newBallX + newBallDx < ballRadius) {
      newBallDx = -newBallDx;
    }
    if (newBallY + newBallDy < ballRadius) {
      newBallDy = -newBallDy;
    } else if (newBallY + newBallDy > canvas.height - ballRadius) {
      if (newBallX > paddleX && newBallX < paddleX + paddleWidth) {
        newBallDy = -newBallDy;
      } else {
        // Reset the new ball's position without subtracting a life
        newBallX = canvas.width / 2;
        newBallY = canvas.height - 30;
        newBallDx = 3;
        newBallDy = -3;
        newBallActive = false;
      }
    }

    newBallX += newBallDx * (deltaTime / frameTime);
    newBallY += newBallDy * (deltaTime / frameTime);
  }

  if (score === 10 && !newBallActive) {
    newBallActive = true;
  } 

  if (score === 20) {
    newBallActive = false;
  }

  if (score === 30) {
    newBallActive = true;
    }

  if (score > 0) {
    dx = dx * 1.0003;
    dy = dy * 1.0003;
  }
 

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 6 * (deltaTime / frameTime);
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 6 * (deltaTime / frameTime);
  }

  x += dx * (deltaTime / frameTime);
  y += dy * (deltaTime / frameTime);

  // Calculate FPS
  if (currentTime - fpsLastTime > fpsInterval) {
    fps = Math.round(1000 / deltaTime);
    fpsLastTime = currentTime;
  }

  // Display FPS
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("FPS: " + fps, canvas.width - 65, 40);

  requestAnimationFrame(draw);
}

function startGame() {
  lastTime = performance.now();
  requestAnimationFrame(draw);
}

document.getElementById("runButton").addEventListener("click", function () {
  startGame();
  this.disabled = true;
});

document.getElementById("stopButton").addEventListener("click", function () {
  cancelAnimationFrame(animationFrameId);
  document.getElementById("runButton").disabled = false;
});
