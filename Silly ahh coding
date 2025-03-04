var canvas = document.getElementById("myCanvas");
canvas.style.backgroundColor = "#B2AC88";
var ctx = canvas.getContext("2d");
//ball
var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 4;
var dy = -4;
//paddle
var paddleHeight = 10;
var paddleWidth = 100;
var paddleX = (canvas.width-paddleWidth)/2;
//keys
var rightPressed = false;
var leftPressed = false;
//bricks
var brickRowCount = 8;
var brickColumnCount = 5;
var brickWidth = 50;
var brickHeight = 15;
var brickPadding = 3;
var brickOffsetTop = 30;
var brickOffsetLeft = 28;
//score
var score = 0;
var lives = 3;
//new ball
var newBallActive = false;
var newBallX = canvas.width / 2;
var newBallY = canvas.height - 30;
var newBallDx = 4;
var newBallDy = -4;

//loop through rows and columns to create bricks
    var bricks = [];
    for(var c=0; c<brickColumnCount; c++) {
        bricks[c] = [];
        for(var r=0; r<brickRowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
//event listeners
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

//key handlers
    function keyDownHandler(e) {
        if(e.code  == "ArrowRight") {
            rightPressed = true;
        }
        else if(e.code == 'ArrowLeft') {
            leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if(e.code == 'ArrowRight') {
            rightPressed = false;
        }
        else if(e.code == 'ArrowLeft') {
            leftPressed = false;
        }
    }

    //key handlers
    function keyDownHandler(e) {
        if(e.code == "ArrowRight" || e.code == "KeyD") {
            rightPressed = true;
        }
        else if(e.code == "ArrowLeft" || e.code == "KeyA") {
        leftPressed = true;
        }
    }

    function keyUpHandler(e) {
        if(e.code == "ArrowRight" || e.code == "KeyD") {
            rightPressed = false;
        }
        else if(e.code == "ArrowLeft" || e.code == "KeyA") {
            leftPressed = false;
        }
    }


    //mouse handler
    function mouseMoveHandler(e) {
        var relativeX = e.clientX - canvas.offsetLeft;
        if(relativeX > 0 && relativeX < canvas.width) {
            paddleX = relativeX - paddleWidth/2;
        }
    }


    //collision detection
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
                            alert("LEVEL COMPLETE!");
                            resetLevel();
                        }
                    }
                    if (newBallActive && newBallX > b.x && newBallX < b.x + brickWidth && newBallY > b.y && newBallY < b.y + brickHeight) {
                        newBallDy = -newBallDy;
                        b.status = 0;
                        score++;
                        if (score == brickRowCount * brickColumnCount) {
                            alert("LEVEL COMPLETE!");
                            resetLevel();
                        }
                    }
                }
            }
        }
    }
    //draw functions
    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI*2);
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
    //draw paddle
    function drawPaddle() {
        ctx.beginPath();
        ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.closePath();
    }
    // Function to reset bricks and lives
    function resetLevel() {
    // Reset bricks
        for (var c = 0; c < brickColumnCount; c++) {
            for (var r = 0; r < brickRowCount; r++) {
                bricks[c][r].status = 1;
            }
        }
        // Reset lives
        lives = 3;
        // Reset score
        score = 0;
        // Reset ball position and speed
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 4;
        dy = -4;
        // Reset paddle position
        paddleX = (canvas.width - paddleWidth) / 2;
        // Reset new ball
        newBallActive = false;
        newBallX = canvas.width / 2;
        newBallY = canvas.height - 30;
        newBallDx = 4;
        newBallDy = -4;
    }

    //draw bricks
    function drawBricks() {
        for(var c=0; c<brickColumnCount; c++) {
            for(var r=0; r<brickRowCount; r++) {
                if(bricks[c][r].status == 1) {
                    var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
                    var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
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
    //draw score
    function drawScore() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("Score: "+score, 8, 20);
    }
    //draw lives
    function drawLives() {
        ctx.font = "16px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText("Lives: "+lives, canvas.width-65, 20);
    }

    //draw and ifs for ball movement, lives, and paddle movement
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBricks();
        drawBall();
        drawPaddle();
        drawScore();
        drawLives();
        collisionDetection();

        if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
            dx = -dx;
        }
        if(y + dy < ballRadius) {
            dy = -dy;
        }
        else if(y + dy > canvas.height-ballRadius) {
            if(x > paddleX && x < paddleX + paddleWidth) {
                dy = -dy;
            }
            else {
                lives--;
                if(!lives) {
                    alert("GAME OVER");
                    document.location.reload();
                }
                else {
                    x = canvas.width/2;
                    y = canvas.height-30;
                    dx = 4;
                    dy = -4;


                    paddleX = (canvas.width-paddleWidth)/2;
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
                    newBallDx = 4;
                    newBallDy = -4;
                    newBallActive = false
                }
            }
        
            newBallX += newBallDx;
            newBallY += newBallDy;
        }

        if (score > 0) {
            dx = dx * 1.0007;
            dy = dy * 1.0007;
        }

        
        if (score > 10 && !newBallActive) {
            newBallActive = true;
        }

                
        if(rightPressed && paddleX < canvas.width-paddleWidth) {
            paddleX += 6;
        }
        else if(leftPressed && paddleX > 0) {
            paddleX -= 6;
        }

        x += dx;
        y += dy;
        requestAnimationFrame(draw);
    }

    //call draw
    draw();
