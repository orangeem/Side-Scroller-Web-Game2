var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // pill CLASS
    var Pill = (function (_super) {
        __extends(Pill, _super);
        // CONSTRUCTOR
        function Pill() {
            _super.call(this, "pill");
            this.sound = "bite";
            this._dx = 6;
            this.reset();
        }
        // PUBLIC METHODS 
        Pill.prototype.update = function () {
            this.x -= this._dx;
            this._checkBounds();
        };
        // Reset position of the pill to the beginning
        Pill.prototype.reset = function () {
            this.x = 960;
            this.y = Math.floor(Math.random() * 480);
        };
        // PRIVATE METHODS 
        Pill.prototype._checkBounds = function () {
            // check if the pill has left the screen
            if (this.x <= (0 - this.width)) {
                this.reset();
            }
        };
        return Pill;
    })(objects.GameObject);
    objects.Pill = Pill;
})(objects || (objects = {}));
//# sourceMappingURL=pill.js.map