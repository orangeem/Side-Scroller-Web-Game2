module objects {
    // SPACE CLASS
    export class Space2 extends createjs.Bitmap {
        // PUBLIC INSTANCE VARIABLES
        private _dy: number = 5;
        private _dx: number = 5;

        // CONSTRUCTOR
        constructor() {
            super(assetLoader.getResult("spaceLevel2"));
            this.reset();
        }

        // PUBLIC METHODS 
        public update() {
            this.x -= this._dx;
            this._checkBounds();
        }

        // Reset position of the space 
        public reset() {
            this.y = 0;
            this.x = 0;
        }

        // PRIVATE METHODS 
        private _checkBounds() {
            // check if the space has left the screen
            if (this.x === -760) {
                this.reset();
            }
        }

    }

}   