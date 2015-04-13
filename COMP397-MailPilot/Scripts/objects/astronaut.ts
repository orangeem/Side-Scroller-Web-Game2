module objects {
    // ASTRONAUT CLASS
    export class Astronaut extends objects.GameObject {

        // CONSTRUCTOR
        constructor() {
            super("astronaut");
            this.sound = "pickup";
            this._dx = 5;

            this.reset();
        }

        // PUBLIC METHODS 
        public update() {
            this.x -= this._dx;
            this._checkBounds();
        }

        // Reset position of the ally to the beginning
        public reset() {
            this.x = 960;
            this.y = Math.floor(Math.random() * 480);
        }

        // PRIVATE METHODS 
        private _checkBounds() {
            // check if the ally has left the screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
        }

    }

}  