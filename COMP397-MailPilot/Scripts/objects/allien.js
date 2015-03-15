var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // PLANE CLASS
    var Allien = (function (_super) {
        __extends(Allien, _super);
        // CONSTRUCTOR
        function Allien() {
            _super.call(this, assetLoader.getResult("allien"));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.y = 430;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            createjs.Sound.play("soundtrack", { loop: -1 });
        }
        // PUBLIC METHODS
        Allien.prototype.update = function () {
            this.x = stage.mouseX;
        };
        return Allien;
    })(createjs.Bitmap);
    objects.Allien = Allien;
})(objects || (objects = {}));
//# sourceMappingURL=allien.js.map