﻿/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/ally.ts" />
/// <reference path="../objects/space.ts" />
/// <reference path="../objects/allien.ts" />
/// <reference path="../objects/asteroid.ts" />
/// <reference path="../objects/scoreboards.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../game.ts" />


module states {
    // GAME PLAY STATE CLASS
    export class GamePlay {
        // Game Objects 
        public game: createjs.Container;
        public scoreboard: objects.ScoreBoard;
        public allien: objects.Allien;
        public ally: objects.Ally;
        public asteroids: objects.Asteroid[] = [];
        public space: objects.Space;
        public checkArray: number;
        public blacksquare: createjs.Bitmap;

        constructor() {
            // Instantiate Game Container
            this.game = new createjs.Container();
             
            this.blacksquare = new createjs.Bitmap(assetLoader.getResult("blcksquare"));
            //this.game.addChild(this.blacksquare);

            //Space object
            this.space = new objects.Space();
            this.game.addChild(this.space);

            //Ally object
            this.ally = new objects.Ally();
            this.game.addChild(this.ally);

            //Allien object
            this.allien = new objects.Allien();
            this.game.addChild(this.allien);

            //Asteroid object
            for (var asteroid = 2; asteroid >= 0; asteroid--) {
                this.asteroids[asteroid] = new objects.Asteroid();
                this.game.addChild(this.asteroids[asteroid]);
            }


            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);

            // Add blacksquare to Stage
            //stage.addChild(this.blacksquare);
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
                        if (collider.name == "asteroid") {

                            this.scoreboard.allienHp -= 33.33;
                            this.asteroids[this.checkArray].reset();

                            if (this.scoreboard.allienHp < 1) {
                                this.scoreboard.lives--;
                                this.scoreboard.allienHp = 100;
                                this.asteroids[this.checkArray].reset();
                            }                           
                        }
                        if (collider.name == "ally") {
                            this.scoreboard.score += 100;
                            this.ally.reset();
                        }
                    }
                    collider.isColliding = true;
                } else {
                    collider.isColliding = false;
                }
            }
        } // checkCollision Method

        //UPDATE OBJECTS FUNCTION
        public update() {

            this.space.update();

            this.ally.update();

            this.allien.update();

            for (var asteroid = 2; asteroid >= 0; asteroid--) {
                this.asteroids[asteroid].update();
                this.checkArray = asteroid;
                this.checkCollision(this.asteroids[asteroid]);
            }

            this.checkCollision(this.ally);


            this.scoreboard.update();

            //check score
            if (this.scoreboard.score >= 500)
            {   
                //Move to next level if score >= 500
                this.game.removeAllChildren();
                createjs.Sound.stop();
                stage.removeChild(this.game);
                currentScore = this.scoreboard.score;
                currentLives = this.scoreboard.lives;
                currentHP = this.scoreboard.allienHp;
                currentState = constants.PLAY_STATE_LEVEL_2;
                stateChanged = true;

                //this.fadeOut(this.game, 10000);
                //console.log("Out of fade!");
            }

            //Check Alien's lives
            if (this.scoreboard.lives < 1) {
                this.scoreboard.active = false;
                createjs.Sound.stop();
                currentScore = this.scoreboard.score;
                if (currentScore > highScore) {
                    highScore = currentScore;
                }
                
                
                //this.fadeOut(this.game, 10000);
                //console.log("Out of fade!");

                 
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.GAME_OVER_STATE;
                stateChanged = true;
                



                /**
                var duration = 3000;
                for (var i = 0; i <= 1; i += 0.01) {
                    //setTimeout(SetOpa(i), i * duration);
                    setTimeout(() => { this.SetOpa(i); }, 3000)
                    //setTimeout(c
                }*/
               
                //this.game.alpha = 0.3;
                //alpha(opacity=' + (Opa * 100)
     
            }

            stage.update(); // Refreshes our stage

        } // Update Method

        public SetOpa(Opa)
        {
            this.game.alpha = Opa;
            console.log(Opa);
          //alpha(opacity=' + (Opa * 100)
        }

        public fadeOut(elem, time) {
        var startOpacity = elem.alpha || 1;
        elem.alpha = startOpacity;

        (function go() {
            console.log("Inside of fade!");
            elem.alpha -= startOpacity / (time / 100);

            if(elem.alpha > 0)
                setTimeout(go, 100);
        })();
    }
       

    } // GamePlay Class


} // States Module