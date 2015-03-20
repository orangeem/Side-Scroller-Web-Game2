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
// Global game Variables
var canvas;
var stage;
//var game: createjs.Container;
var assetLoader;
var stats = new Stats();
var currentScore = 0;
var highScore = 0;
// Game State Variables
var currentState;
var currentStateFunction;
var stateChanged = false;
var gamePlay;
var menu;
var gameOver;
// Game Objects 
/*var allien: objects.Allien;
var ally: objects.Ally;
var asteroids: objects.Asteroid[] = [];
var space: objects.Space;
var scoreboard: objects.ScoreBoard;
*/
var manifest = [
    { id: "asteroid", src: "assets/images/asteroid11.png" },
    { id: "ally", src: "assets/images/ally.png" },
    { id: "space", src: "assets/images/space2h.png" },
    { id: "allien", src: "assets/images/allienf.png" },
    { id: "allienBig", src: "assets/images/allienf2.png" },
    { id: "playButton", src: "assets/images/PlayBtn.png" },
    { id: "tryAgainButton", src: "assets/images/tryAgainBtn.png" },
    { id: "instructionButton", src: "assets/images/instructionsBtn.png" },
    { id: "soundtrack", src: "assets/audio/Soundtrack.ogg" },
    { id: "pickup", src: "assets/audio/Pickup.ogg" },
    { id: "explosion", src: "assets/audio/Explosion.ogg" }
];
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
    //main();
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
// DISTANCE CHECKING METHOD
/*
function distance(p1: createjs.Point, p2: createjs.Point): number {
    return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
}

// CHECK COLLISION METHOD
function checkCollision(collider: objects.GameObject) {
    var AllienPosition: createjs.Point = new createjs.Point(allien.x, allien.y);
    var asteroidPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
    var theDistance = distance(AllienPosition, asteroidPosition);
    if (theDistance < ((allien.height * 0.5) + (collider.height * 0.5))) {
        if (collider.isColliding != true) {
            createjs.Sound.play(collider.sound);
            console.log(collider.name);
            if (collider.name == "asteroid")
            {
                scoreboard.lives--;
            }
            if (collider.name == "ally")
            {
                scoreboard.score += 100;
            }
        }
        collider.isColliding = true;
    } else {
        collider.isColliding = false;
    }
}
*/
function gameLoop() {
    stats.begin();
    if (stateChanged) {
        changeState(currentState);
        stateChanged = false;
    }
    else {
        currentStateFunction.update();
    }
    /*space.update();
    ally.update();
    allien.update();

    for (var asteroid = 2; asteroid >= 0; asteroid--) {
        asteroids[asteroid].update();
        checkCollision(asteroids[asteroid]);
    }

    checkCollision(ally);
    scoreboard.update();
    if (this.scoreboard.lives < 1) {
        this.scoreboard.active = false;
        createjs.Sound.stop();
        currentScore = this.scoreboard.score;
        if (currentScore > highScore) {
            highScore = currentScore;
        }
        stage.removeAllChildren();
    }
    stage.update(); // Refreshes our stage
    */
    stats.end();
}
//function changeState(state: number): void {
function changeState(state) {
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
    }
}
//# sourceMappingURL=game.js.map