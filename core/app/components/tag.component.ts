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
    selector: 'tab',
    templateUrl: '/dist/app/views/tag.component.html',
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
export class TagComponent implements OnInit {

    posts: Post[] = [];
    tag: string = "";

    constructor(
        private _router: Router,
        private _route: ActivatedRoute,
        private _indexService: IndexService,
        private _metaService: MetaService,
        private _labelService: LabelService) {

        this.tag = this._route.snapshot.params["tag"];
        _metaService.setData({ title: this.tag, url: "/tag/" + this.tag });

    }

    actionNavigate(post: Post) { this._router.navigate(['/' + post.label + "/" + post.path]); }

    labelnize(label: string, uppercase: boolean) { return this._labelService.labelnize(label, uppercase); }

    ngOnInit() {

        this._indexService.fetch()
            .map(res => res.json())
            .subscribe((res: Post[]) => {

                this.posts = this._indexService.simplify(this._indexService.search(res, this.tag, ["tags"], false));

            });

    }

}