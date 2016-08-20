import { Injectable } from '@angular/core';
import { Post } from '../models/post';

declare function unescape(s: string): string;

@Injectable()
export class SearchService {

    constructor() { }

    extendedTrim(s: string) {

        return s.replace(/\s+/g, ' ').trim();

    }

    perform(data: Post[], needle: string, fields: string[], hightlight: boolean) {

        const pattern: RegExp = new RegExp('(' + needle.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") + ')', 'gmi');

        needle = this.extendedTrim(unescape(needle));

        var results: Post[] = [];

        for (var r = 0; r < data.length; r++) {

            var element: Post = data[r];
            var found: boolean = false;

            for (var i = 0; i < fields.length; i++) {

                if (Array === element[fields[i]].constructor) {

                    const tags = element[fields[i]];

                    for (var i = 0; i < tags.length; i++) {
                        if (tags[i].toLowerCase() === needle.toLowerCase()) {
                            found = true;
                            break;
                        }
                    }

                    if (found) break;

                } else {

                    if (needle === "*" || element[fields[i]].indexOf(needle) !== -1 || pattern.test(element[fields[i]])) {
                        found = true;
                        break;
                    }

                }

            }

            if (found) {

                var result: Post = Object.assign({}, element);

                if (hightlight) { result = this.hightlight(result, pattern, needle); }

                results.push(result);

            }

        };

        return results.sort(this.compare);

    }

    hightlight(result: Post, pattern: RegExp, needle: string): Post {

        const replace = "\*\*$1\*\*";

        result.title = result.title.replace(pattern, replace);
        result.content = result.content.replace(pattern, replace);

        const offset = 200;

        const contentReplic = result.content.toLowerCase();
        const boldNeedle = "**" + needle.toLowerCase() + "**";
        const boldNeedleIndex = needle === "*" ? 0 : contentReplic.indexOf(boldNeedle);

        const shortContent = this.shortify(result.content, boldNeedleIndex, boldNeedle)

        result.content = "..." + shortContent + "...";

        return result;

    }

    shortify(s: string, startIndex: number = 0, boldNeedle: string = "", offset: number = 200): string {

        const start = startIndex < offset ? 0 : startIndex - offset;
        const needleEnd = startIndex + boldNeedle.length;
        const end = needleEnd > s.length - (offset + 1) ? s.length : (needleEnd + offset);

        const shortContent = s.substring(start, end);

        const firstSpaceIndex = shortContent.indexOf(" ") + 1;
        const lastSpaceIndex = shortContent.lastIndexOf(" ");

        return shortContent.substring(firstSpaceIndex, lastSpaceIndex);

    }

    compare(a: Post, b: Post): number {

        return (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0);

    }

}