// node create-post.js -n name -l label -i -sc -st -su -gh
const fs = require("fs");

var name = "";
var label = "";
var hasImages = false;
var hasScripts = false;
var hasStylesheets = false;
var hasStoreUrl = false;
var hasGitHubUrl = false;

for (var i = 0; i < process.argv.length; i++) {

    var element = process.argv[i];

    if (element === "-n") { name = process.argv[++i].toLowerCase(); };
    if (element === "-l") { label = process.argv[++i].toLowerCase(); };
    if (element === "-i") { hasImages = true; };
    if (element === "-sc") { hasScripts = true; };
    if (element === "-st") { hasStylesheets = true; };
    if (element === "-su") { hasStoreUrl = true; };
    if (element === "-gh") { hasGitHubUrl = true; };

}

var skull = {
    "title": "",
    "content": "",
    "path": "",
    "image": "",
    "tag": "",
    "released": false,
    "date": new Date()
};
if(hasStoreUrl) skull["storeUrl"] = "";
if(hasGitHubUrl) skull["github"] = "";

// Make files
var dir = "./../" + label + "/" + name + "/";
fs.mkdirSync(dir);

fs.writeFileSync(dir + "content.json", JSON.stringify(skull));
fs.writeFileSync(dir + "CONTENT.md", "");

if(hasImages) { fs.mkdirSync(dir + "/images"); };
if(hasScripts) { fs.mkdirSync(dir + "/scripts"); };
if(hasStylesheets) { fs.mkdirSync(dir + "/stylesheets"); };

console.log("Done creating!");