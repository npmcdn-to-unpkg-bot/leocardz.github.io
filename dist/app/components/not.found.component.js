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
var NotFoundComponent = (function () {
    function NotFoundComponent(_metaService) {
        this._metaService = _metaService;
        _metaService.setData({});
    }
    NotFoundComponent.prototype.ngOnInit = function () { console.log("not.found"); };
    NotFoundComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'not-found',
            templateUrl: '/dist/app/views/not.found.component.html'
        }), 
        __metadata('design:paramtypes', [meta_service_1.MetaService])
    ], NotFoundComponent);
    return NotFoundComponent;
})();
exports.NotFoundComponent = NotFoundComponent;
//# sourceMappingURL=not.found.component.js.map