/// <reference path="../constants.ts" />
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
var states;
(function (states) {
    // GAME PLAY LEVEL TWO STATE CLASS
    var GamePlayLeveltwo = (function () {
        function GamePlayLeveltwo() {
            this.angryplanet = [];
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
            for (var planets = 3; planets >= 0; planets--) {
                this.angryplanet[planets] = new objects.angryPlanet();
                this.game.addChild(this.angryplanet[planets]);
            }
            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);
            //load previous score and lives
            this.scoreboard.lives = currentLives;
            this.scoreboard.score = currentScore;
            this.scoreboard.allienHp = currentHP;
            //----TO DELETE!!!!!
            //this.scoreboard.lives = 3;
            //this.scoreboard.score = 300;
            // Add Game Container to Stage
            stage.addChild(this.game);
            this.fadeIn(this.game, 5000);
        } // Constructor
        //bullet mouse event
        GamePlayLeveltwo.prototype.shotBullet2 = function () {
            if (constants.BULLET_FLAG == false) {
                console.log(this.allien.x);
                constants.BULLET_X = this.allien.x;
                constants.BULLET_Y = this.allien.y;
                createjs.Sound.play("LaserShoot");
                this.redbullet.setPoint();
                constants.BULLET_FLAG = true;
            }
        };
        // DISTANCE CHECKING METHOD
        GamePlayLeveltwo.prototype.distance = function (p1, p2) {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }; //Distance Method
        // CHECK COLLISION METHOD
        GamePlayLeveltwo.prototype.checkCollision = function (collider) {
            if (this.scoreboard.active) {
                var alienPosition = new createjs.Point(this.allien.x, this.allien.y);
                var bulletPosition = new createjs.Point(this.redbullet.x, this.redbullet.y);
                var objectPosition = new createjs.Point(collider.x, collider.y);
                var theDistance = this.distance(alienPosition, objectPosition);
                var theBulletDistance = this.distance(bulletPosition, objectPosition);
                if (theDistance < ((this.allien.height * 0.5) + (collider.height * 0.5))) {
                    if (collider.isColliding != true) {
                        createjs.Sound.play(collider.sound);
                        if (collider.name == "angryplanet") {
                            this.scoreboard.allienHp -= 33.33;
                            this.angryplanet[this.checkArray].reset();
                            if (this.scoreboard.allienHp <= 10) {
                                this.scoreboard.lives--;
                                this.scoreboard.allienHp = 100;
                                this.angryplanet[this.checkArray].reset();
                            }
                        }
                        if (collider.name == "astronaut") {
                            this.scoreboard.score += 100;
                            this.astronaut.reset();
                        }
                        createjs.Sound.play("Explosion");
                    }
                    collider.isColliding = true;
                }
                else if (theBulletDistance < ((this.redbullet.height * 0.5) + (collider.height * 0.5))) {
                    if (this.redbullet.x > 0) {
                        if (collider.isCollidingBullet != true) {
                            if (collider.name == "angryplanet") {
                                this.scoreboard.score += 50;
                                this.angryplanet[this.checkArray].reset();
                                console.log("colliding bullet - angryplanet");
                                createjs.Sound.play("Explosion66");
                            }
                            if (collider.name == "astronaut") {
                                this.scoreboard.score -= 50;
                                this.astronaut.reset();
                                console.log("colliding bullet - astronaut");
                                createjs.Sound.play("scream");
                            }
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
        }; // checkCollision Method
        GamePlayLeveltwo.prototype.update = function () {
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
            //check score
            if (this.scoreboard.score >= 1000) {
                this.game.removeAllChildren();
                createjs.Sound.stop();
                stage.removeChild(this.game);
                currentScore = this.scoreboard.score;
                currentLives = this.scoreboard.lives;
                currentState = constants.PLAY_STATE_LEVEL_3;
                stateChanged = true;
            }
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
        }; // Update Method
        GamePlayLeveltwo.prototype.fadeIn = function (elem, time) {
            var startOpacity = elem.alpha || 0;
            elem.alpha = startOpacity;
            (function go() {
                elem.alpha += startOpacity / (time / 100);
                if (elem.alpha > 0)
                    setTimeout(go, 100);
            })();
        };
        return GamePlayLeveltwo;
    })();
    states.GamePlayLeveltwo = GamePlayLeveltwo; // GamePlay Class
})(states || (states = {})); // States Module  
//# sourceMappingURL=gameplayleveltwo.js.map