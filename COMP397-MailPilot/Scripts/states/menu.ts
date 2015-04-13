/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/ally.ts" />
/// <reference path="../objects/boss.ts" />
/// <reference path="../objects/space.ts" />
/// <reference path="../objects/allien.ts" />
/// <reference path="../objects/asteroid.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/angryplanet.ts" />

/// <reference path="../objects/scoreboards.ts" />

module states {
    // MENU STATE CLASS
    export class Menu {
        // Game Objects 
        public game: createjs.Container;
        public AllienImg: createjs.Bitmap;
        public space: objects.Space;
        public allienLabel: objects.Label;
        public playButton: objects.Button;
        public instructionButton: objects.Button;
        public play: boolean = false;
        public instruction: boolean = false;

        // CONSTRUCTOR 
        constructor() {
            

            // Instantiate Game Container
            this.game = new createjs.Container();

            //Space object
            this.space = new objects.Space();
            this.game.addChild(this.space);

            //Game Name Label
            this.allienLabel = new objects.Label(320, 40, "ALIEN SCAPE");
            this.allienLabel.font = "60px Copperplate Gothic Light";
            this.allienLabel.regX = this.allienLabel.getMeasuredWidth() * 0.5;
            this.allienLabel.regY = this.allienLabel.getMeasuredLineHeight() * 0.5;
            this.game.addChild(this.allienLabel);

            //Game Allien Initial Image
           this.AllienImg = new createjs.Bitmap(assetLoader.getResult("allienBig"));
            this.AllienImg.x = 180;
            this.AllienImg.y = 100;
            this.game.addChild(this.AllienImg);


            //Play Button
            this.playButton = new objects.Button(320, 410, "playButton");
            this.playButton.on("click", this.playClicked, this);
            this.game.addChild(this.playButton);

            //Instruction Button
            this.instructionButton = new objects.Button(320, 450, "instructionButton");
            this.instructionButton.on("click", this.instructionsClicked, this);
            this.game.addChild(this.instructionButton);

            // Add Game Container to Stage
            stage.addChild(this.game);
        } // Constructor

        public playClicked() {
            this.play = true;
        }

        public instructionsClicked() {
            this.instruction = true;
        }


        // PUBLIC METHODS
        public update() {

            this.space.update();
            //if play button clicked -> change to PLAY state
            if (this.play) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.PLAY_STATE;
                //currentState = constants.PLAY_STATE_LEVEL_2;
                stateChanged = true;
            }
            //if instruction button clicked -> change state to INSTRUCTION state
            if (this.instruction) {
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.INSTRUCTIONS_STATE;
                stateChanged = true;
            }

            stage.update(); // Refreshes our stage

        } // Update Method

    } // Menu Class


} // States Module