import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

import { SearchService } from './search.service';

import { Post } from '../models/post';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class IndexService {

    fullData: Post[] = [];

    constructor(private _http: Http, private _searchService: SearchService) { }

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

    fetch(): Observable<Response> {

        return this._http.get('indexes/full.json');

    }

    search(fullData: Post[], needle: string = "", fields: string[], hightlight: boolean = true): any {

        if (needle === "") {
            return [];
        } else if (needle === "home") {
            return fullData;
        } else {
            return this._searchService.perform(fullData, needle, fields, hightlight);
        }

    }



}