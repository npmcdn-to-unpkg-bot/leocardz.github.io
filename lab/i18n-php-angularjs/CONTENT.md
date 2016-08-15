Basically, we use a cookie to set the current language, php classes to store the words for each language, and ajax
calls to update the language.

![](https://raw.githubusercontent.com/LeonardoCardoso/i18n-PHP-Angularjs/master/assets/gif.gif)

See how it works below...

### I18n.class.php

This class is the base php class. It has all the base stuff like empty arrays and the base functions. The "setUp()"
function, populates the main array "var &dollar;i18n = \[\];" with all the other ones in the class. The main function
"getLang(&dollar;langRequests = \[\])" will return the dictionary choosen by the user that was picked from the "&dollar;i18n" array.

    
    
        <?php
    
        class I18n
        {
        var &dollar;login = [];
    
        var &dollar;notFound = [];
    
        var &dollar;error = [];
    
        var &dollar;success = [];
    
        var &dollar;i18n = [];
    
        function setUp()
        {
        &dollar;this->i18n = [
        "login" => &dollar;this->login,
        "notFound" => &dollar;this->notFound,
        "error" => &dollar;this->error,
        "success" => &dollar;this->success,
        ];
        }
    
        function getLang(&dollar;langRequests = [])
        {
        &dollar;this->setUp();
        &dollar;result = [];
    
        foreach (&dollar;langRequests as &dollar;request) {
        &dollar;selection = &dollar;this->i18n[&dollar;request];
        &dollar;result = array_merge(&dollar;result, &dollar;selection);
        }
    
        return &dollar;result;
    
        }
    
        }
        ?>
    
    

### ptBr.class.php

This "Language" class extends the "I18n" class, with the custom messages in Portuguese.

    
    
        <?php
    
        include_once "I18n.class.php";
    
        class Language extends I18n
        {
    
        function __construct()
        {
    
        &dollar;this->login = [
        "login" => "Fazer login",
        // ...
        ];
    
        &dollar;this->notFound = [
        "not_found_title" => "Página não encontrada",
        // ...
        ];
    
        &dollar;this->error = [
        "error_default_error" => "Algo inesperado ocorreu, tente novamente em instantes.",
        // ...
        ];
    
        &dollar;this->success = [
        "login_success" => "Login realizado com successo",
        // ...
        ];
    
        }
    
        }
    
        ?>
    
    

### enUs.class.php

This "Language" class extends the "I18n" class, with the custom messages in English. If you noticed, both
"ptBr.class.php" and "enUs.class.php" files contain the same class called Language. This is so for keeping a generic
way to get the dictionaries in the selected file. That class will be loaded in the next file "lang.php".

    
    
        <?php
    
        include_once "I18n.class.php";
    
        class Language extends I18n
        {
    
        function __construct()
        {
    
        &dollar;this->login = [
        "login" => "Login",
        ];
    
        &dollar;this->notFound = [
        "not_found_title" => "Page not found",
        ];
    
        &dollar;this->error = [
        "error_default_error" => "Something unusual has happened, try again later.",
        ];
    
        &dollar;this->success = [
        "login_success" => "Successfully logged in",
        ];
    
        }
    
        }
        ?>
    
    

### lang.php

This file returns the dictionary on the file loaded by the cookie in JSON format.

    
    
        <?php
    
        &dollar;file = (isset(&dollar;_COOKIE['i18n']) ? &dollar;_COOKIE['i18n'] : "ptBr") . ".class.php";
        &dollar;file = file_exists(&dollar;file) ? &dollar;file : "ptBr.class.php";
        include_once &dollar;file;
        &dollar;language = new Language();
        echo json_encode(&dollar;language->getLang(&dollar;_POST["langRequests"]));
    
        ?>
    
    

changeLanguage.php

This file only sets the new language cookie.

    
    
        <?php
    
        &dollar;time = time() + (86400 * 30 * 365); // one year
        setcookie("i18n", &dollar;_POST["lang"], &dollar;time, "/");
    
        ?>
    
    

### app.js

This file is the your Angular App file.

    
    
        var MyApp = angular&period;module('MyApp', []);
    
    

### lang.js

This file contains a service that will check the JSON returned by the "lang.php" file and will change the {{(.\*)}}
key with its correspondent value.

    
    
        MyApp
        &period;service('langService', function() {
    
            var dictionary;
            var langService = {};
    
            langService.i18n = function (&dollar;scope, &dollar;http, &dollar;langRequests) {
    
            &dollar;http.post('php/lang.php', {
                langRequests: &dollar;langRequests
            }).then(function (resp) {
    
                dictionary = resp.data;
    
                for (var k in dictionary){
                    if (dictionary.hasOwnProperty(k)) {
                        &dollar;scope[k] = dictionary[k];
                        //console.log(k + " -> " + dictionary[k]);
                    }
                }
    
            }, function (err) {
                    console.error('ERR', err);
                })
            };
    
            return langService;
    
        });
    
    

### myController.js

This file is your Angular Controller. You can do your stuff here, but the first action must be the language
configurations. So you can say which arrays you want to be loaded in the current page.

    
    
        MyApp
        &period;controller('myController', ['&dollar;scope', '&dollar;http', 'langService',
                function(&dollar;scope, &dollar;http, langService) {
    
                    // select which messages group you want
                    var &dollar;langRequests = ["login", "notFound", "error", "success"];
                    langService.i18n(&dollar;scope, &dollar;http, &dollar;langRequests);
    
    
                    &dollar;scope.languageSelect = function(lang) {
                         &dollar;http.post('php/changeLanguage.php', {
                            lang: lang
                        }).then(function() {
                            window.location = window.location;
                        })
                        }
                    }
    
        ]);
    
    

**Obs 1:**

The order of the files must be the following:

    
    
        <script src="https://dl.dropboxusercontent.com/s/js/angularjs/angular.min.js"></script>
        <script src="https://dl.dropboxusercontent.com/s/js/app.js"></script>
        <script src="https://dl.dropboxusercontent.com/s/js/lang.js"></script>
        <script src="https://dl.dropboxusercontent.com/s/js/myController.js"></script>
    
    

**Obs 2:**

The arrays you request in the myController.js variable " var &dollar;langRequests = \[\];" must be the same name as the i18n
and its extended classes, like "login".