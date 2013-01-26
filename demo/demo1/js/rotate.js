


window.onload = function () {

    sprite = new spriteAnimation.Sprite('http://192.168.1.41/demo1/img/pic.jpg', 300,document.getElementById('sprite'));

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