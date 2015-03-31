var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var objects;
(function (objects) {
    // ALLIEN CLASS
    var Allien = (function (_super) {
        __extends(Allien, _super);
        // CONSTRUCTOR
        function Allien() {
            _super.call(this, assetLoader.getResult("allien"));
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.x = 35;
            this.y = 240;
            this.regX = this.width * 0.5;
            this.regY = this.height * 0.5;
            createjs.Sound.play("soundtrack", { loop: -1 });
            // Set up movement and controls
            this.assignControls();
        }
        // PUBLIC METHODS
        Allien.prototype.update = function () {
            // Return if game currently paused
            if (constants.MENU_STATE) {
                this.y = stage.mouseY;
                this.x = stage.mouseX;
            }
            else {
                if (controls.down == true && this.y < 450) {
                    console.log("down");
                    this.y += 3;
                }
                else if (controls.up == true && this.y > 30) {
                    console.log("up");
                    this.y -= 3;
                }
                else if (controls.left == true && this.x > 30) {
                    this.x -= 3;
                }
                else if (controls.right == true && this.x < 610) {
                    this.x += 3;
                }
            }
        };
        Allien.prototype.assignControls = function () {
            // Binds key actions
            window.onkeydown = this.onControlDown;
            window.onkeyup = this.onControlUp;
        };
        Allien.prototype.onControlDown = function (e) {
            switch (e.which) {
                case keys.LEFT:
                case keys.A:
                    controls.left = true;
                    controls.lTally++;
                    controls.rTally = 0;
                    break;
                case keys.RIGHT:
                case keys.D:
                    controls.right = true;
                    controls.rTally++;
                    controls.lTally = 0;
                    break;
                case keys.UP:
                case keys.W:
                    controls.up = true;
                    controls.rTally++;
                    controls.lTally = 0;
                    break;
                case keys.DOWN:
                case keys.S:
                    controls.down = true;
                    controls.rTally++;
                    controls.lTally = 0;
                    break;
                case keys.SPACEBAR:
                    break;
            }
        };
        Allien.prototype.onControlUp = function (e) {
            switch (e.which) {
                case keys.LEFT:
                case keys.A:
                    controls.left = false;
                    break;
                case keys.RIGHT:
                case keys.D:
                    controls.right = false;
                    break;
                case keys.W:
                case keys.UP:
                    controls.up = false;
                    break;
                case keys.S:
                case keys.DOWN:
                    controls.down = false;
                    break;
                case keys.SPACEBAR:
                    controls.spacebar = false;
                    break;
            }
        };
        return Allien;
    })(createjs.Bitmap);
    objects.Allien = Allien;
})(objects || (objects = {}));
//# sourceMappingURL=allien.js.map