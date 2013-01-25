var photos = (function (my) {
    my.Sprite = function (url, size, time, element) {
        var that = this;

        that.size_ = size;
        that.time_ = time;
        that.element_ = element;
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


        };
    };

    my.Sprite.prototype.updateXY = function (x, y) {
        this.x_ = x;
        this.y_ = y;
        this.element_.style.backgroundPosition = this.x_ + "px " + this.y_ + "px";
    };

    my.Sprite.prototype.start = function () {
        var that = this;
        if (!that.loop_) {
            that.loop_ = window.setInterval(function () {
                var offset;
                if (that.vertical_) {
                    offset = that.y_ + that.size_;
                    that.y_ = offset > that.height_ ? 0 : offset;
                } else {
                    offset = that.x_ + that.size_;
                    that.x_ = offset > that.width_ ? 0 : offset;
                }
                that.updateXY(that.x_, that.y_);
            }, that.time_);
        }
    };

    my.Sprite.prototype.stop = function () {
        if (this.loop_) {
            window.clearInterval(this.loop_);
            this.loop_ = undefined;
        }
    };

    my.Sprite.prototype.changeSpeed = function(speed){
        var restart = false;
        if (this.loop_){
            this.stop();
            restart = true;
        }
        this.time_ = speed;
        if (restart){
            this.start();
        }
    };

    return my;
}(photos || {}));