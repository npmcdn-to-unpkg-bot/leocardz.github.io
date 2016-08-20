var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var router_1 = require('@angular/router');
var core_1 = require('@angular/core');
var http_1 = require('@angular/http');
var index_service_1 = require('../services/index.service');
var meta_service_1 = require('../services/meta.service');
var AndroidComponent = (function () {
    function AndroidComponent(_metaService, _router, _route, _indexService) {
        this._metaService = _metaService;
        this._router = _router;
        this._route = _route;
        this._indexService = _indexService;
        this.params = {};
        this.title = "Android";
        this.label = "android";
        this.params = this._route.snapshot.params;
    }
    AndroidComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (undefined !== this.params["post"]) {
            this._indexService.getPost(this.label, this.params["post"])
                .subscribe(function (data) {
                var res = data[0];
                var markdown = data[1];
                console.log(res);
                console.log(markdown._body);
                _this._metaService.setData({
                    title: res.title,
                    description: res.content,
                    image: "/" + _this.label + "/" + res.path + "/" + res.image,
                    url: "/" + _this.label + "/" + res.path
                });
            }, function (error) { return _this._router.navigate(['/not-found']); });
        }
        else {
            this._metaService.setData({ title: this.title, url: "/" + this.label });
            this._indexService.fetch()
                .map(function (res) { return res.json(); })
                .subscribe(function (res) {
                console.log(_this._indexService.search(res, _this.label, ["label"], false));
            });
        }
    };
    AndroidComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'android',
            templateUrl: '/dist/app/views/android.component.html',
            providers: [index_service_1.IndexService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [meta_service_1.MetaService, router_1.Router, router_1.ActivatedRoute, index_service_1.IndexService])
    ], AndroidComponent);
    return AndroidComponent;
})();
exports.AndroidComponent = AndroidComponent;
//# sourceMappingURL=android.component.js.map