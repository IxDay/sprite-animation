Demo 2 How to
=============

Minimalist
----------

Insert the following code into your HTML page (demo2 example)

    <div class="sprite" data-url="img/rotate360.jpg" >
        <div class="sprite-display" style="width: 704px; height: 376px"></div>
    </div>
    <script type="text/javascript" src="js/sprite_animation.js"></script>
    <script type="text/javascript">
        CreateSprite();
    </script>


Features
--------

It is the minimalistic insertion. You can add some feature by adding into the
div with sprite class (same level as sprite-display):
    <div class="sprite-buttons">
        <button class="sprite-stop">Stop</button>
        <button class="sprite-start">Start</button>
        <button class="sprite-reverse">Reverse</button>
        <button class="sprite-one-turn">One turn</button>
        <label for="sprite-speed">Sprite speed</label>
        <select class="sprite-speed" id="sprite-speed">
            <option value="100" >slow</option>
            <option value="50" selected>normal</option>
            <option value="10" >quick</option>
        </select>
    </div>

All buttons are optionals, if you do not want a feature just suppress the
button from the div. Features are :
 * sprite-stop      : Stops current sprite animation.
 * sprite-start     : Starts current sprite animation.
 * sprite-reverse   : Reverse the sprite animation direction.
 * sprite-one-turn  : Stops the sprite animation and performs one sprite turn.
 * sprite-speed     : Change the sprite transition speed. You can add the
 values you need. The values are the speed in millisecond between each sprite
  transition.

Spin
----

You can have a spin for the sprite loading. It is interesting for an heavy
sprite if you do not want the user to think that something is not working. To
 add the spin loading just download the script at https://github
 .com/fgnass/spin.js/tree/gh-pages/dist


Insert it just before sprite_animation.js
<script type="text/javascript" src="js/spin.min.js"></script>