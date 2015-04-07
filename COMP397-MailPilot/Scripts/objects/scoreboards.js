/// <reference path="../constants.ts" />
var objects;
(function (objects) {
    // SCOREBOARD CLASS 
    var ScoreBoard = (function () {
        // CONSTRUCTOR 
        function ScoreBoard(game) {
            this.game = game;
            this.score = 0;
            this.lives = constants.ALLIEN_LIVES;
            if (currentState == constants.PLAY_STATE) {
                this.lives = constants.ALLIEN_LIVES;
                this.allienHp = constants.ALLIEN_HP;
            }
            else if (currentState == constants.PLAY_STATE_LEVEL_2 || currentState == constants.PLAY_STATE_LEVEL_3) {
                this.allienHp = constants.ALLIEN_HP;
            }
            this.active = true;
            //Lives label
            this._livesLabel = new createjs.Text("LIVES: ", "30px Copperplate Gothic Light", "#ffff00");
            this.game.addChild(this._livesLabel);
            //Score label
            this._scoreLabel = new createjs.Text("SCORE: ", "30px Copperplate Gothic Light", "#ffff00");
            this._scoreLabel.x = 400;
            this.game.addChild(this._scoreLabel);
            this._hpLabel = new createjs.Text("HP: ", "30px Copperplate Gothic Light", "#ffff00");
            this._hpLabel.x = 200;
            this.game.addChild(this._hpLabel);
            this.allien_bar_hp = new createjs.Shape();
            this.allien_bar_hp.x = 300;
            this.allien_bar_hp.y = 0;
            this.allien_bar_hp.graphics.beginFill("#ff0000").drawRect(0, 0, 100, 27);
            this.game.addChild(this.allien_bar_hp);
        }
        // PUBLIC METHODS 
        ScoreBoard.prototype.update = function () {
            this.controlHP(this.allienHp);
            this._livesLabel.text = "Lives: " + this.lives;
            this._scoreLabel.text = "Score: " + this.score;
        };
        ScoreBoard.prototype.controlHP = function (hp) {
            console.log("hp:" + this.allienHp);
            this.game.removeChild(this.allien_bar_hp);
            this.allien_bar_hp = new createjs.Shape();
            this.allien_bar_hp.x = 300;
            this.allien_bar_hp.graphics.beginFill("#ff0000").drawRect(0, 0, hp, 27);
            this.game.addChild(this.allien_bar_hp);
        };
        return ScoreBoard;
    })();
    objects.ScoreBoard = ScoreBoard;
})(objects || (objects = {}));
//# sourceMappingURL=scoreboards.js.map