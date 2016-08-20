import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { TimeAgoPipe } from 'angular2-moment';

import { IndexService } from '../services/index.service';
import { MetaService } from '../services/meta.service';
import { LabelService } from '../services/label.service';

import { Post } from '../models/post';

@Component({
    moduleId: module.id,
    selector: 'home',
    templateUrl: '/dist/app/views/home.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [
        IndexService,
        LabelService,
        HTTP_PROVIDERS
    ],
    pipes: [
        TimeAgoPipe
    ]
})
export class HomeComponent implements OnInit {

    posts: Post[] = [];

    constructor(
        private _router: Router,
        private _metaService: MetaService, 
        private _indexService: IndexService,
        private _labelService: LabelService
        ) {

        _metaService.setData({});

        this._indexService.fetch()
            .map(res => res.json())
            .subscribe((res: Post[]) => {

                this.posts = this._indexService.search(res, "home", ["label"]);

            });


    }

    actionNavigate(post: Post) { this._router.navigate(['/' + post.label + "/" + post.path]); }

    labelnize(label: string, uppercase: boolean) { return this._labelService.labelnize(label, uppercase); }

    ngOnInit() { }

}