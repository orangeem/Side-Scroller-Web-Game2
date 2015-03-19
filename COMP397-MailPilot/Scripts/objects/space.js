var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // OCEAN CLASS
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
        // PUBLIC METHODS ++++++++++++++++++++++++++++++++++++++++++
        Space.prototype.update = function () {
            //this.y += this._dy;
            //this.x += this._dx;
            this.x -= this._dx;
            this._checkBounds();
        };
        // Reset position of island to the top
        Space.prototype.reset = function () {
            // this.y = -960
            // this.x = 0;
            this.y = 0;
            //this.x = -760;
            this.x = 0;
        };
        // PRIVATE METHODS +++++++++++++++++++++++++++++++++++++++++
        Space.prototype._checkBounds = function () {
            // check if island has left the bottom of the screen
            //if (this.y === 0) {
            //  this.reset();
            //}
            if (this.x === -760) {
                this.reset();
            }
        };
        return Space;
    })(createjs.Bitmap);
    objects.Space = Space;
})(objects || (objects = {}));
//# sourceMappingURL=space.js.map