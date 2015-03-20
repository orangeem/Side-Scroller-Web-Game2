/*
module states {
    // Scene Variables
    export var backButton: objects.Button;
    var instructionsFont: string = constants.LABEL_FONT;
    var lineSpace: number = 45;
    var buttonPosition: number = 0.8;

    // Back Button Event Handler
    export function backButtonClicked(event: MouseEvent) {
        stage.removeChild(game);
        game.removeAllChildren();
        game.removeAllEventListeners();
        currentState = constants.MENU_STATE;
        changeState(currentState);
    }

    // Instruction State
    export function instructionState() {
        space.update();
    }

    // Instructions Scene
    export function Instructions() {
        var gameInstructions = [];
        var instructionsArray = [];

        // Declare new Game Container
        game = new createjs.Container();

        // Instantiate Game Objects
        ocean = new objects.Ocean(game);

        instructionsArray = [
            "Game Instructions",
            "You are a Mail Pilot, delivering mail",
            "to the islands. Fly over an island and",
            "pickup your pay but be careful not to fly",
            "too close to the clouds. Your plane",
            "will fall apart if it is hit by lighting",
            "too many times. Steer with the mouse",
            "or by touching the screen.",
            "Good Luck!"
        ];

        // Adjust Instructions for smaller screen size
        if (screenScale < 1) {
            instructionsFont = "14px Dock51";
            lineSpace = 30;
            buttonPosition = 0.5
        }

        // Display each line of instructions
        for (var line = 0; line < instructionsArray.length; line++) {

            gameInstructions[line] = new createjs.Text(instructionsArray[line], instructionsFont, constants.LABEL_COLOUR);
            gameInstructions[line].x = stage.canvas.width * 0.05;
            gameInstructions[line].y = 20 + (lineSpace * line);

            game.addChild(gameInstructions[line]);
        }

        // Display Back Button
        backButton = new objects.Button(stage.canvas.width * buttonPosition, 430, "backbutton");
        game.addChild(backButton);
        backButton.addEventListener("click", backButtonClicked);
        
        // Show Cursor
        stage.cursor = "default";

        // Add Scene to Game Container
        stage.addChild(game);
    }
}  
*/

/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/ally.ts" />
/// <reference path="../objects/space.ts" />
/// <reference path="../objects/allien.ts" />
/// <reference path="../objects/asteroid.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />

/// <reference path="../objects/scoreboards.ts" />

module states {
    // INSTRUCTIONS STATE CLASS
    export class Instructions {
        // Game Objects 
        public game: createjs.Container;
        public ocean: objects.Space;
        public instructionsLabel: objects.Label;
       // public finalScoreLabel: objects.Label;
        // public highScoreLabel: objects.Label;
        public goBackButton: objects.Button;
        public goBack: boolean = false;

        public instructionsFont: string = constants.SUBLABEL_FONT;
        public lineSpace: number = 45;
        public gameInstructions = [];
        public instructionsArray = [];

        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        constructor() {
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
         
                "You are a Mail Pilot, delivering mail",
                "to the islands. Fly over an island and",
                "pickup your pay but be careful not to fly",
                "too close to the clouds. Your plane",
                "will fall apart if it is hit by lighting",
                "too many times. Steer with the mouse",
                "Good Luck!"
            ];

            // Display each line of instructions
            for (var line = 0; line < this.instructionsArray.length; line++) {

                this.gameInstructions[line] = new createjs.Text(this.instructionsArray[line], this.instructionsFont, constants.LABEL_COLOUR);
                //this.gameInstructions[line].x = stage.canvas.width * 0.05;
                this.gameInstructions[line].x = 50;
                this.gameInstructions[line].y = 20 + (this.lineSpace * line);

                this.game.addChild(this.gameInstructions[line]);
            }

            //Final Score Label
           // this.finalScoreLabel = new objects.Label(320, 120,("FINAL SCORE: " + currentScore));
            //this.game.addChild(this.finalScoreLabel);

            //High Score Label
            //this.highScoreLabel = new objects.Label(320, 200,("HIGH SCORE: " + highScore));
            //this.game.addChild(this.highScoreLabel);

            //Try Again Button
            this.goBackButton = new objects.Button(320, 380, "goBackButton");
            this.goBackButton.on("click", this.goBackClicked, this);

            this.game.addChild(this.goBackButton);

            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor

        public goBackClicked() {
            this.goBack = true;
        }

        // PUBLIC METHODS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++
        public update() {

            this.ocean.update();

            if (this.goBack) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.MENU_STATE;
                stateChanged = true;
            }

            stage.update(); // Refreshes our stage

        } // Update Method

    } // Game Over Class


} // States Module