!function(global){function packIndex(pkgName){packages["@angular/"+pkgName]={main:"index.js",defaultExtension:"js"}}function packUmd(pkgName){packages["@angular/"+pkgName]={main:"/bundles/"+pkgName+".umd.js",defaultExtension:"js"}}var map={app:"dist/app","@angular":"dist/libs/@angular","angular2-in-memory-web-api":"dist/libs/angular2-in-memory-web-api",rxjs:"dist/libs/rxjs",moment:"dist/libs/moment","angular2-moment":"dist/libs/angular2-moment"},packages={app:{main:"main.js",defaultExtension:"js"},rxjs:{defaultExtension:"js"},"angular2-in-memory-web-api":{main:"index.js",defaultExtension:"js"},moment:{main:"moment.js",defaultExtension:"js"},"angular2-moment":{main:"index.js",defaultExtension:"js"}},ngPackageNames=["common","compiler","core","forms","http","platform-browser","platform-browser-dynamic","router","router-deprecated","upgrade"],setPackageConfig=System.packageWithIndex?packIndex:packUmd;ngPackageNames.forEach(setPackageConfig);var config={map:map,packages:packages};global.filterSystemConfig&&global.filterSystemConfig(config),System.config(config)}(this);