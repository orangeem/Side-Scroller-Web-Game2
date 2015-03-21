/// <reference path="../constants.ts" />

module objects {
    // BUTTON CLASS 
    export class Button extends objects.GameObject {
        constructor(x: number, y: number, buttonIDString: string) {
            super(buttonIDString);
            this.x = x;
            this.y = y;
            this.setButtonListeners();
        }

        // Add action listener to the button
        public setButtonListeners() {
            this.cursor = 'pointer';
            this.on('rollover', this.onButtonOver);
            this.on('rollout', this.onButtonOut);
        }

        //Changes the alpha on mouse over
        public onButtonOver() {
            this.alpha = 0.8;
        }

        //Changes the alpha on mouse out
        public onButtonOut() {
            this.alpha = 1;
        }
    }
}  