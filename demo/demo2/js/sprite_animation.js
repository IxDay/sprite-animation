var spriteAnimation = (function (module, undefined) {

    module.Sprite = function (url, element, options) {
        var that = this;

        options = options || {};

        that.speed_ = options.speed || 50;
        that.reverse_ = options.reverse || false;
        that.tick_ = options.tick || 10;
        that.element_ = element;

        var started = options.started || false;
        var mouseDown = false;
        var img = new Image();
        var posOri;
        img.src = url;

        //firefox fix
        element.addEventListener('dragstart', function (e) {
            e.preventDefault();
        });

        element.style.background = "url(" + url + ")";
        element.style.cursor = 'move';


        element.addEventListener('mouseout', function () {
            mouseDown = false;
        });

        element.addEventListener('mousemove', function (e) {
            if (mouseDown) {
                var move = cleanInt((e.clientX - posOri) / that.tick_);
                if (move >= 1) {
                    posOri = e.clientX;
                    that.nextMove(false);
                }
                if (move <= -1) {
                    posOri = e.clientX;
                    that.nextMove(true);
                }
            }
        });

        element.addEventListener('mousedown', function (e) {
            mouseDown = true;
            posOri = e.clientX;
            if (that.loop_) that.stop();
        });

        element.addEventListener('mouseup', function () {
            mouseDown = false;
        });


        var spinner = initSpinner(element);

        img.onload = function () {
            var height = this.height, width = this.width, vertical = height >
                width;

            that.vertical_ = vertical;
            that.size_ = getCssSize(vertical ?
                element.style.height : element.style.width);

            that.max_ = vertical ? this.height : this.width;
            that.loaded_ = true;
            that.update(0);

            if (spinner) spinner.stop();

            if (started) that.start();
        };
    };

    module.Sprite.prototype.update = function (pos) {
        this.pos_ = pos;
        this.element_.style.backgroundPosition =
            this.vertical_ ? "0px " + pos + "px" : pos + "px 0px";
    };

    module.Sprite.prototype.start = function () {
        var that = this;
        if (!that.loop_ && that.loaded_) {
            that.loop_ = window.setInterval(function () {
                that.nextMove(that.reverse_);
            }, that.speed_);
        }
    };

    module.Sprite.prototype.nextMove = function (back) {
        var that = this, size = that.size_, pos = that.pos_, max = that.max_;
        size = back ? -size : size;
        pos = pos + size;
        if (pos < 0) pos = max;
        if (pos > max) pos = 0;
        that.update(pos);
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
            that.nextMove(that.reverse_);
            i = i + 1;
            if (i > nb_it) that.stop();
        }, that.speed_);

    };

    module.createSprite = function () {
        window.onload = function () {
            var tick, sprite, buttons, display, options = {}, sprites = document.getElementsByClassName('sprite');

            if (!sprites) return;

            for (var i = 0, l = sprites.length; i < l; i = i + 1) {
                sprite = sprites[i];

                for (var j = 0, m = sprite.childNodes.length; j < m; j =
                    j + 1) {
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
                if ((tick = sprite.getAttribute('data-tick')) !== null) {
                    options.tick = cleanInt(tick);
                }

                sprite = new module.Sprite(sprite.getAttribute('data-url'),
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

    /**
     * Extract an int from variable x.
     * @param x the variable to be parse, it can be a string, a float
     * @return {*}
     */
    function cleanInt(x) {
        x = Number(x);
        return Math[x >= 0 ? 'floor' : 'ceil'](x);
    }

    function getCssSize(cssSize) {
        return cleanInt(cssSize.substring(0, cssSize.length - 2))
    }

    /**
     * Initialize
     * @param element
     * @return {*}
     */
    function initSpinner(element) {
        try{
            var spinner = new Spinner().spin(),
                height = cleanInt((getCssSize(element.style.height) -
                    getCssSize(spinner.el.style.height)) / 2),
                width = cleanInt((getCssSize(element.style.width) -
                    getCssSize(spinner.el.style.width)) / 2);

            spinner.el.style.margin =
                height + "px " + width + "px " + height + "px " + width + "px";
            spinner.el.style.float = "left";

            element.appendChild(spinner.el);
            return spinner;
        }catch (e){
            return undefined
        }


    }

    return module;
}(spriteAnimation || {}));