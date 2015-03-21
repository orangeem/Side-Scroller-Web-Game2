/// <reference path="../constants.ts" />
module objects {
    // SCOREBOARD CLASS 
    export class ScoreBoard {
        public score: number;
        public lives: number;
        public active: boolean;
        private _scoreLabel: createjs.Text;
        private _livesLabel: createjs.Text;

        // CONSTRUCTOR 
        constructor(game: createjs.Container) {
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
        public update(): void {
            this._livesLabel.text = "Lives: " + this.lives;
            this._scoreLabel.text = "Score: " + this.score;
        }
    }
}  