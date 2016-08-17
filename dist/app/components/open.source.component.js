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
var github_service_1 = require('../services/github.service');
var meta_service_1 = require('../services/meta.service');
var OpenSourceComponent = (function () {
    function OpenSourceComponent(_githubService, _metaService) {
        this._githubService = _githubService;
        this._metaService = _metaService;
        this.repos = [];
        _metaService.setData({ title: "Open Source", url: "/open-source" });
    }
    OpenSourceComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._githubService.getOpenSource(function (res) { _this.repos = res; });
    };
    OpenSourceComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'open-source',
            templateUrl: 'dist/app/views/open.source.component.html',
            providers: [
                github_service_1.GitHubService,
                http_1.HTTP_PROVIDERS
            ],
        }), 
        __metadata('design:paramtypes', [github_service_1.GitHubService, meta_service_1.MetaService])
    ], OpenSourceComponent);
    return OpenSourceComponent;
})();
exports.OpenSourceComponent = OpenSourceComponent;
//# sourceMappingURL=open.source.component.js.map