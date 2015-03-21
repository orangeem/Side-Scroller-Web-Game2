var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // SPACE CLASS
    var Space = (function (_super) {
        __extends(Space, _super);
        // CONSTRUCTOR
        function Space() {
            _super.call(this, assetLoader.getResult("space"));
            // PUBLIC INSTANCE VARIABLES
            this._dy = 5;
            this._dx = 5;
            this.reset();
        }
        // PUBLIC METHODS 
        Space.prototype.update = function () {
            this.x -= this._dx;
            this._checkBounds();
        };
        // Reset position of the space 
        Space.prototype.reset = function () {
            this.y = 0;
            this.x = 0;
        };
        // PRIVATE METHODS 
        Space.prototype._checkBounds = function () {
            // check if the space has left the screen
            if (this.x === -760) {
                this.reset();
            }
        };
        return Space;
    })(createjs.Bitmap);
    objects.Space = Space;
})(objects || (objects = {}));
//# sourceMappingURL=space.js.map