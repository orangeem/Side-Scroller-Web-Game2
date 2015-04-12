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
/// <reference path="../objects/scoreboards.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../game.ts" />
var states;
(function (states) {
    // GAME PLAY STATE CLASS
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
        // DISTANCE CHECKING METHOD
        GamePlayLeveltwo.prototype.distance = function (p1, p2) {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        }; //Distance Method
        // CHECK COLLISION METHOD
        GamePlayLeveltwo.prototype.checkCollision = function (collider) {
            if (this.scoreboard.active) {
                var alienPosition = new createjs.Point(this.allien.x, this.allien.y);
                var objectPosition = new createjs.Point(collider.x, collider.y);
                var theDistance = this.distance(alienPosition, objectPosition);
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
                else {
                    collider.isColliding = false;
                }
            }
        }; // checkCollision Method
        GamePlayLeveltwo.prototype.update = function () {
            this.space2.update();
            this.astronaut.update();
            this.allien.update();
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
        }; // Update Method
        return GamePlayLeveltwo;
    })();
    states.GamePlayLeveltwo = GamePlayLeveltwo; // GamePlay Class
})(states || (states = {})); // States Module  
//# sourceMappingURL=gameplayleveltwo.js.map