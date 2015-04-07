/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/ally.ts" />
/// <reference path="../objects/boss.ts" />
/// <reference path="../objects/space.ts" />
/// <reference path="../objects/allien.ts" />
/// <reference path="../objects/planet.ts" />
/// <reference path="../objects/scoreboards.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/bullet.ts" />
/// <reference path="../game.ts" />
var states;
(function (states) {
    // GAME PLAY STATE CLASS
    var GamePlayLevelthree = (function () {
        function GamePlayLevelthree() {
            this.planets = [];
            // Instantiate Game Container
            this.game = new createjs.Container();
            //Space object
            this.space = new objects.Space();
            this.game.addChild(this.space);
            //Ally object
            this.boss = new objects.Boss();
            this.game.addChild(this.boss);
            //Allien object
            this.allien = new objects.Allien();
            this.game.addChild(this.allien);
            //bullet object
            this.bullet = new objects.Bullet();
            this.game.addChild(this.bullet);
            for (var planet = 3; planet >= 0; planet--) {
                this.planets[planet] = new objects.Planet();
                this.game.addChild(this.planets[planet]);
            }
            //bullet mouse event listener
            this.game.addEventListener("click", this.shotBullet2.bind(this), false);
            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);
            //load previous score and lives
            this.scoreboard.lives = currentLives;
            this.scoreboard.score = currentScore;
            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor
        //bullet mouse event
        GamePlayLevelthree.prototype.shotBullet2 = function () {
            if (constants.BULLET_FLAG == false) {
                console.log(this.allien.x);
                constants.BULLET_X = this.allien.x;
                constants.BULLET_Y = this.allien.y;
                this.bullet.setPoint();
                constants.BULLET_FLAG = true;
            }
        };
        // DISTANCE CHECKING METHOD
        GamePlayLevelthree.prototype.distance = function (p1, p2) {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }; //Distance Method
        // CHECK COLLISION METHOD
        GamePlayLevelthree.prototype.checkCollision = function (collider) {
            if (this.scoreboard.active) {
                var alienPosition = new createjs.Point(this.allien.x, this.allien.y);
                var bulletPosition = new createjs.Point(this.bullet.x, this.bullet.y);
                var objectPosition = new createjs.Point(collider.x, collider.y);
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
                }
                else if (theBulletDistance < ((this.bullet.height * 0.5) + (collider.height * 0.5))) {
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
        }; // checkCollision Method
        GamePlayLevelthree.prototype.update = function () {
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
        }; // Update Method           
        return GamePlayLevelthree;
    })();
    states.GamePlayLevelthree = GamePlayLevelthree; // GamePlay Class
})(states || (states = {})); // States Module  
//# sourceMappingURL=gameplaylevelthree.js.map