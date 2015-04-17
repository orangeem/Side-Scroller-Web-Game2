
module objects {
    // ALLIEN CLASS
    export class Allien extends createjs.Bitmap {
        public width: number;
        public height: number;
        
        // CONSTRUCTOR
        constructor() {
            super(assetLoader.getResult("allien"));

            this.width = this.getBounds().width;
            this.height = this.getBounds().height;

            this.x = 35;
            this.y = 240;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            
            if (currentState == constants.PLAY_STATE_LEVEL_3) {
                createjs.Sound.play("soundtrack3", { loop: -1 });
            } else {
                createjs.Sound.play("soundtrack", { loop: -1 });
            }

            // Set up movement and controls
            this.assignControls()
        }

        // PUBLIC METHODS
        public update() {
            // Return if game currently paused
            
            if (constants.MENU_STATE) {
                this.y = stage.mouseY;
                this.x = stage.mouseX;
            } else {            
                if (controls.down == true && this.y < 450) {
                    this.y += 3;
                    stage.mouseY = this.y;
                } else if (controls.up == true && this.y > 30) {
                    this.y -= 3;
                    stage.mouseY = this.y;
                } else if (controls.left == true && this.x > 30) {
                    this.x -= 3;
                    stage.mouseX = this.x;
                } else if (controls.right == true && this.x < 610) {
                    this.x += 3;
                    stage.mouseX = this.x;
                }
            }
        }
            
        assignControls() {
            // Binds key actions
            window.onkeydown = this.onControlDown;            
            window.onkeyup = this.onControlUp;
            
        }

        onControlDown(e) {
            // Basic switch statement to set
            // our controls to true onKeyDown
            switch (e.which) {
                case keys.LEFT:
                case keys.A:
                    controls.left = true;
                    break;
                case keys.RIGHT:
                case keys.D:
                    controls.right = true;
                    break;
                case keys.UP:
                case keys.W:
                    controls.up = true;                    
                    break;
                case keys.DOWN:
                case keys.S:
                    controls.down = true;
                    controls.rTally++;
                    controls.lTally = 0;
                    break;
                case keys.SPACEBAR:
                    constants.BULLET_Y = stage.mouseY;
                    constants.BULLET_X = stage.mouseX;
                    //bullet = new objects.Bullet(stage, game);
                    break;
                
            }
        }

        onControlUp(e) {
            // Basic switch statement to set
            // our controls to true onKeyUp
            switch (e.which) {
                case keys.LEFT:
                case keys.A:
                    controls.left = false;
                    break;
                case keys.RIGHT:
                case keys.D:
                    controls.right = false;
                    break;
                case keys.W:
                case keys.UP:
                    controls.up = false;
                    break;
                case keys.S:
                case keys.DOWN:
                    controls.down = false;
                    break;
                case keys.SPACEBAR:
                    controls.spacebar = false;                
                    break;
            }
        }
    }

} 