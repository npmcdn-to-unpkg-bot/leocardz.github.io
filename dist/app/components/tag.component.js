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
var TagComponent = (function () {
    function TagComponent(_route, _indexService, _metaService) {
        this._route = _route;
        this._indexService = _indexService;
        this._metaService = _metaService;
        var tag = this._route.snapshot.params["tag"];
        _metaService.setData({ title: tag, url: "/tag/" + tag });
        _indexService.after = function () {
            _indexService.tag(function (res) { console.log(res); }, tag);
        };
    }
    TagComponent.prototype.ngOnInit = function () { };
    TagComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tab',
            templateUrl: 'dist/app/views/tag.component.html',
            providers: [index_service_1.IndexService, http_1.HTTP_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, index_service_1.IndexService, meta_service_1.MetaService])
    ], TagComponent);
    return TagComponent;
})();
exports.TagComponent = TagComponent;
//# sourceMappingURL=tag.component.js.map