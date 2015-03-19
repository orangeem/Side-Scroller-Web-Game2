module objects {
    // ISLAND CLASS
    export class Ally extends objects.GameObject{

        // CONSTRUCTOR
        constructor() {
            super("ally");
            this.sound = "pickup";
           // this._dy = 5;
            this._dx = 5;

            this.reset();
        }

        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        public update() {
           // this.y += this._dy;
            this.x -= this._dx;

            this._checkBounds();
        }

        // Reset position of island to the top
        public reset() {
            //this.y = -this.height;
            //this.x = Math.floor(Math.random() * 640);

            //this.x = -this.width;
            this.x = 960;
            this.y = Math.floor(Math.random() * 480);
        }

        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        private _checkBounds() {
            // check if island has left the bottom of the screen
           // if (this.y >= (480 + this.height)) {
             //   this.reset();
            //}

            if (this.x <= (0 - this.width))
            {
                this.reset();
            }
        }

    }

} 