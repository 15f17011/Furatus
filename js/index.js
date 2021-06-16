let avatar;
var Engine = Matter.Engine,
  Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Body = Matter.Body;

var engine = Engine.create();
var bottomWall = Bodies.rectangle(400, 350, 720, 20, { isStatic: true });

class GameObject{
    constructor(pixiData, matterData) {
        this.pixiData = pixiData;
        this.matterData = matterData;
    }
}

let protagonist = new GameObject(PIXI.Sprite.from("assets/protagonist.png"), Bodies.rectangle(27, 570, 50, 50))
World.add(engine.world, [bottomWall]);

let app = new PIXI.Application(
    {
        width: 800,
        height: 600,
        backgroundColor: 0x808080
    }
);
document.body.appendChild(app.view);

//creating an avatar for the player (currently causing errors)
//protagonist.anchor.set(0.5);
//app.stage.addChild(protagonist);

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
/*function jump() {
    if (isJumping) return
    let timerUpID = setInterval(function () { //the setInterval method allows me to create a function that runs every certain interval of time
        if (avatar.y < 450) {
            clearInterval(timerUpID) // stops permanent jumping 
            let timerDownID = setInterval(function () {
                if (avatar.y > 562) {
                    clearInterval(timerDownID) //stops permanent fall
                    isJumping = false
                }
                avatar.y += 4
            }, 20)
        }
        isJumping = true
        avatar.y -= 10 //gradually decreases the height following a jump
    }, 20)
} */

let bullets = []; //create an empty array to store bullets in
let bulletSpeed = 10;
let leftBullets = [];
let leftBulletSpeed = -10;
let lastBulletTime = 0;

function fire(left) {
    console.log("Fire!");
    let bullet = createBullet(left);
    bullets.push(bullet);
}

function createBullet(left) { // is responsible for creating the bullets
    let bullet = new PIXI.Sprite.from("assets/protagbullet.png");
    bullet.anchor.set(0.5);
    bullet.startx = avatar.x;
    bullet.x = avatar.x;
    bullet.y = avatar.y;
    if(left) {
        bullet.speed = -bulletSpeed;
    } else {
        bullet.speed = bulletSpeed;
    }
    app.stage.addChild(bullet);

    return bullet;
}

function updateBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].x += bullets[i].speed; //bullets move to the right when x is pressed
        if (bullets[i].x > 800 || bullets[i].x < 0) {
            bullets[i].dead = true;
        }
        if (bullets[i].dead) { //removes bullets that are out of screen.
            app.stage.removeChild(bullets[i]);
            bullets.splice(i, 1);

        }
    }
}

function gameLoop() {
    updateBullets();
    //Z makes the player go up the screen by increasing the y position by 5 every tick.
    if (keys["90"]) {
        Body.setVelocity( avatar, {x: 0, y: -10});
    }
    //X          
    if (keys["67"]) {
        let now = Date.now(); //number of milliseconds since 1/1/1970

        if ((now - lastBulletTime) > 300) { //lastBulletTime is initially 0, so this will always fire straight away
            fire(false);
            lastBulletTime = now; //updates the last time a bullet was fired.
        }
    }
    //C
    if (keys["88"]) {
        let now = Date.now();

        if ((now - lastBulletTime) > 300) {
            fire(true);
            lastBulletTime = now;
        }
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
