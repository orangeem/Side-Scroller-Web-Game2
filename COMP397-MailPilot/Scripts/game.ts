/// <reference path="typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />

/// <reference path="objects/gameobject.ts" />
/// <reference path="objects/allien.ts" />
/// <reference path="objects/ally.ts" />
/// <reference path="objects/asteroid.ts" />
/// <reference path="objects/space.ts" />




// Global game Variables
var canvas;
var stage: createjs.Stage;
var assetLoader: createjs.LoadQueue;


// Game Objects 
var allien: objects.Allien;
var ally: objects.Ally;
var asteroids: objects.Asteroid[] = [];
var space: objects.Space;

var manifest = [
    { id: "asteroid", src: "assets/images/asteroidf.png" },
    { id: "ally", src: "assets/images/ally.png" },
    { id: "space", src: "assets/images/space2h.png" },
    { id: "allien", src: "assets/images/allienf.png" },
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

    main();
}


// UTILITY METHODS

// DISTANCE CHECKING METHOD
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
        }
        collider.isColliding = true;
    } else {
        collider.isColliding = false;
    }
}





function gameLoop() {

    space.update();

    ally.update();

    allien.update();

    for (var asteroid = 2; asteroid >= 0; asteroid--) {
        asteroids[asteroid].update();

        checkCollision(asteroids[asteroid]);
    }

    checkCollision(ally);

    stage.update(); // Refreshes our stage
}





// Our Game Kicks off in here
function main() {

    //Ocean object
    space = new objects.Space();
    stage.addChild(space);

    //Island object
    ally = new objects.Ally();
    stage.addChild(ally);


    //Plane object
    allien = new objects.Allien();
    stage.addChild(allien);

    //Cloud object
    for (var asteroid = 2; asteroid >= 0; asteroid--) {
        asteroids[asteroid] = new objects.Asteroid();
        stage.addChild(asteroids[asteroid]);
    }



    
    

    
}