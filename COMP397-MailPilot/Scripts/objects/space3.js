var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // SPACE CLASS
    var Space3 = (function (_super) {
        __extends(Space3, _super);
        // CONSTRUCTOR
        function Space3() {
            _super.call(this, assetLoader.getResult("space3"));
            // PUBLIC INSTANCE VARIABLES
            this._dy = 5;
            this._dx = 5;
            this.reset();
        }
        // PUBLIC METHODS 
        Space3.prototype.update = function () {
            this.x -= this._dx;
            this._checkBounds();
        };
        // Reset position of the space 
        Space3.prototype.reset = function () {
            this.y = 0;
            this.x = 0;
        };
        // PRIVATE METHODS 
        Space3.prototype._checkBounds = function () {
            // check if the space has left the screen
            if (this.x == -900) {
                this.reset();
            }
        };
        return Space3;
    })(createjs.Bitmap);
    objects.Space3 = Space3;
})(objects || (objects = {}));
//# sourceMappingURL=space3.js.map