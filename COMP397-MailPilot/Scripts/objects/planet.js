var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // ASTEROID CLASS
    var Planet = (function (_super) {
        __extends(Planet, _super);
        // CONSTRUCTOR
        function Planet() {
            _super.call(this, "planet");
            this.sound = "explosion";
            this.reset();
        }
        // PUBLIC METHODS 
        Planet.prototype.update = function () {
            this.y -= this._dy;
            this.x -= this._dx;
            this._checkBounds();
        };
        // Reset position of the asteroids to the begnning
        Planet.prototype.reset = function () {
            this.y = Math.floor(Math.random() * 480);
            this.x = 960;
            this._dy = Math.floor(Math.random() * 3) - 2;
            this._dx = Math.floor(Math.random() * 5) + 4;
        };
        // PRIVATE METHODS 
        Planet.prototype._checkBounds = function () {
            // check if the asteroids have left the screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
        };
        return Planet;
    })(objects.GameObject);
    objects.Planet = Planet;
})(objects || (objects = {}));
//# sourceMappingURL=planet.js.map