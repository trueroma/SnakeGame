let
    cvs, ctx, speed = 15, gridSize = 20, tileCount,
    xVelocity = 0, yVelocity = 0,
    xPlayerPos = 10, yPlayerPos = 10,
    xApple = 15, yApple = 15,
    trail = [], tail = 5,
    start, isPaused = false,
    score, currScore = 0;
const game = () => {
    xPlayerPos += xVelocity;
    yPlayerPos += yVelocity;

    if (xPlayerPos < 0) {
        xPlayerPos = gridSize - 1;
    } else if (xPlayerPos > gridSize - 1) {
        xPlayerPos = 0;
    } else if (yPlayerPos < 0) {
        yPlayerPos = gridSize - 1;
    } else if (yPlayerPos > gridSize - 1) {
        yPlayerPos = 0;
    }
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, cvs.height, cvs.width);

    ctx.fillStyle = '#fc2c38';
    ctx.fillRect(xApple * tileCount, yApple * tileCount, tileCount, tileCount);

    if (xApple === xPlayerPos && yApple === yPlayerPos) {
        tail++;
        currScore++;
        if (speed < 31 && currScore % 2) {
            speed++;
            clearInterval(start);
            start = setInterval(game, 1000/speed);
            console.log(speed);
        }
        score.innerHTML = currScore.toString();
        console.log(tail);
        xApple = Math.floor(Math.random() * gridSize);
        yApple = Math.floor(Math.random() * gridSize);
    }

    ctx.fillStyle = '#e5e8e8';
    for (let i = 0; i < trail.length; i++) {
        let
            fill = tileCount * .9,
            starDot = tileCount * .05;

        if (i === trail.length - 1) {
            fill = tileCount;
            starDot = 0;
        }

        ctx.fillRect(trail[i].x * tileCount + starDot, trail[i].y * tileCount + starDot, fill, fill);
        if (trail[i].x === xPlayerPos && trail[i].y === yPlayerPos) {
            tail = 3;
            currScore = 0;
            speed = 15;
            score.innerHTML = currScore;
        }
    }
    trail.push({
        x: xPlayerPos,
        y: yPlayerPos,
    });
    while (trail.length > tail) trail.shift();
}
const
    left = () => {
        xVelocity = -1; yVelocity = 0;
    },
    down = () => {
        xVelocity = 0; yVelocity = -1;
    },
    right = () => {
        xVelocity = 1; yVelocity = 0;
    },
    up = () => {
        xVelocity = 0; yVelocity = 1;
    },
    pause = () => {
        if (!isPaused) {
            clearInterval(start);
            isPaused = true;
        } else {
            start = setInterval(game, 1000/speed);
            isPaused = false;
        }
    };
const keyPush = e => {
    switch(e.keyCode) {
        case 37:
        case 65:
            left();
            break;
        case 38:
        case 87:
            down();
            break;
        case 39:
        case 68:
            right();
            break;
        case 40:
        case 83:
            up();
            break;
        case 32:
            pause();
    }
}
const init = () => {
    cvs = document.querySelector('#cvs');
    score = document.querySelector('.score');
    ctx = cvs.getContext('2d');

    const
        vw = document.documentElement.clientWidth,
        vh = document.documentElement.clientHeight;
    cvs.height = cvs.width = (vw < vh ? vw : vh) * .7;
    tileCount = cvs.width / gridSize;
    // ctx.fillStyle = '#000';
    // ctx.fillRect(0, 0, cvs.height, cvs.width);
    start = setInterval(game, 1000/speed);

    document.addEventListener("keydown", keyPush);
    document.addEventListener('touchstart', touchStartDefine);
    document.addEventListener('touchend', getDirectionTouch);
}
document.addEventListener('DOMContentLoaded', init);