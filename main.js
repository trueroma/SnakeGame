let
    cvs, ctx, speed = 15, gridSize = 20,
    xVelocity = 0, yVelocity = 0,
    xPlayerPos = 10, yPlayerPos = 10,
    xApple = 15, yApple = 15,
    trail = [], tail = 5;

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
    ctx.fillRect(xApple * gridSize, yApple * gridSize, gridSize, gridSize);

    if (xApple === xPlayerPos && yApple === yPlayerPos) {
        tail++;
        console.log(tail);
        xApple = Math.floor(Math.random() * gridSize);
        yApple = Math.floor(Math.random() * gridSize);
    }

    ctx.fillStyle = '#0f0';
    for (let i = 0; i < trail.length; i++) {
        ctx.fillRect(trail[i].x * gridSize, trail[i].y * gridSize, gridSize - 2, gridSize - 2);
        if (trail[i].x === xPlayerPos && trail[i].y === yPlayerPos) {
            tail = 5;
        }
    }
    trail.push({
        x: xPlayerPos,
        y: yPlayerPos,
    });
    while (trail.length > tail) trail.shift();
}
const keyPush = e => {
    console.log(e.keyCode);
    switch(e.keyCode) {
        case 37: // left
        case 65:
            xVelocity = -1; yVelocity = 0;
            console.log('left');
            break;
        case 38: // down
        case 87:
            xVelocity = 0; yVelocity = -1;
            console.log('up');
            break;
        case 39: // right
        case 68:
            xVelocity = 1; yVelocity = 0;
            console.log('right');
            break;
        case 40: // up
        case 83:
            xVelocity = 0; yVelocity = 1;
            console.log('down');
            break;
    }
}
const init = () => {
    cvs = document.querySelector('#cvs');
    ctx = cvs.getContext('2d');
    // ctx.fillStyle = '#000';
    // ctx.fillRect(0, 0, cvs.height, cvs.width);
    document.addEventListener("keydown", keyPush);
    setInterval(game, 1000/speed);
    cvs.height = cvs.width = 400;
}
document.addEventListener('DOMContentLoaded', init);