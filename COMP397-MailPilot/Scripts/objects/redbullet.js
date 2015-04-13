var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // RED BULLET CLASS
    var redBullet = (function (_super) {
        __extends(redBullet, _super);
        // CONSTRUCTOR
        function redBullet() {
            _super.call(this, "redbullet");
            this.sound = "explosion";
            this.x = -10;
            this.y = -10;
        }
        //set the start point of bullet
        redBullet.prototype.setPoint = function () {
            this.x = constants.BULLET_X;
            this.y = constants.BULLET_Y;
        };
        // PUBLIC METHODS 
        redBullet.prototype.update = function () {
            this.x += 5;
            if (this.x > canvasWidth + this.width) {
                constants.BULLET_FLAG = false;
            }
        };
        // hide bullet for next shot
        redBullet.prototype.destroy = function () {
            this.x = -10;
            this.y = -10;
            constants.BULLET_FLAG = false;
        };
        return redBullet;
    })(objects.GameObject);
    objects.redBullet = redBullet;
})(objects || (objects = {}));
//# sourceMappingURL=redbullet.js.map