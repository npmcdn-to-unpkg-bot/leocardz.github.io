Just like [Scale][0], this post introduces a simple
and useful **jQuery** plugin made by me that rotates whatever elements you want. It changes the element style.
Below you can see
how many different ways you can use it and see its default and possible values that can be assumed.

Have you ever seen the time by a Chrome clock?!

![](http://i.imgur.com/nCJbaUc.png)
![](http://i.imgur.com/nCJbaUc.png)
![](http://i.imgur.com/jqMwr9E.png)  
: : 

**Options**

option
default value
possible values
function

event
click, mouseover
event which the animation will start at

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

clock
no
yes, no
to assume the position of a clock

hour
no
yes, no
clock hours

minute
no
yes, no
clock minutes

second
no
yes, no
clock seconds

![](http://i.imgur.com/nCJbaUc.png)
$('\#chrome').rotate(); 

![](http://i.imgur.com/jqMwr9E.png)
$('\#chromium').rotate({way: 'left', speed: 3});

![](http://i.imgur.com/nCJbaUc.png)
$('\#chrome1').rotate({way: 'left', event: 'mouseover'});

![](http://i.imgur.com/jqMwr9E.png)
$('\#chromium1').rotate({event: "click", way: 'right', speed: 15});

![](http://i.imgur.com/nCJbaUc.png)
$('\#chrome2').rotate({time: 1000, speed: 6}); 

![](http://i.imgur.com/jqMwr9E.png)
$('\#chromium2').rotate({event: "mouseover", degrees: 180, time: 10, speed: 5});

$('\#rotate').rotate({event: "click", degrees: 90});



[0]: http://lab.leocardz.com/scale-jquery/