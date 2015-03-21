var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // ALLY CLASS
    var Ally = (function (_super) {
        __extends(Ally, _super);
        // CONSTRUCTOR
        function Ally() {
            _super.call(this, "ally");
            this.sound = "pickup";
            this._dx = 5;
            this.reset();
        }
        // PUBLIC METHODS 
        Ally.prototype.update = function () {
            this.x -= this._dx;
            this._checkBounds();
        };
        // Reset position of the ally to the beginning
        Ally.prototype.reset = function () {
            this.x = 960;
            this.y = Math.floor(Math.random() * 480);
        };
        // PRIVATE METHODS 
        Ally.prototype._checkBounds = function () {
            // check if the ally has left the screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
        };
        return Ally;
    })(objects.GameObject);
    objects.Ally = Ally;
})(objects || (objects = {}));
//# sourceMappingURL=ally.js.map