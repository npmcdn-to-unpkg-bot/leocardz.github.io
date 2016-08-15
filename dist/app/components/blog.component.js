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
var index_service_1 = require('../services/index.service');
var meta_service_1 = require('../services/meta.service');
var BlogComponent = (function () {
    function BlogComponent(_metaService, _router, _route, _indexService) {
        var _this = this;
        this._metaService = _metaService;
        this._router = _router;
        this._route = _route;
        this._indexService = _indexService;
        var params = this._route.snapshot.params;
        if (undefined !== params["post"]) {
            _indexService.getPost("blog", params["post"])
                .subscribe(function (data) {
                var res = data[0];
                var markdown = data[1];
                console.log(res);
                console.log(markdown._body);
                _metaService.setData({
                    title: res.title,
                    description: res.content,
                    image: "/blog/" + res.path + "/" + res.image,
                    url: "/blog/" + res.path
                });
            }, function (error) { return _this._router.navigate(['/not-found']); });
        }
        else {
            _metaService.setData({ title: "Blog", url: "/blog" });
            _indexService.after = function () {
                _indexService.filter(function (res) { console.log(res.length); }, "blog");
            };
        }
    }
    BlogComponent.prototype.ngOnInit = function () { };
    BlogComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'blog',
            templateUrl: 'dist/app/views/blog.component.html',
            providers: [index_service_1.IndexService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [meta_service_1.MetaService, router_1.Router, router_1.ActivatedRoute, index_service_1.IndexService])
    ], BlogComponent);
    return BlogComponent;
})();
exports.BlogComponent = BlogComponent;
//# sourceMappingURL=blog.component.js.map