Nowadays, accessibility is a frequent topic when technology is talked about. And this matter has always interested me, how technology can be used to make things better for all. Because according to [Colour Blind Awareness][0], some of the types of color blindness affects approximately 1 in 12 men and 1 in 200 women in the world.

So, I did a little research about how the websites are made to attend also a color vision impaired person and the different kinds of color blindness. Researching along, I've found some websites which allow us to upload a picture and see how they look like for a color vision impaired person, but not the website itself. 

So, It came up onto my mind "What if we could apply filters on the website?!". Fortunately, it's possible using SVG. The filters are made in SVG with the matrices of each filter corresponding to each color blindness, so the browser can multiply the values. The filters are applied to the website using CSS3 and jQuery. The matrices were calculated from [here][1] and SVG original file from [here][2].

After the researching, I started to make this Chrome Extension that displays in real time how your website can be seen by them, including images and videos.

Colorblinding is working with the following types:

* Red-Blind / Protanopia 
* Green-Blind / Deuteranopia 
* Blue-Blind / Tritanopia 
* Red-Weak / Protanomaly 
* Green-Weak / Deuteranomaly 
* Blue-Weak / Tritanomaly 
* Monochromacy / Achromatopsia 
* Blue Cone Monochromacy 

**Note1: ** If the website already uses a filter in its css, the elements might change their original location when applying Colorblinding. To get them back, just select the option **deactivate** and refresh the page if it doesn't do it by itself.

**Note2: ** Colorblinding works in all tabs and the filter is applied when the tab is **fully loaded**.

The latest release is always available on the Chrome Web Store [Colorblinding][3].

Those are examples how it looks like:

![](http://i.imgur.com/tWI82MM.png) 

![](http://i.imgur.com/8QAPM0B.png) 

![](http://i.imgur.com/dyJIEDK.png) 

![](http://i.imgur.com/tWA2W6Z.png) 

![](http://i.imgur.com/1uZpYvR.png) 

[0]: http://www.colourblindawareness.org/colour-blindness/
[1]: http://web.archive.org/web/20081014161121/http://www.colorjack.com/labs/colormatrix/
[2]: https://github.com/Altreus/colourblind
[3]: https://chrome.google.com/webstore/detail/colorblinding/dgbgleaofjainknadoffbjkclicbbgaa