/*global Spinner*/

var spriteAnimation = (function (undef) {
    "use strict";
    var module = {};

    /**
     * Extract an int from variable x. Return Nan if it cannot be parsed, preserve infinite.
     * @param x The variable to be parse, it can be a string or a float.
     * @return {*} An int correctly parsed.
     */
    function cleanInt(x) {
        x = Number(x);
        return Math[x >= 0 ? 'floor' : 'ceil'](x);
    }

    /**
     * Returns the size without the unit from a css property.
     * @param cssSize The css property.
     * @return {*} The value (integer) from the css property.
     */
    function getCssSize(cssSize) {
        return cleanInt(cssSize.substring(0, cssSize.length - 2));
    }

    /**
     * Initializes a new Spinner in the center of element.
     * @param element The element where the spinner will be inserted.
     * @return {*} A new spinner if the spinner lib is loaded, undef otherwise
     */
    function initSpinner(element) {
        try {

            var spinner = new Spinner().spin(), //Find the center of the element.
                height = cleanInt((getCssSize(element.style.height) -
                    getCssSize(spinner.el.style.height)) / 2),
                width = cleanInt((getCssSize(element.style.width) -
                    getCssSize(spinner.el.style.width)) / 2);

            //Initialize the spinner style.
            spinner.el.style.margin =
                height + "px " + width + "px " + height + "px " + width + "px";
            spinner.el.style.float = "left";

            element.appendChild(spinner.el);
            return spinner;
        } catch (e) {
            return undef;
        }
    }

    /**
     * Parses options from a sprite element.
     * @param sprite The sprite element.
     * @return {*} An option object initialized.
     */
    function parseOptions(sprite) {
        var options = {}, tick, speed;

        options.reverse = sprite.getAttribute('data-reverse') !== null;
        options.started = sprite.getAttribute('data-started') !== null;

        if ((tick = sprite.getAttribute('data-tick')) !== null) {
            options.tick = cleanInt(tick);
        }
        if ((speed = sprite.getAttribute('data-speed')) !== null) {
            options.speed = cleanInt(speed);
        }
        return options;
    }

    /**
     * Attach event handler to a button.
     * @param button The button on which the events will be attached.
     * @param sprite The sprite on which the events will be executed.
     */
    function attachEventsToButtons(button, sprite) {
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
                sprite.changeSpeed(this.options[this.selectedIndex].text);
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
            break;
        }

    }

    /**
     * Creates a new sprite element.
     * @param url The sprite image url.
     * @param element The element in which the sprite will be displayed.
     * @param options Sprites options, there are :
     *  - speed     (int)   : Defines the speed (in ms) for the sprite transition (default 50).
     *  - reverse   (bool)  : If true reverse the sprite direction (default false).
     *  - started   (bool)  : If true the sprite transition is started when it will be fully loaded (default false).
     *  - tick      (int)   : Defines the sensitivity for the mouse scrolling on the sprite (default 10).
     * @constructor Constructs a new Sprite object.
     */
    module.Sprite = function (url, element, options) {
        //initialize attributes with parameters
        options = options || {};

        //local variables
        var that = this,
            started = options.started || false,
            mouseDown = false,
            img = new Image(),
            posOri,
            spinner;
        that.speed = options.speed || 50;
        that.reverse = options.reverse || false;
        that.tick = options.tick || 10;
        that.element = element;
        img.src = url;

        //initializes element style
        element.style.background = "url(" + url + ")";
        element.style.cursor = 'move';

        //initializes a spinner (loading event).
        spinner = initSpinner(element);

        //firefox fix
        element.addEventListener('dragstart', function (e) {
            e.preventDefault();
        });


        //adds sprite mouse support.
        element.addEventListener('mouseout', function () {
            mouseDown = false;
        });

        element.addEventListener('mousemove', function (e) {
            //if the mouse move is sufficient according to sensitivity, the position is updated.
            if (mouseDown) {
                var move = cleanInt((e.clientX - posOri) / that.tick);
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
            if (that.loop) {
                that.stop();
            }
        });

        element.addEventListener('mouseup', function () {
            mouseDown = false;
        });


        //operations processed when the sprite image is fully loaded.
        img.onload = function () {
            var height = this.height, width = this.width, vertical = height >
                width;
            //computes some attributes.
            that.vertical = vertical;
            that.size = getCssSize(vertical ? element.style.height
                : element.style.width);
            that.max = vertical ? this.height : this.width;
            that.loaded = true;
            that.update(0);

            //stops the loading event.
            if (spinner) {
                spinner.stop();
            }
            if (started) {
                that.start();
            }
        };
    };

    /**
     * Updates the sprite position with the new position.
     * @param pos The new position in the sprite which will be displayed.
     */
    module.Sprite.prototype.update = function (pos) {
        this.pos = pos;
        this.element.style.backgroundPosition =
            this.vertical ? "0px " + pos + "px" : pos + "px 0px";
    };

    /**
     * Starts sprite animation if not started.
     */
    module.Sprite.prototype.start = function () {
        var that = this;
        if (!that.loop && that.loaded) {
            that.loop = window.setInterval(function () {
                that.nextMove(that.reverse);
            }, that.speed);
        }
    };

    /**
     * Calculates the next sprite position and displays it.
     * @param back Calculates the previous sprite if true.
     */
    module.Sprite.prototype.nextMove = function (back) {
        var that = this, max = that.max, pos = that.pos + (back ? -that.size : that.size);

        if (pos < 0) {
            pos = max;
        }
        if (pos > max) {
            pos = 0;
        }
        that.update(pos);
    };

    /**
     * Stops the sprite animation.
     */
    module.Sprite.prototype.stop = function () {
        if (this.loop) {
            window.clearInterval(this.loop);
            this.loop = undef;
        }
    };

    /**
     * Executes an intern function and restart the sprite.
     * @param intern_function The function which will be executed between the stop and start.
     */
    module.Sprite.prototype.restart = function (intern_function) {
        var that = this, restart = false;
        if (this.loop) {
            this.stop();
            restart = true;
        }
        intern_function(that);
        if (restart) {
            this.start();
        }
    };

    /**
     * Reverse the sprite direction.
     */
    module.Sprite.prototype.reverse = function () {
        this.restart(function (that) {
            that.reverse = !that.reverse;
        });
    };

    /**
     * Change the sprite transition speed.
     * @param speed The new transition speed.
     */
    module.Sprite.prototype.changeSpeed = function (speed) {
        this.restart(function (that) {
            that.speed = speed;
        });
    };

    /**
     * Stops the sprite animation and performs one sprite turn.
     */
    module.Sprite.prototype.oneTurn = function () {

        var that = this,
            nb_it = (that.vertical ? that.height : that.width) / that.size,
            i = 0;

        if (!that.loaded) {
            return;
        }
        if (that.loop) {
            that.stop();
        }

        that.loop = window.setInterval(function () {
            that.nextMove(that.reverse);
            i = i + 1;
            if (i > nb_it) {
                that.stop();
            }
        }, that.speed);

    };

    /**
     * Parses the DOM and initialize a Sprite object for each div with the sprite class.
     * If you want you do not have to specify any buttons.
     * However you have to specify a data-url attribute, and a child with sprite-display class.
     * The height and the width of the data-display will be used to compute your sprite direction and size. You must specify these in pixels.
     * Optionals parameters available in the DOM are :
     *  - data-url = (sprite-url)   : The sprite-url.
     *  - data-speed = (value)      : Defines the speed (in ms) for the sprite transition (default 50).
     *  - data-reverse              : If the attribute is present reverse the sprite direction.
     *  - data-started              : If the attribute is present the sprite transition is started when it will be fully loaded.
     *  - data-tick = (value)       : Defines the sensitivity for the mouse scrolling on the sprite.
     */
    module.createSprite = function () {
        window.onload = function () {
            var sprite, buttons, display, options, sprites = document.getElementsByClassName('sprite'), i, j, l, m, child;

            //Stops the function if no element is retrieved.
            if (!sprites) {
                return;
            }

            for (i = 0, l = sprites.length; i < l; i = i + 1) {
                sprite = sprites[i];

                for (j = 0, m = sprite.childNodes.length; j < m; j = j + 1) {
                    child = sprite.childNodes[j];
                    if (child.className === "sprite-buttons") {
                        buttons = child;
                    } else if (child.className === "sprite-display") {
                        display = child;
                    }
                }

                //Stops the evaluation of the given element if data-url attribute or display element are not defined.
                if (display !== undef && sprite.getAttribute('data-url')) {
                    options = parseOptions(sprite);
                    //Creates a new sprite object.
                    sprite =
                        new module.Sprite(sprite.getAttribute('data-url'), display,
                            options);
                    //Stops the evaluation of the given element if no buttons are defined.
                    if (buttons) {
                        for (j = 0, m = buttons.childNodes.length; j < m; j = j + 1) {
                            attachEventsToButtons(buttons.childNodes[j], sprite);
                        }
                    }
                }
            }
        };
    };

    return module;
}());