/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/ally.ts" />
/// <reference path="../objects/space.ts" />
/// <reference path="../objects/allien.ts" />
/// <reference path="../objects/asteroid.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/scoreboards.ts" />
var states;
(function (states) {
    // WIN STATE CLASS
    var Won = (function () {
        // CONSTRUCTOR 
        function Won() {
            this.tryAgain = false;
            // Instantiate Game Container
            this.game = new createjs.Container();
            //Space object
            this.space = new objects.Space();
            this.game.addChild(this.space);
            //Game Over Label
            this.gameOverLabel = new objects.Label(320, 40, "YAY YOU WON!");
            this.gameOverLabel.font = "60px Copperplate Gothic Light";
            this.gameOverLabel.regX = this.gameOverLabel.getMeasuredWidth() * 0.5;
            this.gameOverLabel.regY = this.gameOverLabel.getMeasuredLineHeight() * 0.5;
            this.game.addChild(this.gameOverLabel);
            //Final Score Label
            this.finalScoreLabel = new objects.Label(320, 120, ("FINAL SCORE: " + currentScore));
            this.game.addChild(this.finalScoreLabel);
            //High Score Label
            this.highScoreLabel = new objects.Label(320, 200, ("HIGH SCORE: " + highScore));
            this.game.addChild(this.highScoreLabel);
            //Try Again Button
            this.tryAgainButton = new objects.Button(320, 280, "tryAgainButton");
            this.tryAgainButton.on("click", this.tryAgainClicked, this);
            this.game.addChild(this.tryAgainButton);
            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor
        Won.prototype.tryAgainClicked = function () {
            this.tryAgain = true;
        };
        // PUBLIC METHODS 
        Won.prototype.update = function () {
            this.space.update();
            //If tryAgain button clicked -> change to PLAY state
            if (this.tryAgain) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.PLAY_STATE;
                stateChanged = true;
            }
            stage.update(); // Refreshes our stage
        }; // Update Method
        return Won;
    })();
    states.Won = Won; // Game Over Class
})(states || (states = {})); // States Module 
//# sourceMappingURL=won.js.map