var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var platform_browser_2 = require("@angular/platform-browser");
var MetaService = (function () {
    function MetaService(_title, doc) {
        this._title = _title;
        this.base = "http://leocardz.com";
        this.staticMetas = {
            title: "leocardz.com",
            description: "This is the place where we talk about programming. Come along!",
            keywords: "programming,ios,swift,android,mobile,development,dev",
            image: this.base + "/dist/assets/images/default-512.png",
            url: this.base
        };
        this.DOM = doc;
        this.headElement = doc.querySelector('head');
    }
    MetaService.prototype.setData = function (object) {
        var metas = Object.assign({}, this.staticMetas);
        if (undefined !== object["title"]) {
            metas.title = object["title"] + " • leocardz.com";
        }
        if (undefined !== object["description"]) {
            metas.description = this.sliceDescription(object["description"]);
        }
        if (undefined !== object["keywords"]) {
            metas.keywords = object["keywords"];
        }
        if (undefined !== object["image"]) {
            metas.image = this.base + "/images" + object["image"];
        }
        if (undefined !== object["url"]) {
            metas.url = metas.url + object["url"];
        }
        this._title.setTitle(metas.title);
        this.setMetaElement("author", "Leonardo Cardoso");
        this.setMetaElement("description", metas.description);
        this.setMetaElement("keywords", metas.keywords);
        this.setMetaElement("twitter:card", "summary_large_image");
        this.setMetaElement("twitter:creator", "@leocardz");
        this.setMetaElement("twitter:site", metas.url);
        this.setMetaElement("twitter:title", metas.title);
        this.setMetaElement("twitter:description", metas.description);
        this.setMetaElement("twitter:image:src", metas.image);
        this.setMetaElement("fb:admins", "182900240026");
        this.setMetaElement("og:type", "website");
        this.setMetaElement("og:site_name", "leocardz.com");
        this.setMetaElement("og:title", metas.title);
        this.setMetaElement("og:description", metas.description);
        this.setMetaElement("og:image", metas.image);
    };
    MetaService.prototype.sliceDescription = function (string) {
        var lastSpaceIndex = string.slice(0, 250).lastIndexOf(" ");
        return string.substring(0, lastSpaceIndex) + "...";
    };
    MetaService.prototype.setMetaElement = function (name, content) {
        var el;
        el = this.DOM.querySelector('meta[name="' + name + '"]');
        if (el === null) {
            el = this.DOM.createElement('meta');
            el.setAttribute('name', name);
            el.setAttribute('content', content);
            this.headElement.appendChild(el);
        }
        else {
            el.setAttribute('content', content);
        }
    };
    MetaService = __decorate([
        core_1.Injectable(),
        __param(1, core_1.Inject(platform_browser_2.DOCUMENT)), 
        __metadata('design:paramtypes', [platform_browser_1.Title, Object])
    ], MetaService);
    return MetaService;
})();
exports.MetaService = MetaService;
//# sourceMappingURL=meta.service.js.map