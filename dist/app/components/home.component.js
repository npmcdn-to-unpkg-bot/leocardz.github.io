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
var http_1 = require('@angular/http');
var index_service_1 = require('../services/index.service');
var meta_service_1 = require('../services/meta.service');
var HomeComponent = (function () {
    function HomeComponent(_metaService, _indexService) {
        var _this = this;
        this._metaService = _metaService;
        this._indexService = _indexService;
        _metaService.setData({});
        this._indexService.fetch()
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            console.log(_this._indexService.search(res, "home", ["label"]));
        });
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'home',
            templateUrl: '/dist/app/views/home.component.html',
            providers: [index_service_1.IndexService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [meta_service_1.MetaService, index_service_1.IndexService])
    ], HomeComponent);
    return HomeComponent;
})();
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map