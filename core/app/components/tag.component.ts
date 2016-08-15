import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { IndexService } from '../services/index.service';
import { MetaService } from '../services/meta.service';

import { Post } from '../models/post';

@Component({
    moduleId: module.id,
    selector: 'tab',
    templateUrl: 'dist/app/views/tag.component.html',
    providers: [IndexService, HTTP_PROVIDERS]
})
export class TagComponent implements OnInit {

    constructor(private _route: ActivatedRoute, private _indexService: IndexService, private _metaService: MetaService) {

        const tag = this._route.snapshot.params["tag"];

        _metaService.setData({ title: tag, url: "/tag/" + tag });

        _indexService.after = function () {

            _indexService.tag(function (res: Post[]) { console.log(res); }, tag);

        };


    }

    ngOnInit() { }


}