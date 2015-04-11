var objects;
(function (objects) {
    var redbirdData = {
        "images": ["assets/images/redbirdAltas.png"],
        "frames": [
            [2, 2, 40, 42],
            [64, 2, 43, 42],
            [126, 2, 45, 42],
            [189, 2, 42, 42],
            [252, 2, 42, 42],
            [314, 2, 41, 42],
            [376, 2, 45, 42],
            [438, 2, 44, 42]
        ],
        "animations": {
            "birdFly": {
                frames: [0, 1, 2, 3, 4, 5, 6, 7],
                speed: 0.1
            }
        }
    };
    var Redbird = (function () {
        function Redbird(stage, game) {
            this.isColliding = false;
            this.stage = stage;
            this.game = game;
            this.redbirdAtlas = new createjs.SpriteSheet(redbirdData);
            this.image = new createjs.Sprite(this.redbirdAtlas, "birdFly");
            this.width = this.image.getBounds().width;
            this.height = this.image.getBounds().height;
            this.image.regX = this.width / 2;
            this.image.regY = this.height / 2;
            this.reset();
            this.game.addChild(this.image);
        }
        Redbird.prototype.update = function () {
            this.image.y += this.dy;
            this.image.x -= this.dx;
            if (this.image.x < 0) {
                this.reset();
            }
        };
        Redbird.prototype.reset = function () {
            this.image.y = Math.floor(Math.random() * canvasHeight);
            this.dx = Math.floor(Math.random() * 2 + 2);
            this.dy = Math.floor(Math.random() * -4) + Math.floor(Math.random() * 4);
            this.image.x = canvasWidth;
        };
        return Redbird;
    })();
    objects.Redbird = Redbird;
})(objects || (objects = {}));
//# sourceMappingURL=redbird.js.map