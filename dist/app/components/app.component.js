var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var platform_browser_1 = require('@angular/platform-browser');
require('marked');
var angular2_moment_1 = require('angular2-moment');
var ng2_pagination_1 = require('ng2-pagination');
var home_component_1 = require('./home.component');
var android_component_1 = require('./android.component');
var blog_component_1 = require('./blog.component');
var ios_component_1 = require('./ios.component');
var lab_component_1 = require('./lab.component');
var about_component_1 = require('./about.component');
var open_source_component_1 = require('./open.source.component');
var privacy_component_1 = require('./privacy.component');
var tag_component_1 = require('./tag.component');
var not_found_component_1 = require('./not.found.component');
var index_service_1 = require('../services/index.service');
var search_service_1 = require('../services/search.service');
var meta_service_1 = require('../services/meta.service');
var label_service_1 = require('../services/label.service');
var AppComponent = (function () {
    function AppComponent(_router, _indexService, _metaService, _labelService) {
        var _this = this;
        this._router = _router;
        this._indexService = _indexService;
        this._metaService = _metaService;
        this._labelService = _labelService;
        this.isLoading = true;
        this.posts = [];
        this.activities = [];
        _indexService.activities(function (res) { return _this.activities = res; });
        _router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationStart) {
                _this.posts = [];
                _this.isLoading = true;
            }
            else if (event instanceof router_1.NavigationEnd)
                _this.isLoading = false;
        });
    }
    AppComponent.prototype.ngOnInit = function () { };
    AppComponent.prototype.actionSearch = function (s) {
        var _this = this;
        this._indexService.search(function (res) {
            _this.posts = res;
        }, s);
    };
    AppComponent.prototype.actionNavigate = function (post) {
        this._router.navigate(['/' + post.label + "/" + post.path]);
    };
    AppComponent.prototype.getLinkStyle = function (path) {
        return (path === "/" && window.location.pathname === path) || (path !== "/" && window.location.pathname.indexOf(path) === 0);
    };
    AppComponent.prototype.labelnize = function (label, uppercase) {
        return this._labelService.labelnize(label, uppercase);
    };
    AppComponent.prototype.markdown = function (s) {
        s = s.replace(/\*\*\*\*/g, "");
        var md = marked(s);
        return md.substring(3, md.length - 5) + " ";
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app',
            templateUrl: 'dist/app/views/app.component.html',
            directives: [
                router_1.ROUTER_DIRECTIVES,
                ng2_pagination_1.PaginationControlsCmp
            ],
            pipes: [
                angular2_moment_1.TimeAgoPipe,
                ng2_pagination_1.PaginatePipe
            ],
            providers: [
                index_service_1.IndexService,
                search_service_1.SearchService,
                meta_service_1.MetaService,
                label_service_1.LabelService,
                platform_browser_1.Title,
                http_1.HTTP_PROVIDERS,
                ng2_pagination_1.PaginationService
            ],
            precompile: [
                home_component_1.HomeComponent,
                android_component_1.AndroidComponent,
                blog_component_1.BlogComponent,
                ios_component_1.IOSComponent,
                lab_component_1.LabComponent,
                about_component_1.AboutComponent,
                open_source_component_1.OpenSourceComponent,
                privacy_component_1.PrivacyComponent,
                tag_component_1.TagComponent,
                not_found_component_1.NotFoundComponent
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, index_service_1.IndexService, meta_service_1.MetaService, label_service_1.LabelService])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map