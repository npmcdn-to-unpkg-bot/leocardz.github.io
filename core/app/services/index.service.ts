import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import { SearchService } from './search.service';

import { Post } from '../models/post';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class IndexService {

    fullData: Post[] = [];
    after = function () { };

    constructor(private _http: Http, private _searchService: SearchService) {

        this._http.get('indexes/full.json')
            .map((res: Response) => res.json())
            .subscribe(res => {
                this.fullData = res
                this.after();
            });

    }

    select(callback: ((value: Post[]) => void), needle: string = "", fields: string[], hightlight: boolean = true) {

        if (needle === "") {
            callback([]);
        } else if (needle === "home") {
            callback(this.fullData);
        } else {
            callback(this._searchService.perform(this.fullData, needle, fields, hightlight));
        }

    }

    search(callback: ((value: Post[]) => void), needle: string = "") {

        this.select(callback, needle, ["title", "content"]);

    }

    filter(callback: any, label: string = "") {

        this.select(callback, label, ["label"], false);

    }

    tag(callback: ((value: Post[]) => void), tag: string) {

        this.select(callback, tag, ["tags"], false);

    }

    activities(callback: ((value: Object[]) => void)) {

        this._http.get('indexes/activities.json')
            .map((res: Response) => res.json())
            .subscribe(callback);

    }

    getPost(section: string, path: string) {

        return Observable.forkJoin(
            this._http.get(section + '/' + path + "/content.json").map(res => res.json()),
            this._http.get(section + '/' + path + "/CONTENT.md")
        );

    }



}