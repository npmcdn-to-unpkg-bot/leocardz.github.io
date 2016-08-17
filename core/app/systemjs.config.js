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
        "ng2-pagination": "dist/libs/ng2-pagination",
        "marked": "dist/libs/marked/lib"
    };
    // packages tells the System loader how to load when no filename and/or no extension
    var packages = {
        "app": { main: "main", defaultExtension: "js" },
        "rxjs": { defaultExtension: "js" },
        "angular2-in-memory-web-api": { main: "index", defaultExtension: "js" },
        "moment": { main: "moment", defaultExtension: "js" },
        "angular2-moment": { main: "index", defaultExtension: "js" },
        "ng2-pagination": { main: "index", defaultExtension: "js" },
        "marked": { main: "marked", format: 'global', defaultExtension: "js" }
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