var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var app_routes_1 = require('./app.routes');
var app_component_1 = require('./components/app.component');
core_1.enableProdMode();
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    app_routes_1.APP_ROUTE_PROVIDERS,
    core_1.provide(common_1.APP_BASE_HREF, { useValue: '/' })
])
    .then(function (success) { })
    .catch(function (error) { return console.log(error); });
//# sourceMappingURL=main.js.map