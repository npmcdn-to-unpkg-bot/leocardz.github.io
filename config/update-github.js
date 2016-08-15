// node update-github.js "key"
const fs = require("fs");
const request = require('request');
const extend = require("util")._extend;
const only = require("only");

const prefix = "./../indexes/";

if (!fs.existsSync(prefix)) fs.mkdirSync(prefix);

if (process.argv.length < 3) {

    console.error("Missing key");

} else {

    const key = process.argv[2];

    const requestObject = { har: { url: '', method: 'get', headers: [{ name: 'User-Agent', value: 'Google' }] } };

    console.log("Start profile");
    requestObject.har.url = 'https://api.github.com/users/LeonardoCardoso?access_token=' + key;
    request(requestObject, function (error, response, body) {
        console.log("End profile");

        const profile = only(JSON.parse(body), ["public_repos"]);
        fs.writeFileSync(prefix + "profile.json", JSON.stringify(profile));

        console.log("Start events");
        requestObject.har.url = 'https://api.github.com/users/leonardocardoso/events?access_token=' + key;
        request(requestObject, function (error, response, body) {
            console.log("End events");

            var activities = JSON.parse(body);
            for (var i = 0; i < activities.length; i++) {
                activities[i] = only(activities[i], ["type", "repo", "created_at", "payload"]);
                activities[i].repo = only(activities[i].repo, ["name"]);
                activities[i].payload = only(activities[i].payload, ["action", "ref", "ref_type", "scope", "release"]);
                if (undefined !== activities[i].payload.release) activities[i].payload.release = only(activities[i].payload.release, ["tag_name"]);
            }
            fs.writeFileSync(prefix + "activities.json", JSON.stringify(activities));

            recursiveRepo([], 1);

        });

    });

    function recursiveRepo(repos, page) {

        console.log("Start repos: length " + repos.length + " page " + page);
        requestObject.har.url = 'https://api.github.com/users/LeonardoCardoso/repos?per_page=100&access_token=' + key + '&page=' + page;
        request(requestObject, function (error, response, body) {

            const r = JSON.parse(response.body);
            console.log("End repos: length " + r.length + " page " + page);

            if (r.length === 0) {
                fs.writeFileSync(prefix + "repos.json", JSON.stringify(repos));
                console.log("Done updating!");
            } else {
                for (var i = 0; i < r.length; i++) { r[i] = only(r[i], ["name", "full_name", "fork", "stargazers_count", "watchers_count", "language", "updated_at"]); }
                recursiveRepo(repos.concat(r), ++page);
            }

        });

    }

}