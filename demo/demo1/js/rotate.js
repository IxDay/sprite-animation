


window.onload = function () {

    var sprite = new Sprite('img/rotate360.jpg',document.getElementById('sprite'));

    document.getElementById('stop').addEventListener('click', function () {
        sprite.stop();
    });

    document.getElementById('start').addEventListener('click', function () {
        sprite.start();
    });

    document.getElementById('reverse').addEventListener('click',function(){
        sprite.invert();
    });

    document.getElementById('one-turn').addEventListener('click',function(){
        sprite.oneTurn();
    });

    document.getElementById('speed').addEventListener('change',function(){
        sprite.changeSpeed(this.options[this.selectedIndex].value);
    });
};