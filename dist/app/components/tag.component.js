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
var angular2_moment_1 = require('angular2-moment');
var index_service_1 = require('../services/index.service');
var meta_service_1 = require('../services/meta.service');
var label_service_1 = require('../services/label.service');
var TagComponent = (function () {
    function TagComponent(_router, _route, _indexService, _metaService, _labelService) {
        this._router = _router;
        this._route = _route;
        this._indexService = _indexService;
        this._metaService = _metaService;
        this._labelService = _labelService;
        this.posts = [];
        this.tag = "";
        this.tag = this._route.snapshot.params["tag"];
        _metaService.setData({ title: this.tag, url: "/tag/" + this.tag });
    }
    TagComponent.prototype.actionNavigate = function (post) {
        this._router.navigate(['/' + post.label + "/" + post.path]);
    };
    TagComponent.prototype.labelnize = function (label, uppercase) {
        console.log(label);
        return this._labelService.labelnize(label, uppercase);
    };
    TagComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._indexService.fetch()
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.posts = _this._indexService.filterObs(res, _this.tag, ["tags"], false);
        });
    };
    TagComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'tab',
            templateUrl: '/dist/app/views/tag.component.html',
            directives: [
                router_1.ROUTER_DIRECTIVES
            ],
            providers: [
                index_service_1.IndexService,
                http_1.HTTP_PROVIDERS
            ],
            pipes: [
                angular2_moment_1.TimeAgoPipe
            ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.ActivatedRoute, index_service_1.IndexService, meta_service_1.MetaService, label_service_1.LabelService])
    ], TagComponent);
    return TagComponent;
})();
exports.TagComponent = TagComponent;
//# sourceMappingURL=tag.component.js.map