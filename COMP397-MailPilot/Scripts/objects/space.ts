module objects {
    // OCEAN CLASS
    export class Space extends createjs.Bitmap {
        // PUBLIC INSTANCE VARIABLES
        private _dy: number = 5;
        private _dx: number = 5;

        // CONSTRUCTOR
        constructor() {
            super(assetLoader.getResult("space"));

            this.reset();
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
            //this.y += this._dy;
            //this.x += this._dx;
            this.x -= this._dx;

            this._checkBounds();
        }

        // Reset position of island to the top
        public reset() {
           // this.y = -960
           // this.x = 0;
            this.y = 0;
            //this.x = -760;
            this.x = 0;
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if island has left the bottom of the screen
            //if (this.y === 0) {
              //  this.reset();
            //}
            if (this.x === -760) {
                this.reset();
            }
        }

    }

}  