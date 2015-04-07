var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // ASTEROID CLASS
    var Boss = (function (_super) {
        __extends(Boss, _super);
        // CONSTRUCTOR
        function Boss() {
            _super.call(this, "boss");
            this.sound = "explosion";
            this.reset();
        }
        // PUBLIC METHODS 
        Boss.prototype.update = function () {
            this.y -= this._dy;
            this.x -= this._dx;
            //boss moving cotrol
            if (this.x < 0 && this.y < 0) {
                this.reset();
            }
            else if (this.x > canvasWidth && this.y > canvasHeight) {
                this.reset();
            }
            else if (this.x < 0) {
                this.pointReset();
                this._dx = this._dx * -1;
            }
            else if (this.x > canvasWidth) {
                this.pointReset();
                this._dx = this._dx * 1;
            }
            else if (this.y < 0) {
                this.pointReset();
                this._dy = this._dy * -1;
            }
            else if (this.y > canvasHeight) {
                this.pointReset();
                this._dy = this._dy * -1;
            }
            this._checkBounds();
        };
        // Reset position of the asteroids to the begnning
        Boss.prototype.reset = function () {
            this.y = Math.floor(Math.random() * 480);
            this.x = 960;
            this._dy = Math.floor(Math.random() * 4) - 2;
            this._dx = Math.floor(Math.random() * 5) + 5;
        };
        Boss.prototype.pointReset = function () {
            this._dy = Math.floor(Math.random() * 4) - 2;
            this._dx = Math.floor(Math.random() * 5) + 5;
        };
        // PRIVATE METHODS 
        Boss.prototype._checkBounds = function () {
            // check if the asteroids have left the screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
        };
        return Boss;
    })(objects.GameObject);
    objects.Boss = Boss;
})(objects || (objects = {}));
//# sourceMappingURL=boss.js.map