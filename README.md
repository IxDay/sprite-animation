360° rotation sprite.
=====================

Description
-----------
This small library allows the user to configure a sprite scrolling. A demo is
 available in the dedicated directory.

How to
------
Constructor

    var sprite = spriteAnimation.Sprite(sprite_url,sprite_size,element[,speed])
	
* sprite_url  : the sprite which will be animated.
* sprite_size : the size for one sprite (sprites can be horizontal or
vertical it will be automatically detected).
* element     : the element in which the sprite will be inserted. Be
careful, the element will be resized to fit the sprite native size.
* speed       : the transition speed (the script will pass to the next sprite
 every (speed) millisecond.

Methods

Once you have your sprite object three methods are available,
and can be bind to js events.

    sprite.start()
    sprite.stop()
    sprite.changeSpeed(speed)

* start         : will start the sprite animation.
* stop          : will stop it.
* changeSpeed   : change the animation speed, if the animation is started you
 will see an acceleration.

Miscellaneous
-------------
This library does not need any tierce library (jquery, mootools, etc...).
Tested on IE 8, Chrome 