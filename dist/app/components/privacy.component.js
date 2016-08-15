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
var meta_service_1 = require('../services/meta.service');
var PrivacyComponent = (function () {
    function PrivacyComponent(_metaService) {
        this._metaService = _metaService;
        _metaService.setData({ title: "Privacy", url: "/privacy" });
    }
    PrivacyComponent.prototype.ngOnInit = function () {
    };
    PrivacyComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'privay',
            templateUrl: 'dist/app/views/privacy.component.html'
        }), 
        __metadata('design:paramtypes', [meta_service_1.MetaService])
    ], PrivacyComponent);
    return PrivacyComponent;
})();
exports.PrivacyComponent = PrivacyComponent;
//# sourceMappingURL=privacy.component.js.map