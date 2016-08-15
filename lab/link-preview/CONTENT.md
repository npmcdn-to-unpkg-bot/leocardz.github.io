Hey, guys! This is the new version of Facebook Link Preview. It's built in AngularJS + Bootstrap. Lighter, faster,
more beautiful and highly customizable. Let's go to the awesomeness!

![](https://github.com/LeonardoCardoso/Link-Preview/blob/master/demo/img/preview_gallery.gif?raw=true)

![](https://github.com/LeonardoCardoso/Link-Preview/blob/master/demo/img/preview_video.gif?raw=true)

### HTTP Server 

Apache (must support mod\_php)

### How to add it to your project

### 1 • Stylesheets

    
    
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
    
        <link rel="stylesheet" type="text/css" href="src/link-preview/css/link-preview.css" />
    
    

### 2 • Scripts

    
    
        <script src="https://code.jquery.com/jquery-2.1.4.min.js" type="text/javascript"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.5/angular.min.js" type="text/javascript"></script>
    
        <script src="src/link-preview/js/link-preview.js" type="text/javascript"></script>
    
        <!-- Include this script below if you want to retrieve the posts inserted to database -->
        <script src="src/link-preview/js/link-preview-database.js" type="text/javascript"></script>
    
    

### 3 • Configuration

Add the link preview module as a dependency to your application module:

    
    
        var app = angular.module('App', ['linkpreview'])
    
    

Add the directive inside your controller html:

    
    
        <link-preview placeholder="What's in your mind?" />
    
    

**Options**

att
var
default value
possible values

type
type
right
right, left, bottom, top (text position)

amount
imageAmount
-1
any integer

btext
buttonText
Post
any string

bclass
buttonClass
primary
default, primary, success, info, warning, danger, link

cbtext
cancelButtonText
Cancel
any string

cbclass
cancelButtonClass
danger
default, primary, success, info, warning, danger, link

ltext
loadingText
Loading
any string

limage
loadingImage
empty.png
any image url

placeholder
placeholder
an empty string
any string

ttext
thumbnailText
Choose a thumbnail
any string

nttext
noThumbnailText
No thumbnail
any string

tpage
thumbnailPagination
%N of %N
any string, %N is the number reference of pagination

dtitle
defaultTitle
Enter a title
any string

ddescription
defaultDescription
Enter a description
any string

    
    
        <link-preview
                type=""
                ttext=""
                tpage=""
                placeholder=""
                amount=""
                limage=""
                ltext=""
                btext=""
                bclass=""
                ctext=""
                cclass=""
                dtitle=""
                ddescription="" />
    
    

### 4 • Database

To custom your database configurations, you need to change the following values in Database.php

    
    
        $host = "localhost";
        $user = "";
        $password = "";
        $database = "linkpreview";
    
    

Additionally, the way I used to retrieve the data was creating a controller link-preview-database.js which you can
include the file somehow in your project or you can its content to yours.

    
    
        app.controller('MyControllerDatabase', ['$scope', '$http', function ($scope, $http) {
    
            $scope.databasePosts = [];
            $scope.retrieveFromDatabase = function () {
    
                // You must insert in your page a div with the posts retrieved from database. Just like the posts div
                // on template html files
    
                var url = 'src/link-preview/php/retrieve.php';
                $http({
                    url: url,
                    method: "GET",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                        }).success(function (data, status, headers, config) {
    
                            for (var i = 0; i < data.length; i++) {
                                data[i].video = data[i].videoIframe !== "";
                                data[i].showIframe = false;
                                data[i].textHTML = $sce.trustAsHtml(data[i].text);
                                data[i].descriptionHTML = $sce.trustAsHtml(data[i].description);
                                data[i].videoIframeHTML = $sce.trustAsHtml(data[i].videoIframe);
                                console.log(data[i]);
                            }
    
                            $scope.databasePosts = data;
    
                        });
    
                };
    
            $scope.deletePosted = function (post, $index) {
                $scope.posts.splice($index, 1);
            };
    
            $scope.imageAction = function (post) {
    
                if (post.video == false) {
                    window.open(post.pageUrl, '_blank');
                } else {
                    post.showIframe = true;
                }
    
            };
    
            $scope.hidePlay = function (post) {
                return post.video == false || post.showIframe == true;
            };
    
            $scope.layoutWithoutImage = function (post) {
                return post.image == '' || post.showIframe == true;
            };
    
            $scope.layoutWithImage = function (post) {
                return post.image != '' || (post.video == true && post.showIframe == false);
            };
    
    
        }]);
    
    

Also, check the file database-template.php to see an example of
how to display the data retrieved from database.

Make sure your columns are the same as those ones in linkpreview.sql or
customize them.

### Result Format

    
    
        {
            "title":"title",
            "url":"original url",
            "pageUrl":"page url",
            "canonicalUrl":"canonical url",
            "description":"description",
            "images": ["array of images"],
            "image": "first image of images",
            "video":"true|false",
            "videoIframe":"video iframe, if it is a video"
        }
    
    

### Important

Make sure the library **php5-curl** is installed and enabled on the server, either locally or remotely.

### - Linux

    
    
        $ sudo apt-get install php5-curl
        $ sudo service apache2 restart
    
    

### - Mac (via macports)

    
    
        $ sudo port install php5-curl
        $ sudo apachectl restart