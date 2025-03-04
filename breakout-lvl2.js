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
var paddleWidth = 200;
var paddleX = (canvas.width - paddleWidth) / 2;
//keys
var rightPressed = false;
var leftPressed = false;
//bricks
var brickRowCount = 15;
var brickColumnCount = 7;
var brickWidth = 60;
var brickHeight = 15;
var brickPadding = 20;
var brickOffsetTop = 45;
var brickOffsetLeft = 45;
//score
var score = 0;
var lives = 3;
//new ball
var newBallActive = false;
var newBallX = canvas.width / 2;
var newBallY = canvas.height - 30;
var newBallDx = 3;
var newBallDy = -3;
//constant ball
var extraBallRadius = 10;
var extraBallX = canvas.width / 2;
var extraBallY = canvas.height / 2;
var extraBallDx = 2;
var extraBallDy = 2;


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
            initializeBricks();
            dx = dx * 1.001;
            dy = dy * 1.001;
          }
        }
        if (newBallActive && newBallX > b.x && newBallX < b.x + brickWidth && newBallY > b.y && newBallY < b.y + brickHeight) {
          newBallDy = -newBallDy;
          b.status = 0;
          score++;
          if (score == brickRowCount * brickColumnCount) {
            initializeBricks();
            dx = dx * 1.001;
            dy = dy * 1.001;
          }
        }
        if (extraBallX > b.x && extraBallX < b.x + brickWidth && extraBallY > b.y && extraBallY < b.y + brickHeight) {
            extraBallDy = -extraBallDy;
            b.status = 0;
            score++;
            if (score == brickRowCount * brickColumnCount) {
              initializeBricks();
              dx = dx * 1.000001;
              dy = dy * 1.000001;
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
  ctx.fillStyle = "#5D382F";
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

function newLevel() {
    ctx.font = "25px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Level 2", canvas.width - 650, 25);
    return false; 
}

function drawLives() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// Function to initialize the bricks
function initializeBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
      bricks[c] = [];
      for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
      }
    }
  }
  
  // Initialize bricks at the start of the game
initializeBricks();

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

  function drawExtraBall() {
    ctx.beginPath();
    ctx.arc(extraBallX, extraBallY, extraBallRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#000000"; // color for the extra ball
    ctx.fill();
    ctx.closePath();
  }
  
  function updateExtraBall() {
    if (extraBallX + extraBallDx > canvas.width - extraBallRadius || extraBallX + extraBallDx < extraBallRadius) {
      extraBallDx = -extraBallDx;
    }
    if (extraBallY + extraBallDy > canvas.height - extraBallRadius || extraBallY + extraBallDy < extraBallRadius) {
      extraBallDy = -extraBallDy;
    }
  
    extraBallX += extraBallDx;
    extraBallY += extraBallDy;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
    if (score > 105) {
        newLevel();
        drawExtraBall();
        updateExtraBall();
    }
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
        if (newBallY + newBallDy > canvas.height - ballRadius) {
            newBallActive = false;
        }
      }
    }

    newBallX += newBallDx * (deltaTime / frameTime);
    newBallY += newBallDy * (deltaTime / frameTime);
  }

  
  if (score > 0) {
        dx = dx * 1.0002;
        dy = dy * 1.0002;
    }

    if (score === 30 && !newBallActive) {
        newBallActive = true;
    } 

    if (score === 50) {
        newBallActive = true;
    }

    if (score === 70) {
        newBallActive = true;
    }

    if (score === 90) {
        newBallActive = true;
        dx = dx * 1.0001;
        dy = dy * 1.0001;
    }

    if (score === 105) {
        newBallActive = true;
        lives = 3;
    }

    if (score === 120) {
        newBallActive = true;
    }

    if (score === 150) {
        newBallActive = true;
    }

    if (score === 180) {
        newBallActive = true;
    }

    if (score === 210) {
        alert("You win. congrats!");
        document.location.reload();
    }

    


    


  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 8 * (deltaTime / frameTime);
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 8 * (deltaTime / frameTime);
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
