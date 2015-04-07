var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // ASTEROID CLASS
    var Bullet = (function (_super) {
        __extends(Bullet, _super);
        // CONSTRUCTOR
        function Bullet() {
            _super.call(this, "bullet");
            this.sound = "explosion";
            this.x = -10;
            this.y = -10;
        }
        //set the start point of bullet
        Bullet.prototype.setPoint = function () {
            this.x = constants.BULLET_X;
            this.y = constants.BULLET_Y;
        };
        // PUBLIC METHODS 
        Bullet.prototype.update = function () {
            this.x += 5;
            if (this.x > canvasWidth + this.width) {
                constants.BULLET_FLAG = false;
            }
        };
        // hide bullet for next shot
        Bullet.prototype.destroy = function () {
            this.x = -10;
            this.y = -10;
            constants.BULLET_FLAG = false;
        };
        return Bullet;
    })(objects.GameObject);
    objects.Bullet = Bullet;
})(objects || (objects = {}));
//# sourceMappingURL=bullet.js.map