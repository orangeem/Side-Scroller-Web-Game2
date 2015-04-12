module objects {
    // ASTEROID CLASS
    export class Bullet extends objects.GameObject {

        // CONSTRUCTOR
        constructor() {
            super("bullet");
            this.sound = "explosion";
            this.x = -10;
            this.y = -10;
               
        }

        //set the start point of bullet
        public setPoint() {
            this.x = constants.BULLET_X;
            this.y = constants.BULLET_Y;
        }

        // PUBLIC METHODS 
        public update() {            
            this.x += 5;          

            if (this.x > canvasWidth + this.width) {
               constants.BULLET_FLAG = false;
            }           
        }
        
        // hide bullet for next shot
        public destroy() {
            this.x = -10;
            this.y = -10;
            constants.BULLET_FLAG = false
        }       
    }

}   