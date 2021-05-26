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

let bullets = []; //create an empty array to store bullets in
let leftBullets = [];
let bulletSpeed = 10;
let leftBulletSpeed = -10

function fire() {
    console.log("Fire!");
    let bullet = createBullet();
    bullets.push(bullet);
}

function leftFire() {
    console.log("Left Fire!");
    let leftBullet = createBullet();
    bullets.push(leftBullet);
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

function createLeftBullet() { //will create bullets fired behind the player
    let leftBullet = new PIXI.Sprite.from("assets/protagbullet.png");
    leftBullet.anchor.set(0.5);
    leftBullet.x = avatar.x;
    leftBullet.y = avatar.y;
    leftBullet.speed= leftBulletSpeed;

    return leftBullet;

}

function updateBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].position.x += bullets[i].speed; //bullets move to the right when x is pressed

    for (let i= 0); i < leftBullets.length; i++) { //bullets fired to the left 
        leftBullets[i].position.x += leftBullets[i].speed;
    }

        function resetObservation() {
            let observationStartPoint = null;
            let observationDistance = 0;
            let observationCallback = () => {};
    
        }
    
        function observeDistance(distance, callback) {
            observationStartPoint = avatar.x;
            observationDistance = distance;
            observationCallback = callback;
        }

        if (this.observationDistance > 0){
            let diff = Math.abs(bullet.x - observationStartPoint);
            if (diff > observationDistance) {
                    observationCallback();
                    resetObservation();
                  }
                }
            }
        }    

        observeDistance(150, () => {
            bullets[i].dead = true; //bullets are dead when they leave the stage
        }) 
        

    

    
    for(let i = 0; i < bullets.length; i++) {
        if (bullets[i].dead) {
            app.stage.removeChild(bullets[i]); //removes dead bullets from stage
            bullets.splice(i, 1); //removes dead bullets from array
        }

    }

function areKeysBeingPressed(arr) {
      for(key of arr) {
        if(!keys[key]) {
           return false;
        }
    }

    return true;
}
const allKeys = areKeysBeingPressed(["88", "37"]);


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
    if (allKeys = true) {
        leftFire()
    }
    //left arrow and x
    //Left arrow
    if (keys["37"]) {
        avatar.x -= 5;
    }
    //Right arrow
    if (keys["39"]) {
        avatar.x += 5;
    }

}

