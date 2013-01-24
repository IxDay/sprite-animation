/*|
|*|
|*|  IE-specific polyfill which enables the passage of arbitrary arguments to the
|*|  callback functions of javascript timers (HTML5 standard syntax).
|*|
|*|  https://developer.mozilla.org/en-US/docs/DOM/window.setInterval
|*|
|*|  Syntax:
|*|  var timeoutID = window.setTimeout(func, delay, [param1, param2, ...]);
|*|  var timeoutID = window.setTimeout(code, delay);
|*|  var intervalID = window.setInterval(func, delay[, param1, param2, ...]);
|*|  var intervalID = window.setInterval(code, delay);
|*|
|*/

if (document.all && !window.setTimeout.isPolyfill) {
    var __nativeST__ = window.setTimeout;
    window.setTimeout = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
        var aArgs = Array.prototype.slice.call(arguments, 2);
        return __nativeST__(vCallback instanceof Function ? function () {
            vCallback.apply(null, aArgs);
        } : vCallback, nDelay);
    };
    window.setTimeout.isPolyfill = true;
}

if (document.all && !window.setInterval.isPolyfill) {
    var __nativeSI__ = window.setInterval;
    window.setInterval = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
        var aArgs = Array.prototype.slice.call(arguments, 2);
        return __nativeSI__(vCallback instanceof Function ? function () {
            vCallback.apply(null, aArgs);
        } : vCallback, nDelay);
    };
    window.setInterval.isPolyfill = true;
}


var Sprite = function(url,size,time,vertical,element){
    var that = this;

    that.vertical_ = vertical;
    that.size_ = size;
    that.time_ = time;
    that.element_ = element;

    var img = new Image();
    img.src = url;

    that.loaded_ = function(callback){
        img.onload = function() {
            that.height_ = this.height;
            that.width_ = this.width;
            if(callback){
                callback(that);
            }
        };
    }
};

Sprite.prototype.start = function(){
    this.loaded_(function(elem){
        console.log(elem);
    })
};

var sprite = document.getElementsByClassName('sprite')[0];
var toto = new Sprite('http://photos.carapuce.12.lc/img/rotate360.jpg',376,1000,true,sprite);
toto.start();

window.onload = function(){
    var sprites = document.getElementsByClassName('sprite');

//    window.addEventListener('mouseover',function(){
//
//    });

    for(var i = 0, l = sprites.length; i < l; i++){
        var sprite = sprites[i];
        var style = sprite.currentStyle || window.getComputedStyle(sprite, null);
//        console.log(style.backgroundImage.slice(4, -1));
//
//        window.getComputedStyle(sprite,null).getPropertyValue('background');

//        window.setInterval(function(sprite){
//            console.log();
//        },1000,sprites[i]);
    }
};