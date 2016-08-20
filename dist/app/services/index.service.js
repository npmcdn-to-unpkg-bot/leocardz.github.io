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
var search_service_1 = require('./search.service');
var Rx_1 = require('rxjs/Rx');
var IndexService = (function () {
    function IndexService(_http, _searchService) {
        var _this = this;
        this._http = _http;
        this._searchService = _searchService;
        this.fullData = [];
        this.after = function () { };
        this._http.get('indexes/full.json')
            .map(function (res) { return res.json(); })
            .subscribe(function (res) {
            _this.fullData = res;
            _this.after();
        });
    }
    IndexService.prototype.select = function (callback, needle, fields, hightlight) {
        if (needle === void 0) { needle = ""; }
        if (hightlight === void 0) { hightlight = true; }
        if (needle === "") {
            callback([]);
        }
        else if (needle === "home") {
            callback(this.fullData);
        }
        else {
            callback(this._searchService.perform(this.fullData, needle, fields, hightlight));
        }
    };
    IndexService.prototype.search = function (callback, needle) {
        if (needle === void 0) { needle = ""; }
        this.select(callback, needle, ["title", "content"]);
    };
    IndexService.prototype.filter = function (callback, label) {
        if (label === void 0) { label = ""; }
        this.select(callback, label, ["label"], false);
    };
    IndexService.prototype.tag = function (callback, tag) {
        this.select(callback, tag, ["tags"], false);
    };
    IndexService.prototype.activities = function (callback) {
        this._http.get('indexes/activities.json')
            .map(function (res) { return res.json(); })
            .subscribe(callback);
    };
    IndexService.prototype.getPost = function (section, path) {
        return Rx_1.Observable.forkJoin(this._http.get(section + '/' + path + "/content.json").map(function (res) { return res.json(); }), this._http.get(section + '/' + path + "/CONTENT.md"));
    };
    IndexService.prototype.fetch = function () {
        return this._http.get('indexes/full.json');
    };
    IndexService.prototype.filterObs = function (fullData, needle, fields, hightlight) {
        if (needle === void 0) { needle = ""; }
        if (hightlight === void 0) { hightlight = true; }
        if (needle === "") {
            return [];
        }
        else if (needle === "home") {
            return fullData;
        }
        else {
            return this._searchService.perform(fullData, needle, fields, hightlight);
        }
    };
    IndexService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, search_service_1.SearchService])
    ], IndexService);
    return IndexService;
})();
exports.IndexService = IndexService;
//# sourceMappingURL=index.service.js.map