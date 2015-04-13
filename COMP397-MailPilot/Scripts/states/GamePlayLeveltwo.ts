
﻿/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/ally.ts" />
/// <reference path="../objects/boss.ts" />
/// <reference path="../objects/space.ts" />

/// <reference path="../objects/allien.ts" />
/// <reference path="../objects/planet.ts" />
/// <reference path="../objects/angryplanet.ts" />
/// <reference path="../objects/space2.ts" />
/// <reference path="../objects/astronaut.ts" />
/// <reference path="../objects/redbullet.ts" />

/// <reference path="../objects/scoreboards.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../game.ts" />


module states {
    // GAME PLAY STATE CLASS
    export class GamePlayLeveltwo {
        // Game Objects 
        public game: createjs.Container;
        public scoreboard: objects.ScoreBoard;
        public allien: objects.Allien;
        public astronaut: objects.Astronaut;
        public angryplanet: objects.angryPlanet[] = [];
        public space2: objects.Space2;
        public redbullet: objects.redBullet;
        public checkArray: number;

        constructor() {
            console.log("LEVEL 2");
            // Instantiate Game Container
            this.game = new createjs.Container();
             
            //Space object
            this.space2 = new objects.Space2();
            this.game.addChild(this.space2);

            //Ally object
            this.astronaut = new objects.Astronaut();
            this.game.addChild(this.astronaut);

            //Allien object
            this.allien = new objects.Allien();
            this.game.addChild(this.allien);

            //bullet object
            this.redbullet = new objects.redBullet();
            this.game.addChild(this.redbullet);

            //bullet mouse event listener
            this.game.addEventListener("click", this.shotBullet2.bind(this), false);

            //Planet object
            for (var planets = 3; planets >= 0; planets--) {
                this.angryplanet[planets] = new objects.angryPlanet();
                this.game.addChild(this.angryplanet[planets]);
            }


            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);

            //load previous score and lives
            // this.scoreboard.lives = currentLives;
            //this.scoreboard.score = currentScore;

            //----TO CHANGE!!!!!

            this.scoreboard.lives = 3;
            this.scoreboard.score = 300;
           

            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor

        //bullet mouse event
        public shotBullet2() {

            if (constants.BULLET_FLAG == false) {

                console.log(this.allien.x);
                constants.BULLET_X = this.allien.x;
                constants.BULLET_Y = this.allien.y;
                createjs.Sound.play("bulletsound");
                this.redbullet.setPoint();

                constants.BULLET_FLAG = true;

            }
        }

        // DISTANCE CHECKING METHOD
        public distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        } //Distance Method

        // CHECK COLLISION METHOD
        public checkCollision(collider: objects.GameObject) {
            if (this.scoreboard.active) {
                var alienPosition: createjs.Point = new createjs.Point(this.allien.x, this.allien.y);
                var bulletPosition: createjs.Point = new createjs.Point(this.redbullet.x, this.redbullet.y);
                var objectPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
                var theDistance = this.distance(alienPosition, objectPosition);
                var theBulletDistance = this.distance(bulletPosition, objectPosition);

                if (theDistance < ((this.allien.height * 0.5) + (collider.height * 0.5))) {

                    if (collider.isColliding != true) {
                        createjs.Sound.play(collider.sound);
                        if (collider.name == "angryplanet") {
                            this.scoreboard.lives--;
                            this.angryplanet[this.checkArray].reset();
                        }
                        if (collider.name == "astronaut") {
                            this.scoreboard.score += 100;
                            this.astronaut.reset();
                        }
                    }
                    collider.isColliding = true;
                }
                else if (theBulletDistance < ((this.redbullet.height * 0.5) + (collider.height * 0.5))) {
                    if(this.redbullet.x > 0){
                    if (collider.isCollidingBullet != true) {
                        if (collider.name == "angryplanet") {
                            this.scoreboard.score += 50;
                            this.angryplanet[this.checkArray].reset();
                            console.log("colliding bullet - angryplanet");
                        }
                        if (collider.name == "astronaut") {
                            this.scoreboard.score -= 50;
                            this.astronaut.reset();
                            console.log("colliding bullet - astronaut");
                        }
                        createjs.Sound.play("bird");

                        this.redbullet.destroy();
                    }
                    collider.isCollidingBullet = true;
                }
                }
                else {
                    collider.isColliding = false;
                    collider.isCollidingBullet = false;
                }
            }
        } // checkCollision Method

        public update() {

            this.space2.update();

            this.astronaut.update();

            this.allien.update();

            //bullet update
            if (constants.BULLET_FLAG == true) {
                this.redbullet.update();

            } 

            for (var planets = 3; planets >= 0; planets--) {
                this.angryplanet[planets].update();
                this.checkArray = planets;
                this.checkCollision(this.angryplanet[planets]);
            }

            this.checkCollision(this.astronaut);


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