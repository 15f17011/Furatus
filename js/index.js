let app;
let avatar;
let keys = {};

    window.onload = function() {
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
        avatar.x = app.view.width / 2;
        avatar.y = app.view.height / 2;

        app.stage.addChild(avatar);

        //keyboard event handlers
        window.addEventListener("keydown", keysDown);
        window.addEventListener("keyup", keysUp);

        //game updates every tick
        app.ticker.add(gameLoop);
        //detects when key is pressed and outputs the key iD
        function keysDown(e) {
            console.log(e.keyCode);
            keys[e.keyCode] = true;
        }

        function keysUp(e) {
            keys[e.keyCode] = false;
        }
            
        function gameLoop(){
            //Z makes the player go up the screen by increasing the y position by 5 every tick.
            if (keys["90"]) {
                avatar.y -= 5;
            }
            //X          
            if (keys["88"]) {
                //add shooting here
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

    }