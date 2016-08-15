This post introduces a simple and useful **jQuery** plugin made by me that scales whatever elements you want. It
changes the element style. Below you can see
how many different ways you can use it and see its default and possible values that can be assumed. _Don't forget
to declare element width and height in css ou in style (this is fundamental)_.

**Options**

option
default value
possible values
function

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

scaleTime
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

$('\#scale').scale();

![](http://i.imgur.com/nCJbaUc.png)
$('\#chrome').scale({event: "click"}); 

$('\#foo').scale({event: "click", action: 'decrease'});

$('\#bar').scale({event: "mouseover", howMany: '40', scaleTime: 50});

$('\#leo').scale({event: "click", howMany: '10', frequency: 'continuous'});

$('\#hrz').scale({frequency: 'continuous', plane: 'horizontal', scaleTime: 25});

$('\#vrt').scale({action: 'decrease', frequency: 'continuous', plane: 'vertical'});

$('\#clock').scale({frequency: 'continuous', scaleTime: 1000, pixels: 3});