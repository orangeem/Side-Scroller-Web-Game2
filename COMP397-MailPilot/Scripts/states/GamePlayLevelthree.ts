/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/ally.ts" />
/// <reference path="../objects/boss.ts" />
/// <reference path="../objects/space3.ts" />
/// <reference path="../objects/allien.ts" />
/// <reference path="../objects/planet.ts" />
/// <reference path="../objects/scoreboards.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/bullet.ts" />
/// <reference path="../game.ts" />


module states {
    // GAME PLAY STATE CLASS
    export class GamePlayLevelthree {
        // Game Objects 
        public game: createjs.Container;
        public scoreboard: objects.ScoreBoard;
        public allien: objects.Allien;
        public boss: objects.Boss;
        public planets: objects.Planet[] = [];
        public space: objects.Space3;
        public bullet: objects.Bullet;
        public checkArray: number;
        public check_x: number;
        

        constructor() {
            
            // Instantiate Game Container
            this.game = new createjs.Container();
            
            //Space object
            this.space = new objects.Space3();
            this.game.addChild(this.space);

            //Boss object
            this.boss = new objects.Boss(stage, this.game);
           // this.game.addChild(this.boss);

            //Allien object
            this.allien = new objects.Allien();
            this.game.addChild(this.allien);

            //bullet object
            this.bullet = new objects.Bullet();
            this.game.addChild(this.bullet);

            
            //Planet object
            for (var planet = 3; planet >= 0; planet--) {
                this.planets[planet] = new objects.Planet();
                this.game.addChild(this.planets[planet]);
            }

            //bullet mouse event listener
            this.game.addEventListener("click", this.shotBullet2.bind(this),false);
            
            
            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);

            //load previous score and lives
            this.scoreboard.lives = currentLives;
            this.scoreboard.score = currentScore;
           

            // Add Game Container to Stage
            stage.addChild(this.game);

        } // Constructor

               
        //bullet mouse event
        public shotBullet2() {

            if (constants.BULLET_FLAG == false) {

                console.log(this.allien.x);
                constants.BULLET_X = this.allien.x;
                constants.BULLET_Y = this.allien.y;
                
                this.bullet.setPoint();

                constants.BULLET_FLAG = true;
                
            }
        }

        // DISTANCE CHECKING METHOD
        public distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        } //Distance Method

        // CHECK COLLISION METHOD
        public checkBossCollision(collider: objects.Boss) {
            if (this.scoreboard.active) {
                var alienPosition: createjs.Point = new createjs.Point(this.allien.x, this.allien.y);
                var bulletPosition: createjs.Point = new createjs.Point(this.bullet.x, this.bullet.y);
                var objectPosition: createjs.Point = new createjs.Point(collider.image.x, collider.image.y);
                var theDistance = this.distance(alienPosition, objectPosition);
                var theBulletDistance = this.distance(bulletPosition, objectPosition);

                if (theDistance < ((this.allien.height * 0.5) + (collider.height * 0.5))) {
                    if (collider.isColliding != true) {
                        //createjs.Sound.play(collider.sound);                        
                        this.scoreboard.lives--;
                    }
                    collider.isColliding = true;

                } else if (theBulletDistance < ((this.bullet.height * 0.5) + (collider.height * 0.5))) {
                    if (collider.isColliding != true) {
                        //  createjs.Sound.play(collider.sound);
                        this.scoreboard.score += 50;
                        this.planets[this.checkArray].reset();
                        this.bullet.destroy();


                    }
                    collider.isColliding = true;
                } else {
                    collider.isColliding = false;
                }
            }
            
        } // checkCollision Method

        public checkCollision(collider: objects.GameObject) {
            if (this.scoreboard.active) {
                var alienPosition: createjs.Point = new createjs.Point(this.allien.x, this.allien.y);
                var bulletPosition: createjs.Point = new createjs.Point(this.bullet.x, this.bullet.y);
                var objectPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
                var theDistance = this.distance(alienPosition, objectPosition);
                var theBulletDistance = this.distance(bulletPosition, objectPosition);

                if (theDistance < ((this.allien.height * 0.5) + (collider.height * 0.5))) {

                    if (collider.isColliding != true) {
                        createjs.Sound.play(collider.sound);
                        if (collider.name == "planet") {
                            this.scoreboard.lives--;
                            this.planets[this.checkArray].reset();
                        }
                        if (collider.name == "boss") {
                            this.scoreboard.score += 100;
                        }
                    }
                    collider.isColliding = true;
                } else if (theBulletDistance < ((this.bullet.height * 0.5) + (collider.height * 0.5))) {

                    if (collider.isColliding != true) {
                        createjs.Sound.play(collider.sound);
                        if (collider.name == "planet") {
                            this.scoreboard.score += 50;
                            this.planets[this.checkArray].reset();
                            this.bullet.destroy();
                        }
                        if (collider.name == "boss") {
                            this.scoreboard.score += 100;
                            this.bullet.destroy();
                        }
                    }
                    collider.isColliding = true;
                }

                else {
                    collider.isColliding = false;
                }
            }
        } // checkCollision Method

        public update() {

            this.space.update();

            this.boss.update();

            this.allien.update();

            //bullet update
            if (constants.BULLET_FLAG == true) {
                this.bullet.update();
                
            } 

            for (var planet = 3; planet >= 0; planet--) {
                this.planets[planet].update();
                this.checkArray = planet;
                this.checkCollision(this.planets[planet]);
            }

            this.checkBossCollision(this.boss);
            
            this.scoreboard.update();
            

            //Check Alien's lives
            if (this.scoreboard.lives < 1) {
                this.scoreboard.active = false;
                createjs.Sound.stop();
                currentScore = this.scoreboard.score;
                if (currentScore > highScore) {
                    highScore = currentScore;
                }
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.GAME_OVER_STATE;
                stateChanged = true;
            }

            stage.update(); // Refreshes our stage

        } // Update Method           

    } // GamePlay Class

} // States Module  