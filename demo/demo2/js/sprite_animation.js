var spriteAnimation = (function (module, undefined) {

    module.Sprite = function (url, size, element, options) {
        var that = this;

        that.size_ = size;
        that.element_ = element;

        options = options || {};
        that.speed_ = options.speed || 50;
        that.reverse_ = options.reverse || false;
        that.started_ = options.started || false;

        that.updateXY(0, 0);

        var img = new Image();
        img.src = url;

        img.onload = function () {
            that.height_ = this.height;
            that.width_ = this.width;
            that.vertical_ = that.height_ > that.width_;

            var width = that.width_ + "px";
            var height = that.height_ + "px";
            var size = that.size_ + "px";

            if (that.vertical_) {
                that.element_.style.width = width;
                that.element_.style.height = size;
            } else {
                that.element_.style.width = size;
                that.element_.style.height = height;
            }
            that.element_.style.background = "url(" + url + ")";
            that.element_.style.opacity = that.element_.style.opacity || 1;
            that.loaded_ = true;
            if (that.started_) {
                that.start();
            }
        };
    };

    module.Sprite.prototype.updateXY = function (x, y) {
        this.x_ = x;
        this.y_ = y;
        this.element_.style.backgroundPosition =
            this.x_ + "px " + this.y_ + "px";
    };

    module.Sprite.prototype.start = function () {
        var that = this;
        if (!that.loop_ && that.loaded_) {
            that.loop_ = window.setInterval(function () {
                that.nextMove();
            }, that.speed_);
        }
    };

    module.Sprite.prototype.nextMove = function () {
        var that = this;
        var height = that.height_, width = that.width_, vertical = that.vertical_, x = that.x_, y = that.y_, size = that.size_;
        var offset = vertical ? y : x;
        size = that.reverse_ ? -size : size;


        offset = offset + size;
        if (offset < 0) offset = vertical ? height : width;
        if (offset > (vertical ? height : width)) offset = 0;
        vertical ? that.updateXY(x, offset) : that.updateXY(offset, y);
    };

    module.Sprite.prototype.stop = function () {
        if (this.loop_) {
            window.clearInterval(this.loop_);
            this.loop_ = undefined;
        }
    };

    module.Sprite.prototype.restart = function (intern_function) {
        var that = this;
        var restart = false;
        if (this.loop_) {
            this.stop();
            restart = true;
        }
        intern_function(that);
        if (restart) {
            this.start();
        }
    };

    module.Sprite.prototype.reverse = function () {
        this.restart(function (that) {
            that.reverse_ = !that.reverse_;
        })
    };

    module.Sprite.prototype.changeSpeed = function (speed) {
        this.restart(function (that) {
            that.speed_ = speed;
        })
    };

    module.Sprite.prototype.oneTurn = function () {

        var that = this, nb_it = (that.vertical_ ? that.height_ : that.width_) /
            that.size_, i = 0;

        if (!that.loaded_) return;
        if (that.loop_) that.stop();

        that.loop_ = window.setInterval(function () {
            that.nextMove();
            i = i + 1;
            if(i > nb_it) that.stop();
        }, that.speed_);

    };

    module.createSprite = function () {
        window.onload = function () {
            var sprites = document.getElementsByClassName('sprite');

            if (!sprites) return;

            for (var i = 0, l = sprites.length; i < l; i = i + 1) {
                var sprite = sprites[i], options = {}, buttons, display;

                for (var j = 0, m = sprite.childNodes.length; j < m; j =
                    j + 1)
                {
                    var child = sprite.childNodes[j];
                    if (child.className === "sprite-buttons") {
                        buttons = child;
                    } else if (child.className === "sprite-display") {
                        display = child;
                    }
                }

                options.speed = sprite.getAttribute('data-speed');
                options.reverse = sprite.getAttribute('data-reverse') !== null;
                options.started = sprite.getAttribute('data-started') !== null;

                sprite = new module.Sprite(sprite.getAttribute('data-url'),
                                           cleanInt(sprite.getAttribute('data-size')),
                                           display, options);

                if (!buttons) return;

                for (j = 0, m = buttons.childNodes.length; j < m; j = j + 1) {
                    var button = buttons.childNodes[j];
                    switch (button.className) {
                        case 'sprite-stop':
                            button.addEventListener('click', function () {
                                sprite.stop();
                            });
                            break;
                        case 'sprite-start':
                            button.addEventListener('click', function () {
                                sprite.start();
                            });
                            break;
                        case 'sprite-speed':
                            button.addEventListener('change', function () {
                                sprite.changeSpeed(this['options'][this['selectedIndex']].text);
                            });
                            break;
                        case 'sprite-reverse':
                            button.addEventListener('click', function () {
                                sprite.reverse();
                            });
                            break;
                        case 'sprite-one-turn':
                            button.addEventListener('click', function () {
                                sprite.oneTurn();
                            });
                    }
                }
            }
        };
    };

    function cleanInt(x) {
        x = Number(x);
        return Math[x >= 0 ? 'floor' : 'ceil'](x);
    }

    return module;
}(spriteAnimation || {}));