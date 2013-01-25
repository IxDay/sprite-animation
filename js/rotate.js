


window.onload = function () {

    sprite = new photos.Sprite('http://photos.carapuce.12.lc/img/rotate360.jpg', 376, 50,
        document.getElementById('sprite'));

    document.getElementById('stop').addEventListener('click', function () {
        sprite.stop();
    });

    document.getElementById('start').addEventListener('click', function () {
        sprite.start();
    });

};