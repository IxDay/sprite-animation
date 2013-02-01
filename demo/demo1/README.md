Demo 2 How to
=============

Initialization
--------------

var sprite = new Sprite(sprite_url,element[,options])

* sprite_url: the sprite image url which will be animated.
* element   : the element in which the sprite will be inserted. Be
careful, the element must have the width and height values correctly
initialized, in pixel, to fit one stripe.
* options   : some sprite options are available with this parameter,
if it is not set some default values will be used.

Options
-------

Available options are :

* speed             :  Defines the speed (in ms) for the sprite transition (default 50).
* reverse   (bool)  : If true reverse the sprite direction (default false).
* started   (bool)  : If true the sprite transition is started when it will
be fully loaded (default false).
* tick      (int)   : Defines the sensitivity for the mouse scrolling on the
sprite (default 10).

Methods
-------

Once you have your sprite object three methods are available,
and can be bind to js events.

    sprite.start()
    sprite.stop()
    sprite.changeSpeed(speed)
    sprite.update(pos)
    sprite.nextMove(back)
    sprite.restart(function)
    sprite.invert()
    sprite.oneTurn()


* start         : will start the sprite animation.
* stop          : will stop it.
* changeSpeed   : change the animation speed, if the animation is started you
 will see an acceleration.
* update        : updates the sprite position with the new position.
* nextMove      : calculates the next sprite position and displays it,
if back is true it calculates the previous sprite position.
* restart       : executes the function passed as parameter and restart the
sprite.
* invert        : reverse the sprite direction.
* oneTurn       : stops the sprite animation and performs one sprite turn.


Spin
----

You can have a spin for the sprite loading. It is interesting for an heavy
sprite if you do not want the user to think that something is not working. To
 add the spin loading just download the script at https://github
 .com/fgnass/spin.js/tree/gh-pages/dist


Insert it just before sprite_animation.js
<script type="text/javascript" src="js/spin.min.js"></script>