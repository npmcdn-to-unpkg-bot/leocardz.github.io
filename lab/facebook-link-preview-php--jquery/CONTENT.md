**Disclaimer: I will no longer maintain this project because it's an old code and hard to maintain, but it's
exported to AngularJS and Bootstrap. I believe this a great solution for an easy comprehension of the code and
will allow the project
to evolve even further. You can found this new project here \>\> [Link-Preview][0]
**

All of us know about the big phenomenon that **Facebook** is. And since they have always to keep inovating, new
super interesting features appear. And the liking of Facebook Link Preview is almost unanimous, it's activated when
some url is inserted in the field where you update your status.

Ok, it's cool But, have ever you stop to think how that works?! I did. And I got too curious. So, I started looking
how to build one of it in **PHP** + **Javascript**, using **jQuery**, and could work like Facebook's and
**Google+**'s and it can checked out in the example below.

As the most important part of the algorithm is in PHP, that is server-side, the capacity of servers that it will
run can influence the speed of its execution. And we do not even have to comment about the giants' servers, since
they are ones of the biggest technology companies in the world. 

The algorithm keeps tracking what you are typing in the status field and through regular expressions identifies a
url. Thereafter, the text is in the field is passed to PHP that does all the work to analyze all the source code of
the url found. If you enter more than one url, it will consider that the first one is the more relevant and it will
create a preview.

Once the source code of the url is obtained, regular expressions begin to seek out and capture relevant information
on it. This information is basically the title page, the images contained therein, and a brief description of the
content covered in the page.

From the collection of information is assembled the page preview. I didn't speak more about the details of the code,
giving examples of implementation, because the Link Preview is intrinsic to insert a url and generate the preview,
but for developers who want to go further exploring the code, I'm providing the download of files with only one
request: keep my reference in the codes, right?! I hope you enjoy!

### How to added onto your project

**Important:
Make sure the library php5-curl is installed and enabled on the server, either locally or remotely.
**

### - Linux

    
    
    $ sudo apt-get install php5-curl
    $ sudo service apache2 restart
    
    

### - Mac (via [macports][1])

    
    
    $ sudo port install php5-curl
    $ sudo apachectl restart
    
    

### 1 • Scripts 
    
    
    
    
    <script src='http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js'></script>
    
    <script src='js/linkPreview.js' ></script>
    
    <!--
    If you are saving and fetching results from database using FLP, you can customize the layout on this script
    -->
    <script src='js/linkPreviewRetrieve.js' ></script>
    
    
    

### 2 • Stylesheets 
    
    
    
    
    <!--
    This stylesheet is provides the layout of Facebook’s former textarea. You can totally customize this!
    -->
    <link rel="stylesheet" type="text/css" href="css/linkPreview.css" />
    
    
    

### 3 • Configuration Just create your own textarea (or multiple textareas) and bind it to jQuery like this:

    
    
    
    <script>
        $(document).ready(function() {
            $('#lp1').linkPreview();
    
            // changing placeholder
            $('#lp2').linkPreview({placeholder: "Second Field"});
    
            // bind to a tag the results brought from database
            $('#retrieveFromDatabase').linkPreviewRetrieve();
        });
    </script>
    
    
    

### Result Format

    
    
        {
            "title":"title",
            "url":"original url",
            "pageUrl":"page url",
            "canonicalUrl":"cannonical url",
            "description":"description",
            "images": "img1|img2|...",
            "video":"yes|no",
            "videoIframe":"video iframe if it is video"
        }
    
    

**Options**

option
default value
possible values
function

imageQuantity
-1
any integer
set the max amount of images to be brought (-1 for illimited)

placeholder
What's in your mind
any string
set the placeholder of textarea



[0]: http://lab.leocardz.com/link-preview/
[1]: https://www.macports.org/