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
    // INSTRUCTIONS STATE CLASS
    var Instructions = (function () {
        // CONSTRUCTOR 
        function Instructions() {
            this.goBack = false;
            this.instructionsFont = constants.SUBLABEL_FONT;
            this.lineSpace = 45;
            this.gameInstructions = [];
            this.instructionsArray = [];
            // Instantiate Game Container
            this.game = new createjs.Container();
            //Ocean object
            this.ocean = new objects.Space();
            this.game.addChild(this.ocean);
            //Instruction Label
            this.instructionsLabel = new objects.Label(320, 40, "INSTRUCTIONS");
            this.instructionsLabel.font = "60px Copperplate Gothic Light";
            this.instructionsLabel.regX = this.instructionsLabel.getMeasuredWidth() * 0.5;
            this.instructionsLabel.regY = this.instructionsLabel.getMeasuredLineHeight() * 0.5;
            this.game.addChild(this.instructionsLabel);
            //Instructions Array
            this.instructionsArray = [
                "You are the alien driving the spaceship,",
                "your mission is to save the friends that are",
                "on the space picking them up, but be careful",
                "not to crash with the enemies!!!",
                "Good Luck!",
                "Use arrow key for movement and",
                "mouse left click for shooting"
            ];
            for (var line = 0; line < this.instructionsArray.length; line++) {
                this.gameInstructions[line] = new createjs.Text(this.instructionsArray[line], this.instructionsFont, constants.LABEL_COLOUR);
                this.gameInstructions[line].x = 75;
                this.gameInstructions[line].y = 100 + (this.lineSpace * line);
                this.game.addChild(this.gameInstructions[line]);
            }
            //go Back Button
            this.goBackButton = new objects.Button(320, 420, "goBackButton");
            this.goBackButton.on("click", this.goBackClicked, this);
            this.game.addChild(this.goBackButton);
            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor
        Instructions.prototype.goBackClicked = function () {
            this.goBack = true;
        };
        // PUBLIC METHODS 
        Instructions.prototype.update = function () {
            this.ocean.update();
            //if goBack button is clicked -> change to MENU state
            if (this.goBack) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.MENU_STATE;
                stateChanged = true;
            }
            stage.update(); // Refreshes our stage
        }; // Update Method
        return Instructions;
    })();
    states.Instructions = Instructions; // Game Over Class
})(states || (states = {})); // States Module
//# sourceMappingURL=instructions.js.map