/// <reference path="../constants.ts" />
/// <reference path="../objects/gameobject.ts" />
/// <reference path="../objects/ally.ts" />
/// <reference path="../objects/boss.ts" />
/// <reference path="../objects/space3.ts" />
/// <reference path="../objects/allien.ts" />
/// <reference path="../objects/pill.ts" />
/// <reference path="../objects/redbird.ts" />
/// <reference path="../objects/scoreboards.ts" />
/// <reference path="../objects/button.ts" />
/// <reference path="../objects/label.ts" />
/// <reference path="../objects/bullet.ts" />
/// <reference path="../game.ts" />

module states {
    // GAME PLAY STATE CLASS
    export class GamePlayLevelthree {
        // Game Objects 
        public game: createjs.Container;
        public scoreboard: objects.ScoreBoard;
        public allien: objects.Allien;
        public pill: objects.Pill;
        public boss: objects.Boss;
        public redbirds: objects.Redbird[] = [];
        public space: objects.Space3;
        public bullet: objects.Bullet;
        public checkArray: number;
        
        constructor() {
            
            // Instantiate Game Container
            this.game = new createjs.Container();
            
            //Space object
            this.space = new objects.Space3();
            this.game.addChild(this.space);

            //Boss object
            this.boss = new objects.Boss(stage, this.game);
           // this.game.addChild(this.boss);

            //Pill object
            this.pill = new objects.Pill();
            this.game.addChild(this.pill);

            //Allien object
            this.allien = new objects.Allien();
            this.game.addChild(this.allien);
                        
            //bullet object
            this.bullet = new objects.Bullet();
            this.game.addChild(this.bullet);

            
            //Planet object
            for (var bird = 3; bird >= 0; bird--) {
                this.redbirds[bird] = new objects.Redbird(stage, this.game);               
            }

            //bullet mouse event listener
            this.game.addEventListener("click", this.shotBullet2.bind(this),false);
            
            
            // Instantiate Scoreboard
            this.scoreboard = new objects.ScoreBoard(this.game);

            //load previous score and lives
     //       this.scoreboard.lives = currentLives;
       //     this.scoreboard.score = currentScore;
 
            // Add Game Container to Stage
            stage.addChild(this.game);

        } // Constructor

               
        //bullet mouse event
        public shotBullet2() {

            if (constants.BULLET_FLAG == false) {

                console.log(this.allien.x);
                constants.BULLET_X = this.allien.x;
                constants.BULLET_Y = this.allien.y;
                createjs.Sound.play("bulletsound");
                this.bullet.setPoint();

                constants.BULLET_FLAG = true;
                
            }
        }

