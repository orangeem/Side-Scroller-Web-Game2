/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />

/// <reference path="typings/stats/stats.d.ts" />

/// <reference path="constants.ts" />

/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/allien.ts" />
/// <reference path="objects/ally.ts" />
/// <reference path="objects/asteroid.ts" />
/// <reference path="objects/space.ts" />
/// <reference path="objects/scoreboards.ts" />

/// <reference path="objects/button.ts" />
/// <reference path="objects/label.ts" />

/// <reference path="states/gameplay.ts" />
/// <reference path="states/menu.ts" />
/// <reference path="states/gameover.ts" />
/// <reference path="states/instructions.ts" />

// Global game Variables
var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;
var stats: Stats = new Stats();
var currentScore = 0;
var highScore = 0;

// Game State Variables
var currentState: number;
var currentStateFunction: any;
var stateChanged: boolean = false;

var gamePlay: states.GamePlay;
var menu: states.Menu;
var gameOver: states.GameOver;
var instructions: states.Instructions;


var manifest = [
    { id: "asteroid", src: "assets/images/asteroid.png" },
    { id: "ally", src: "assets/images/ally.png" },
    { id: "space", src: "assets/images/space2h.png" },
    { id: "allien", src: "assets/images/allien.png" },
    { id: "allienBig", src: "assets/images/allienBig.png" },
    { id: "playButton", src: "assets/images/PlayBtn.png" },
    { id: "tryAgainButton", src: "assets/images/tryAgainBtn.png" },
    { id: "instructionButton", src: "assets/images/instructionsBtn.png" },
    { id: "goBackButton", src: "assets/images/goBackBtn.png" },
    { id: "soundtrack", src: "assets/audio/Soundtrack.ogg" },
    { id: "pickup", src: "assets/audio/Pickup.ogg" },
    { id: "explosion", src: "assets/audio/Explosion.ogg" }
];

//Preloading sounds and images
function Preload() {
    assetLoader = new createjs.LoadQueue(); // create a new preloader
    assetLoader.installPlugin(createjs.Sound); // need plugin for sounds
    assetLoader.on("complete", init, this); // when assets finished preloading - then init function

    assetLoader.loadManifest(manifest);
}



function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    stage.enableMouseOver(20); // Enable mouse events
    createjs.Ticker.setFPS(60); // 60 frames per second
    createjs.Ticker.addEventListener("tick", gameLoop);
    setupStats();
    
    currentState = constants.MENU_STATE;
    changeState(currentState);
}

// UTILITY METHODS

function setupStats() {
    stats.setMode(0); 

    // align top-left
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '650px';
    stats.domElement.style.top = '440px';

    document.body.appendChild(stats.domElement);
}

function gameLoop() {
    stats.begin();
    if (stateChanged) {
        changeState(currentState);
        stateChanged = false;
    }
    else {
        currentStateFunction.update();
    }
    stats.end();
}

//function changeState(state: number): void {
function changeState(state){
    switch (state) {
       case constants.MENU_STATE:
            //instantiate menu screen
            menu = new states.Menu();
            currentStateFunction = menu;
            break;

        case constants.PLAY_STATE:
            // instantiate game play screen
            gamePlay = new states.GamePlay();
            currentStateFunction = gamePlay;
            break;


        case constants.GAME_OVER_STATE:
            // instantiate game over screen
            gameOver = new states.GameOver();
            currentStateFunction = gameOver;
            break;

        case constants.INSTRUCTIONS_STATE:
            //instantiate instructions screen
            instructions = new states.Instructions();
            currentStateFunction = instructions;
            break;
            
    }
}

