import { Inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from "@angular/platform-browser";

@Injectable()
export class MetaService {

    DOM: any;
    headElement: HTMLElement;

    base: string = "http://leocardz.com";

    staticMetas: Object = {
        title: "leocardz.com",
        description: "This is the place where we talk about programming. Come along!",
        keywords: "programming,ios,swift,android,mobile,development,dev",
        image: this.base + "/dist/assets/images/default-512.png",
        url: this.base
    };

    constructor(private _title: Title, @Inject(DOCUMENT) doc: any) {

        this.DOM = doc;
        this.headElement = doc.querySelector('head');

    }

    setData(object: Object) {

        var metas = Object.assign({}, this.staticMetas);
        if (undefined !== object["title"]) { metas.title = object["title"] + " • leocardz.com"; }
        if (undefined !== object["description"]) { metas.description = this.sliceDescription(object["description"]); }
        if (undefined !== object["keywords"]) { metas.keywords = object["keywords"]; }
        if (undefined !== object["image"]) { metas.image = this.base + "/images" + object["image"]; }
        if (undefined !== object["url"]) { metas.url = metas.url + object["url"]; }

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

    }

    sliceDescription(string: string): string {

        const lastSpaceIndex = string.slice(0, 250).lastIndexOf(" ");
        return string.substring(0, lastSpaceIndex) + "...";

    }

    setMetaElement(name: string, content: string) {

        let el: HTMLElement;
        el = this.DOM.querySelector('meta[name="' + name + '"]');

        if (el === null) {
            el = this.DOM.createElement('meta');
            el.setAttribute('name', name);
            el.setAttribute('content', content);
            this.headElement.appendChild(el);
        } else {
            el.setAttribute('content', content);
        }

    }

}