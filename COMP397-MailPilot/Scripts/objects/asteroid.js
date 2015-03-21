var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // ASTEROID CLASS
    var Asteroid = (function (_super) {
        __extends(Asteroid, _super);
        // CONSTRUCTOR
        function Asteroid() {
            _super.call(this, "asteroid");
            this.sound = "explosion";
            this.reset();
        }
        // PUBLIC METHODS 
        Asteroid.prototype.update = function () {
            this.y -= this._dy;
            this.x -= this._dx;
            this._checkBounds();
        };
        // Reset position of the asteroids to the begnning
        Asteroid.prototype.reset = function () {
            this.y = Math.floor(Math.random() * 480);
            this.x = 960;
            this._dy = Math.floor(Math.random() * 4) - 2;
            this._dx = Math.floor(Math.random() * 5) + 5;
        };
        // PRIVATE METHODS 
        Asteroid.prototype._checkBounds = function () {
            // check if the asteroids have left the screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
        };
        return Asteroid;
    })(objects.GameObject);
    objects.Asteroid = Asteroid;
})(objects || (objects = {}));
//# sourceMappingURL=asteroid.js.map