// node parse-post.js -n name -l label
const fs = require('fs');
const markdown = require('markdown').markdown;
const htmlMd = require('html-md');
const stripTags = require('htmlstrip-native');

var stripTagsOptions = {
    include_script: false,
    include_style: false,
    compact_whitespace: true,
    include_attributes: { 'alt': true }
};

var name = process.argv[3];
var label = process.argv[5];
var dir = "./../" + label + "/" + name + "/";

// Get CONTENT.md content 
var markdownContentPath = dir + "CONTENT.md";
var markdownContent = String(fs.readFileSync(markdownContentPath));

// Convert CONTENT.md content to HTML
var htmlContent = markdown.toHTML(markdownContent);

// Strip tags from HTML
var stripTagsContent = stripTags.html_strip(htmlContent, stripTagsOptions).trim();

// Update content.json
var contentPath = dir + "content.json";
var content = require(contentPath);
content.content = stripTagsContent;

fs.writeFileSync(contentPath, JSON.stringify(content));

// Update CONTENT.md
fs.writeFileSync(markdownContentPath, htmlMd(htmlContent));

console.log("Done parsing!");
