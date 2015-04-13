var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // ANGRY PLANET CLASS
    var angryPlanet = (function (_super) {
        __extends(angryPlanet, _super);
        // CONSTRUCTOR
        function angryPlanet() {
            _super.call(this, "angryplanet");
            //this.sound = "explosion";
            this.sound = "explosion";
            this.reset();
        }
        // PUBLIC METHODS 
        angryPlanet.prototype.update = function () {
            this.y -= this._dy;
            this.x -= this._dx;
            this._checkBounds();
        };
        // Reset position of the planets to the begnning
        angryPlanet.prototype.reset = function () {
            this.y = Math.floor(Math.random() * 480);
            this.x = 960;
            this._dy = Math.floor(Math.random() * 4) - 2;
            this._dx = Math.floor(Math.random() * 5) + 5;
        };
        // PRIVATE METHODS 
        angryPlanet.prototype._checkBounds = function () {
            // check if the asteroids have left the screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
        };
        return angryPlanet;
    })(objects.GameObject);
    objects.angryPlanet = angryPlanet;
})(objects || (objects = {}));
//# sourceMappingURL=angryplanet.js.map