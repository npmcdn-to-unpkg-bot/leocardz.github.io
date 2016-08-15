import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class GitHubService {

    constructor(private _http: Http) { }

    getProfile(callback: ((value: any) => void)) {

        this._http
            .get("indexes/profile.json")
            .map(res => res.json())
            .subscribe(callback);

    }

    getOpenSource(callback: ((value: any) => void)) {

        this._http
            .get("indexes/repos.json")
            .map(res => res.json())
            .subscribe(callback);

    }

}