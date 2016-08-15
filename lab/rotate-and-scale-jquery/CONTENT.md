If you liked [Scale][0] and [Rotate ][1], you will probably like this **jQuery**
plugin too. It's the mix of both. It's the same simple and useful usage.

**Options**

option
default value
possible values
_function_

event
click, mouseover
event which the animation will start at

action
increase
increase, decrease
animation behavior

howMany
20
any integer
how many times the element will be increased or decreased

initialSize
element width
any integer
starting width

finalSize
element width
any integer
final width

pixels
1
any integer
how many pixels will be increased or decreased at once

rotateAndScaleTime
0
any integer
animation speed in milliseconds

keepScaling
no
yes, no
if keepScalling is equal to yes, the animation will stop at inicialSize + howMany ou inicialSize -
howMany

frequency
one
one, continuous
if frequency is equal to continuous, the animation will keep being performed until there is a stop
condition, if there's not it'll be performed forever

plane
both
vertical, horizontal
orientation of animation

way
right
right, left
animation way

time
0
any integer
performing time in milliseconds

speed
1
any integer
animation speed (how many pixels will be rotated at once)

degrees
any integer between 0 and 360
how many degrees to be rotated

$('\#rotateAndScale').rotateAndScale();

$('\#foo').rotateAndScale({event: "click", action: 'decrease'});

$('\#bar').rotateAndScale({event: "mouseover", howMany: '40', rotateAndScaleTime: 50});

$('\#leo').rotateAndScale({event: "click", howMany: '10', frequency: 'continuous'});

$('\#hrz').rotateAndScale({way: "left", frequency: 'continuous', plane: 'horizontal', rotateAndScaleTime: 25});

$('\#vrt').rotateAndScale({frequency: 'continuous', plane: 'vertical', action: 'decrease'});

$('\#clock').rotateAndScale({way: "left", frequency: 'continuous', rotateAndScaleTime: 1000, pixels: 3});



[0]: http://lab.leocardz.com/scale-jquery/
[1]: http://lab.leocardz.com/rotate-jquery/