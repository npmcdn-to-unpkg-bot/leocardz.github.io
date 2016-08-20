import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { IndexService } from '../services/index.service';
import { MetaService } from '../services/meta.service';

import { Post } from '../models/post';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: '/dist/app/views/home.component.html',
    providers: [IndexService, HTTP_PROVIDERS]
})
export class HomeComponent implements OnInit {

    constructor(private _metaService: MetaService, private _indexService: IndexService) {

        _metaService.setData({});

        this._indexService.fetch()
            .map(res => res.json())
            .subscribe((res: Post[]) => {
                console.log(this._indexService.search(res, "home", ["label"]));
            });


    }

    ngOnInit() { }

}