        // DISTANCE CHECKING METHOD
        public distance(p1: createjs.Point, p2: createjs.Point): number {
            return Math.floor(Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2)));
        } //Distance Method

        // CHECK COLLISION METHOD
        public checkBossCollision(collider: objects.Boss) {
            if (this.scoreboard.active) {
                var alienPosition: createjs.Point = new createjs.Point(this.allien.x, this.allien.y);
                var bulletPosition: createjs.Point = new createjs.Point(this.bullet.x, this.bullet.y);
                var objectPosition: createjs.Point = new createjs.Point(collider.image.x, collider.image.y);
                var theDistance = this.distance(alienPosition, objectPosition);
                var theBulletDistance = this.distance(bulletPosition, objectPosition);

                if (theDistance < ((this.allien.height * 0.5) + (collider.height * 0.5))) {
                    if (collider.isColliding != true) {
                        createjs.Sound.play("collision");                        
                        if (this.scoreboard.allienHp < 20) {
                            this.scoreboard.lives--;
                            this.scoreboard.allienHp = 100;
                        } else {
                            this.scoreboard.allienHp -= 20;
                        }
                    }
                    collider.isColliding = true;

                } else if (theBulletDistance < ((this.bullet.height * 0.5) + (collider.height * 0.5))) {
                    if (collider.isColliding != true) {
                        createjs.Sound.play("bossound");
                        this.scoreboard.bossHp -= 25;
                        this.bullet.destroy();
                    } 
                    collider.isColliding = true;
                } else {
                    collider.isColliding = false;
                }
            }
            
        } // checkCollision Method

        public checkCollision(collider: objects.Redbird) {
            if (this.scoreboard.active) {
                var alienPosition: createjs.Point = new createjs.Point(this.allien.x, this.allien.y);
                var bulletPosition: createjs.Point = new createjs.Point(this.bullet.x, this.bullet.y);
                var objectPosition: createjs.Point = new createjs.Point(collider.image.x, collider.image.y);
                var theDistance = this.distance(alienPosition, objectPosition);
                var theBulletDistance = this.distance(bulletPosition, objectPosition);

                if (theDistance < ((this.allien.height * 0.5) + (collider.height * 0.5))) {

                    if (collider.isColliding != true) {
                        createjs.Sound.play("collision");
                        if (this.scoreboard.allienHp < 13) {
                            this.scoreboard.lives--;
                            this.scoreboard.allienHp = 100;
                            this.redbirds[this.checkArray].reset();
                        } else {
                            this.scoreboard.allienHp -= 13;
                            this.redbirds[this.checkArray].reset();
                        }                       
                    }
                    collider.isColliding = true;
                } else if (theBulletDistance < ((this.bullet.height * 0.5) + (collider.height * 0.5))) {

                    if (collider.isColliding != true) {
                        createjs.Sound.play("bird");
                            this.scoreboard.score += 30;
                            this.redbirds[this.checkArray].reset();
                            this.bullet.destroy();
                    }
                    collider.isColliding = true;
                }

                else {
                    collider.isColliding = false;
                }
            }
        } // checkCollision Method

        // CHECK COLLISION METHOD
        public checkPillCollision(collider: objects.GameObject) {
            if (this.scoreboard.active) {
                var alienPosition: createjs.Point = new createjs.Point(this.allien.x, this.allien.y);
                var objectPosition: createjs.Point = new createjs.Point(collider.x, collider.y);
                var theDistance = this.distance(alienPosition, objectPosition);

                if (theDistance < ((this.allien.height * 0.5) + (collider.height * 0.5))) {

                    if (collider.isColliding != true) {
                        createjs.Sound.play("bite");                            
                        if (collider.name == "pill") {
                            if (this.scoreboard.allienHp >= 93) {
                                this.scoreboard.allienHp = 100;                                
                            } else {
                                this.scoreboard.allienHp += 7;                                
                            }
                            this.pill.reset();
                        }                        
                    }
                    collider.isColliding = true;
                } else {
                    collider.isColliding = false;
                }
            }
        } // checkCollision Method


        public update() {

            this.space.update();

            this.boss.update();

            this.allien.update();

            this.pill.update();

            //bullet update
            if (constants.BULLET_FLAG == true) {
                this.bullet.update();
                
            } 

            for (var bird = 3; bird >= 0; bird--) {
                this.redbirds[bird].update();
                this.checkArray = bird;
                this.checkCollision(this.redbirds[bird]);
            }

            this.checkBossCollision(this.boss);

            this.checkPillCollision(this.pill);

            
            this.scoreboard.update();
            

            //Check Alien's lives
            if (this.scoreboard.lives < 1 || this.scoreboard.bossHp < 25) {
                this.scoreboard.active = false;
                createjs.Sound.stop();
                if (this.scoreboard.bossHp < 25) {
                    this.scoreboard.score += 1000;
                }
                currentScore = this.scoreboard.score;
                if (currentScore > highScore) {
                    highScore = currentScore;
                }
                this.game.removeAllChildren();
                stage.removeChild(this.game);
                currentState = constants.GAME_OVER_STATE;
                stateChanged = true;
            } 

            stage.update(); // Refreshes our stage

        } // Update Method           

    } // GamePlay Class

} // States Module  