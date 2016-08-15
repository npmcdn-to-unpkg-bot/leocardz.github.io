A funny way to interact with the mouse. It is excellent for Team showcases on your website.

You can use a set of images to change according to mouse position on the screen. This way it gives the impressions of movement. It will work with devices with a pointer (mouse) in the screen. Have fun!


Just follow the following simple steps to add it to your project


### 1 • Scripts 


    
    
    	<script src='http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'></script>
    
    	<script src='js/movement.js' ></script>
    
    
    



### 2 • Configuration 

Just create your own **img tag** (or multiple **img tags**) with width and height specified whether inline or in css and bind it to jQuery like this:


    
    
    <img id="IMG ID" style="width: 200px; height: 200px;">
    
    <script>
    
       		$(document).ready(function() {
    
    			$('IMG ID').movement({
                			center: "http://i.imgur.com/tkStHbe.jpg",
                			up: "http://i.imgur.com/cQ1YagQ.jpg",
                			upRight: "http://i.imgur.com/8yVBOAZ.jpg",
                			right: "http://i.imgur.com/7FccqSR.jpg",
                			downRight: "http://i.imgur.com/CnIHIPB.jpg",
                			down: "http://i.imgur.com/HbuZjKB.jpg",
                			downLeft: "http://i.imgur.com/ve2uhtb.jpg",
                			left: "http://i.imgur.com/rcaqqog.jpg",
                			upLeft: "http://i.imgur.com/pOsZXC7.jpg"
               	 	});
    		});
    
    </script>
    
    
    



option
default value
possible values

center
img/center.jpg
any string

up
img/up.jpg
any string

upRight
img/upRight.jpg
any string

right
img/right.jpg
any string

downRight
img/downRight.jpg
any string

down
img/down.jpg
any string

downLeft
img/downLeft.jpg
any string

upLeft
img/upLeft.jpg
any string