var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // SPACE CLASS
    var Space2 = (function (_super) {
        __extends(Space2, _super);
        // CONSTRUCTOR
        function Space2() {
            _super.call(this, assetLoader.getResult("spaceLevel2"));
            // PUBLIC INSTANCE VARIABLES
            this._dy = 5;
            this._dx = 5;
            this.reset();
        }
        // PUBLIC METHODS 
        Space2.prototype.update = function () {
            this.x -= this._dx;
            this._checkBounds();
        };
        // Reset position of the space 
        Space2.prototype.reset = function () {
            this.y = 0;
            this.x = 0;
        };
        // PRIVATE METHODS 
        Space2.prototype._checkBounds = function () {
            // check if the space has left the screen
            if (this.x === -760) {
                this.reset();
            }
        };
        return Space2;
    })(createjs.Bitmap);
    objects.Space2 = Space2;
})(objects || (objects = {}));
//# sourceMappingURL=space2.js.map