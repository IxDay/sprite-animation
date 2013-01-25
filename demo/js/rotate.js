


window.onload = function () {

    sprite = new spriteAnimation.Sprite('http://photos.carapuce.12.lc/img/rotate360.jpg', 376,document.getElementById('sprite'));

    document.getElementById('stop').addEventListener('click', function () {
        sprite.stop();
    });

    document.getElementById('start').addEventListener('click', function () {
        sprite.start();
    });

    document.getElementById('speed').addEventListener('change',function(){
        sprite.changeSpeed(this.options[this.selectedIndex].text);
    });
};