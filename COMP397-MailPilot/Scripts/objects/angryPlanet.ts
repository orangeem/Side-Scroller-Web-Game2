module objects {
    // ANGRY PLANET CLASS
    export class angryPlanet extends objects.GameObject {

        // CONSTRUCTOR
        constructor() {
            super("angryplanet");
            this.sound = "explosion";
            this.reset();
        }

        // PUBLIC METHODS 
        public update() {
            this.y -= this._dy;
            this.x -= this._dx;

            this._checkBounds();
        }

        // Reset position of the planets to the begnning
        public reset() {
            this.y = Math.floor(Math.random() * 480);
            this.x = 960;
            this._dy = Math.floor(Math.random() * 4) - 2;
            this._dx = Math.floor(Math.random() * 5) + 5;
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