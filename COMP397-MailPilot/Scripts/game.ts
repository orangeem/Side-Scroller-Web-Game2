/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />

/// <reference path="typings/stats/stats.d.ts" />

/// <reference path="constants.ts" />
/// <reference path="keys.ts" />
/// <reference path="controls.ts" />

/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/allien.ts" />
/// <reference path="objects/ally.ts" />
/// <reference path="objects/boss.ts" />
/// <reference path="objects/asteroid.ts" />
/// <reference path="objects/pill.ts" />
/// <reference path="objects/space.ts" />
/// <reference path="objects/space3.ts" />
/// <reference path="objects/bullet.ts" />
/// <reference path="objects/redbullet.ts" />
/// <reference path="objects/space2.ts" />

/// <reference path="objects/scoreboards.ts" />

/// <reference path="objects/button.ts" />
/// <reference path="objects/label.ts" />

/// <reference path="states/gameplay.ts" />
/// <reference path="states/menu.ts" />
/// <reference path="states/gameover.ts" />
/// <reference path="states/gameplayleveltwo.ts" />
/// <reference path="states/gameplaylevelthree.ts" />
/// <reference path="states/instructions.ts" />

// Global game Variables
var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;
var stats: Stats = new Stats();
var currentScore = 0;
var currentLives = 0;
var highScore = 0;

// Game State Variables
var currentState: number;
var currentStateFunction: any;
var stateChanged: boolean = false;
var canvasWidth: number;
var canvasHeight: number;

var gamePlay: states.GamePlay;
var gamePlayLeveltwo: states.GamePlayLeveltwo;
var gamePlayLevelthree: states.GamePlayLevelthree;
var menu: states.Menu;
var gameOver: states.GameOver;
var instructions: states.Instructions;



var manifest = [
    { id: "asteroid", src: "assets/images/asteroid.png" },
    { id: "ally", src: "assets/images/ally.png" },
    { id: "space", src: "assets/images/space2h.png" },
    { id: "space3", src: "assets/images/space3.png" },
    { id: "allien", src: "assets/images/allien.png" },
    { id: "planet", src: "assets/images/planet.png" },
    { id: "bullet", src: "assets/images/bullet.png" },
    { id: "pill", src: "assets/images/pill.png" },
    { id: "allienBig", src: "assets/images/allienBig.png" },
    { id: "spaceLevel2", src: "assets/images/spaceLevel2.jpg" },
    { id: "astronaut", src: "assets/images/astronaut.png" },
    { id: "angryplanet", src: "assets/images/angryplanet.png" },
    { id: "redbullet", src: "assets/images/red_bullet.png" },
    { id: "playButton", src: "assets/images/PlayBtn.png" },
    { id: "tryAgainButton", src: "assets/images/tryAgainBtn.png" },
    { id: "instructionButton", src: "assets/images/instructionsBtn.png" },
    { id: "goBackButton", src: "assets/images/goBackBtn.png" },
    { id: "soundtrack", src: "assets/audio/Soundtrack.ogg" },
    { id: "soundtrack3", src: "assets/audio/stage3soundtrack.ogg" },
    { id: "pickup", src: "assets/audio/Pickup.ogg" },
    { id: "bird", src: "assets/audio/uhoh.ogg" },
    { id: "bossound", src: "assets/audio/boss.ogg" },
    { id: "bulletsound", src: "assets/audio/bullet.ogg" },
    { id: "collision", src: "assets/audio/twang.ogg" },
    { id: "bite", src: "assets/audio/bite.ogg" },
    { id: "LaserShoot", src: "assets/audio/LaserShoot.ogg" },
    { id: "Explosion66", src: "assets/audio/Explosion66.ogg" },
    { id: "scream", src: "assets/audio/scream.ogg" },
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
    canvasWidth = this.stage.canvas.width;
    canvasHeight = this.stage.canvas.height;    
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

        case constants.PLAY_STATE_LEVEL_2:
            //instantiate level 2
            gamePlayLeveltwo = new states.GamePlayLeveltwo();
            currentStateFunction = gamePlayLeveltwo;
            break;

        case constants.PLAY_STATE_LEVEL_3:
            //instantiate level 3
            gamePlayLevelthree = new states.GamePlayLevelthree();
            currentStateFunction = gamePlayLevelthree;
            break;
            
    }
}

