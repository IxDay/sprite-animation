var spriteAnimation = (function (module) {
    module.Sprite = function (url, size, element,speed) {
        var that = this;

        that.size_ = size;
        that.speed_ = speed || 50;
        that.element_ = element;
        that.update(0, 0);

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
            that.loaded_ = true;
        };
    };

    module.Sprite.prototype.update = function (x, y) {
        this.x_ = x;
        this.y_ = y;
        this.element_.style.backgroundPosition = this.x_ + "px " + this.y_ + "px";
    };

    module.Sprite.prototype.start = function () {
        var that = this;
        if (!that.loop_ && that.loaded_) {
            that.loop_ = window.setInterval(function () {
                var offset;
                if (that.vertical_) {
                    offset = that.y_ + that.size_;
                    that.y_ = offset > that.height_ ? 0 : offset;
                } else {
                    offset = that.x_ + that.size_;
                    that.x_ = offset > that.width_ ? 0 : offset;
                }
                that.update(that.x_, that.y_);
            }, that.speed_);
        }
    };

    module.Sprite.prototype.stop = function () {
        if (this.loop_) {
            window.clearInterval(this.loop_);
            this.loop_ = undefined;
        }
    };

    module.Sprite.prototype.changeSpeed = function(speed){
        var restart = false;
        if (this.loop_){
            this.stop();
            restart = true;
        }
        this.speed_ = speed;
        if (restart){
            this.start();
        }
    };

    module.createSprite = function(){

    };

    return module;
}(spriteAnimation || {}));