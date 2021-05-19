let avatar;
let app = new PIXI.Application(
    {
        width: 800,
        height: 600,
        backgroundColor: 0x808080
    }
);
document.body.appendChild(app.view);

//creating an avatar for the player
avatar = new PIXI.Sprite.from("assets/protagonist.png");
avatar.anchor.set(0.5);
avatar.x = 27
avatar.y = 570

app.stage.addChild(avatar);

let keys = {};
//keyboard event handlers
window.addEventListener("keydown", keysDown);
window.addEventListener("keyup", keysUp);

//game updates every tick
app.ticker.add(gameLoop);
//detects when key is pressed 
function keysDown(e) {
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}

let gravity = 0.9
let isJumping = false //prevents double jump 
function jump() {
    if (isJumping) return
    let timerUpID = setInterval(function () { //the setInterval method allows me to create a function that runs every certain interval of time
        if (avatar.y < 450) {
            clearInterval(timerUpID) // stops permanent jumping 
            let timerDownID = setInterval(function () {
                if (avatar.y > 570) {
                    clearInterval(timerDownID) //stops permanent fall
                    isJumping = false
                }
                avatar.y += 4
            }, 20)
        }
        isJumping = true
        avatar.y -= 5
        avatar.y = avatar.y * gravity //gradually decreases the height following a jump
    }, 20)
}

let bullets = [];
let bulletSpeed = 10;

function fire() {
    //add shooting function here
    console.log("Fire!");
    let bullet = createBullet();
    bullets.push(bullet);
}
function createBullet() { // is responsible for creating the bullets
    let bullet = new PIXI.Sprite.from("assets/protagbullet.png");
    bullet.anchor.set(0.5);
    bullet.x = avatar.x;
    bullet.y = avatar.y;
    bullet.speed = bulletSpeed;
    app.stage.addChild(bullet);

    return bullet;
}

function updateBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].position.x += bullets[i].speed;
    }
}

function gameLoop() {
    updateBullets();
    //Z makes the player go up the screen by increasing the y position by 5 every tick.
    if (keys["90"]) {
        jump()
    }
    //X          
    if (keys["88"]) {
        fire()
    }
    //Left arrow
    if (keys["37"]) {
        avatar.x -= 5;
    }
    //Right arrow
    if (keys["39"]) {
        avatar.x += 5;
    }

}

