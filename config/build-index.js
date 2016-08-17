// node build-index.js
const fs = require("fs");
const extend = require("util")._extend;
const only = require("only");

// Build indexes
var searchIndexes = [];
var indexes = {
    "android": [],
    "blog": [],
    "ios": [],
    "lab": []
};

for (var key in indexes) {

    var path = "./../" + key + "/";
    var folders = fs.readdirSync(path);

    for (var j = 0; j < folders.length; j++) {

        var folder = folders[j];

        var folderPath = path + folders[j];

        if (fs.lstatSync(folderPath).isDirectory() && folder !== ".git") {

            var content = require(folderPath + "/content.json");

            if (content.released) {

                // For contextual indexing
                var contextualContent = only(content, ["title", "image", "tags", "content", "date", "path"]);
                indexes[key].push(contextualContent);

                // For search indexing
                var searchContent = extend({}, contextualContent);
                searchContent.label = key;
                searchIndexes.push(searchContent);

            }

        }

    }

}

// Save search.json
const prefix = "./../indexes/";
const suffix = ".json";
const fullFile = "full.json";
const fullData = JSON.stringify(searchIndexes);

if (!fs.existsSync(prefix)) fs.mkdirSync(prefix);
fs.writeFileSync(prefix + fullFile, fullData);

for (var key in indexes) {

    fs.writeFileSync(prefix + key + suffix, JSON.stringify(indexes[key]));

}

console.log("Done indexing!");