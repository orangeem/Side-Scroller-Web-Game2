module objects {
    // ASTEROID CLASS
    export class Boss extends objects.GameObject {

        // CONSTRUCTOR
        constructor() {
            super("boss");
            this.sound = "explosion";
            this.reset();
        }

        // PUBLIC METHODS 
        public update() {

            this.y -= this._dy;
            this.x -= this._dx;
           
            //boss moving cotrol
            if (this.x < 0 && this.y < 0) {
                this.reset();
            } else if (this.x > canvasWidth && this.y > canvasHeight) {
                this.reset();
            } else if (this.x < 0) {
                this.pointReset();
                this._dx = this._dx * -1;
            } else if (this.x > canvasWidth) {

                this.pointReset();
                this._dx = this._dx * 1;
            } else if (this.y < 0) {
                this.pointReset();
                this._dy = this._dy * -1;
            } else if (this.y > canvasHeight) {
                this.pointReset();
                this._dy = this._dy * -1;
            }

            this._checkBounds();
        }

        // Reset position of the asteroids to the begnning
        public reset() {
            this.y = Math.floor(Math.random() * 480);
            this.x = 960;
            this._dy = Math.floor(Math.random() * 4) - 2;
            this._dx = Math.floor(Math.random() * 5) + 5;
        }

        public pointReset() {

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