﻿/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/ally.ts" />
/// <reference path="../objects/boss.ts" />
/// <reference path="../objects/space.ts" />
/// <reference path="../objects/allien.ts" />
/// <reference path="../objects/planet.ts" />
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
        public boss: objects.Ally;
        public planet: objects.Planet[] = [];
        public space: objects.Space;
        public checkArray: number;

        constructor() {
            console.log("LEVEL 33");
            // Instantiate Game Container
            this.game = new createjs.Container();
             

            //Space object
            this.space = new objects.Space();
            this.game.addChild(this.space);

            //Ally object
            this.boss = new objects.Ally();
            this.game.addChild(this.boss);

            //Allien object
            this.allien = new objects.Allien();
            this.game.addChild(this.allien);

            //Planet object
            for (var planets = 3; planets >= 0; planets--) {
                this.planet[planets] = new objects.Planet();
                this.game.addChild(this.planet[planets]);
            }


            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);

            //load previous score and lives
            this.scoreboard.lives = currentLives;
            this.scoreboard.score = currentScore;
           

            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor


        // DISTANCE CHECKING METHOD
        public distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        } //Distance Method

        // CHECK COLLISION METHOD
        public checkCollision(collider: objects.GameObject) {
            if (this.scoreboard.active) {
                var alienPosition: createjs.Point = new createjs.Point(this.allien.x, this.allien.y);
                var objectPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
                var theDistance = this.distance(alienPosition, objectPosition);

                if (theDistance < ((this.allien.height * 0.5) + (collider.height * 0.5))) {

                    if (collider.isColliding != true) {
                        createjs.Sound.play(collider.sound);
                        if (collider.name == "planet") {
                            this.scoreboard.lives--;
                            this.planet[this.checkArray].reset();
                        }
                        if (collider.name == "boss") {
                            this.scoreboard.score += 100;

                        }
                    }
                    collider.isColliding = true;
                } else {
                    collider.isColliding = false;
                }
            }
        } // checkCollision Method

        public update() {

            this.space.update();

            this.boss.update();

            this.allien.update();

            for (var planets = 3; planets >= 0; planets--) {
                this.planet[planets].update();
                this.checkArray = planets;
                this.checkCollision(this.planet[planets]);
            }

            this.checkCollision(this.boss);


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