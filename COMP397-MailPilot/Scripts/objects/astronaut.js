var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // ASTRONAUT CLASS
    var Astronaut = (function (_super) {
        __extends(Astronaut, _super);
        // CONSTRUCTOR
        function Astronaut() {
            _super.call(this, "astronaut");
            this.sound = "pickup";
            this._dx = 5;
            this.reset();
        }
        // PUBLIC METHODS 
        Astronaut.prototype.update = function () {
            this.x -= this._dx;
            this._checkBounds();
        };
        // Reset position of the ally to the beginning
        Astronaut.prototype.reset = function () {
            this.x = 960;
            this.y = Math.floor(Math.random() * 480);
        };
        // PRIVATE METHODS 
        Astronaut.prototype._checkBounds = function () {
            // check if the ally has left the screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
        };
        return Astronaut;
    })(objects.GameObject);
    objects.Astronaut = Astronaut;
})(objects || (objects = {}));
//# sourceMappingURL=astronaut.js.map