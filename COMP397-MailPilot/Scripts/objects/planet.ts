﻿module objects {
    // ASTEROID CLASS
    export class Planet extends objects.GameObject {

        // CONSTRUCTOR
        constructor() {
            super("planet");
            this.sound = "explosion";
            this.reset();
        }

        // PUBLIC METHODS 
        public update() {
            this.y -= this._dy;
            this.x -= this._dx;

            this._checkBounds();
        }

        // Reset position of the asteroids to the begnning
        public reset() {
            this.y = Math.floor(Math.random() * 480);
            this.x = 960;
            this._dy = Math.floor(Math.random() * 3) - 2;
            this._dx = Math.floor(Math.random() * 5) + 4;
        }

        // PRIVATE METHODS 
        private _checkBounds() {
            // check if the asteroids have left the screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
        }

    }

}    