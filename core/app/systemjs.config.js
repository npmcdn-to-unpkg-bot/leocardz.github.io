/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    // map tells the System loader where to look for things
    var map = {
        "app": "dist/app", // "dist",
        "@angular": "dist/libs/@angular",
        "angular2-in-memory-web-api": "dist/libs/angular2-in-memory-web-api",
        "rxjs": "dist/libs/rxjs",
        "moment": "dist/libs/moment",
        "angular2-moment": "dist/libs/angular2-moment",
        "antimoderate": "dist/libs/antimoderate"
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        "app": { main: "main.js", defaultExtension: "js" },
        "rxjs": { defaultExtension: "js" },
        "angular2-in-memory-web-api": { main: "index.js", defaultExtension: "js" },
        "moment": { main: "moment.js", defaultExtension: "js" },
        "angular2-moment": { main: "index.js", defaultExtension: "js" },
        "antimoderate": { main: "antimoderate.js", defaultExtension: "js" }
    };
    var ngPackageNames = [
        "common",
        "compiler",
        "core",
        "forms",
        "http",
        "platform-browser",
        "platform-browser-dynamic",
        "router",
        "router-deprecated",
        "upgrade",
    ];
    // Individual files (~300 requests):
    function packIndex(pkgName) {
        packages["@angular/" + pkgName] = { main: "index.js", defaultExtension: "js" };
    }
    // Bundled (~40 requests):
    function packUmd(pkgName) {
        packages["@angular/" + pkgName] = { main: "/bundles/" + pkgName + ".umd.js", defaultExtension: "js" };
    }
    // Most environments should use UMD; some (Karma) need the individual index files
    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    // Add package entries for angular packages
    ngPackageNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages
    };
    
    if (global.filterSystemConfig) { global.filterSystemConfig(config); }

    System.config(config);
})(this);