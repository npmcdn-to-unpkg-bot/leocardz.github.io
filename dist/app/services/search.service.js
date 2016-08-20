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
var SearchService = (function () {
    function SearchService() {
    }
    SearchService.prototype.extendedTrim = function (s) {
        return s.replace(/\s+/g, ' ').trim();
    };
    SearchService.prototype.perform = function (data, needle, fields, hightlight) {
        var pattern = new RegExp('(' + needle.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + ')', 'gmi');
        needle = this.extendedTrim(unescape(needle));
        var results = [];
        for (var r = 0; r < data.length; r++) {
            var element = data[r];
            var found = false;
            for (var i = 0; i < fields.length; i++) {
                if (Array === element[fields[i]].constructor) {
                    var tags = element[fields[i]];
                    for (var i = 0; i < tags.length; i++) {
                        if (tags[i].toLowerCase() === needle.toLowerCase()) {
                            found = true;
                            break;
                        }
                    }
                    if (found)
                        break;
                }
                else {
                    if (needle === "*" || element[fields[i]].indexOf(needle) !== -1 || pattern.test(element[fields[i]])) {
                        found = true;
                        break;
                    }
                }
            }
            if (found) {
                var result = Object.assign({}, element);
                if (hightlight) {
                    result = this.hightlight(result, pattern, needle);
                }
                results.push(result);
            }
        }
        ;
        return results.sort(this.compare);
    };
    SearchService.prototype.hightlight = function (result, pattern, needle) {
        var replace = "\*\*$1\*\*";
        result.title = result.title.replace(pattern, replace);
        result.content = result.content.replace(pattern, replace);
        var offset = 200;
        var contentReplic = result.content.toLowerCase();
        var boldNeedle = "**" + needle.toLowerCase() + "**";
        var boldNeedleIndex = needle === "*" ? 0 : contentReplic.indexOf(boldNeedle);
        var start = boldNeedleIndex < offset ? 0 : boldNeedleIndex - offset;
        var needleEnd = boldNeedleIndex + boldNeedle.length;
        var end = needleEnd > result.content.length - (offset + 1) ? result.content.length : (needleEnd + offset);
        var shortContent = result.content.substring(start, end);
        var firstSpaceIndex = shortContent.indexOf(" ") + 1;
        var lastSpaceIndex = shortContent.lastIndexOf(" ");
        result.content = "..." + shortContent.substring(firstSpaceIndex, lastSpaceIndex) + "...";
        return result;
    };
    SearchService.prototype.compare = function (a, b) {
        return (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0);
    };
    SearchService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SearchService);
    return SearchService;
})();
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map