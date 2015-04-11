module objects {
    // pill CLASS
    export class Pill extends objects.GameObject {

        // CONSTRUCTOR
        constructor() {
            super("pill");
            this.sound = "bite";
            this._dx = 6;

            this.reset();
        }

        // PUBLIC METHODS 
        public update() {
            this.x -= this._dx;
            this._checkBounds();
        }

        // Reset position of the pill to the beginning
        public reset() {
            this.x = 960;
            this.y = Math.floor(Math.random() * 480);
        }

        // PRIVATE METHODS 
        private _checkBounds() {
            // check if the pill has left the screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
        }

    }

}  