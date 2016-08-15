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

        const pattern: RegExp = new RegExp('(' + needle + ')', 'gmi');

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

                    if (element[fields[i]].indexOf(needle) !== -1 || pattern.test(element[fields[i]])) {
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

        const boldNeedle = "**" + needle + "**";
        const boldNeedleIndex = result.content.indexOf(boldNeedle);

        const start = boldNeedleIndex < offset ? 0 : boldNeedleIndex - offset;
        const needleEnd = boldNeedleIndex + boldNeedle.length;
        const end = needleEnd > result.content.length - (offset + 1) ? result.content.length : (needleEnd + offset);

        const shortContent = result.content.substring(start, end);

        const firstSpaceIndex = shortContent.indexOf(" ");
        const lastSpaceIndex = shortContent.lastIndexOf(" ");

        result.content = "..." + shortContent.substring(firstSpaceIndex, lastSpaceIndex) + "...";

        return result;

    }

    compare(a: Post, b: Post): number {

        return (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0);

    }

}