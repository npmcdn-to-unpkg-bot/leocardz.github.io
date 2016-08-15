var router_1 = require('@angular/router');
var home_component_1 = require('./components/home.component');
var android_component_1 = require('./components/android.component');
var blog_component_1 = require('./components/blog.component');
var ios_component_1 = require('./components/ios.component');
var lab_component_1 = require('./components/lab.component');
var about_component_1 = require('./components/about.component');
var open_source_component_1 = require('./components/open.source.component');
var privacy_component_1 = require('./components/privacy.component');
var tag_component_1 = require('./components/tag.component');
var not_found_component_1 = require('./components/not.found.component');
function getProperRoutes() {
    return [
        { path: '', component: home_component_1.HomeComponent },
        { path: 'android', component: android_component_1.AndroidComponent },
        { path: 'android/:post', component: android_component_1.AndroidComponent },
        { path: 'blog', component: blog_component_1.BlogComponent },
        { path: 'blog/:post', component: blog_component_1.BlogComponent },
        { path: 'ios', component: ios_component_1.IOSComponent },
        { path: 'ios/:post', component: ios_component_1.IOSComponent },
        { path: 'lab', component: lab_component_1.LabComponent },
        { path: 'lab/:post', component: lab_component_1.LabComponent },
        { path: 'about', component: about_component_1.AboutComponent },
        { path: 'open-source', component: open_source_component_1.OpenSourceComponent },
        { path: 'privacy', component: privacy_component_1.PrivacyComponent },
        { path: 'tag/:tag', component: tag_component_1.TagComponent },
        { path: '**', component: not_found_component_1.NotFoundComponent }
    ];
}
exports.APP_ROUTE_PROVIDERS = [
    router_1.provideRouter(getProperRoutes())
];
//# sourceMappingURL=app.routes.js.map