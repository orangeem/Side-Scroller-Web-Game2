var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // ISLAND CLASS
    var Ally = (function (_super) {
        __extends(Ally, _super);
        // CONSTRUCTOR
        function Ally() {
            _super.call(this, "ally");
            this.sound = "pickup";
            // this._dy = 5;
            this._dx = 5;
            this.reset();
        }
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        Ally.prototype.update = function () {
            // this.y += this._dy;
            this.x -= this._dx;
            this._checkBounds();
        };
        // Reset position of island to the top
        Ally.prototype.reset = function () {
            //this.y = -this.height;
            //this.x = Math.floor(Math.random() * 640);
            //this.x = -this.width;
            this.x = 960;
            this.y = Math.floor(Math.random() * 480);
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        Ally.prototype._checkBounds = function () {
            // check if island has left the bottom of the screen
            // if (this.y >= (480 + this.height)) {
            //   this.reset();
            //}
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
        };
        return Ally;
    })(objects.GameObject);
    objects.Ally = Ally;
})(objects || (objects = {}));
//# sourceMappingURL=ally.js.map