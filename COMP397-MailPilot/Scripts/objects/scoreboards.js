/// <reference path="../constants.ts" />
var objects;
(function (objects) {
    // SCOREBOARD CLASS 
    var ScoreBoard = (function () {
        // CONSTRUCTOR 
        function ScoreBoard(game) {
            this.score = 0;
            this.lives = constants.ALLIEN_LIVES;
            this.active = true;
            //Lives label
            this._livesLabel = new createjs.Text("LIVES: ", "30px Copperplate Gothic Light", "#ffff00");
            game.addChild(this._livesLabel);
            //Score label
            this._scoreLabel = new createjs.Text("SCORE: ", "30px Copperplate Gothic Light", "#ffff00");
            this._scoreLabel.x = 400;
            game.addChild(this._scoreLabel);
        }
        // PUBLIC METHODS 
        ScoreBoard.prototype.update = function () {
            this._livesLabel.text = "Lives: " + this.lives;
            this._scoreLabel.text = "Score: " + this.score;
        };
        return ScoreBoard;
    })();
    objects.ScoreBoard = ScoreBoard;
})(objects || (objects = {}));
//# sourceMappingURL=scoreboards.js.map