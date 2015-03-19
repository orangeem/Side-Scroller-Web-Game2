var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // CLOUD CLASS
    var Asteroid = (function (_super) {
        __extends(Asteroid, _super);
        // CONSTRUCTOR
        function Asteroid() {
            _super.call(this, "asteroid");
            this.sound = "explosion";
            this.reset();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        Asteroid.prototype.update = function () {
            this.y -= this._dy;
            this.x -= this._dx;
            this._checkBounds();
        };
        // Reset position of island to the top
        Asteroid.prototype.reset = function () {
            //this.y = -this.height;
            //this.x = Math.floor(Math.random() * 640);
            //this._dy = Math.floor(Math.random() * 5) + 5;
            //this._dx = Math.floor(Math.random() * 4) - 2;
            this.y = Math.floor(Math.random() * 480);
            //this.x = this.width;
            this.x = 960;
            this._dy = Math.floor(Math.random() * 4) - 2;
            this._dx = Math.floor(Math.random() * 5) + 5;
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        Asteroid.prototype._checkBounds = function () {
            // check if island has left the bottom of the screen
            //if (this.y >= (480 + this.height)) {
            //  this.reset();
            //}
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
        };
        return Asteroid;
    })(objects.GameObject);
    objects.Asteroid = Asteroid;
})(objects || (objects = {}));
//# sourceMappingURL=asteroid.js.map