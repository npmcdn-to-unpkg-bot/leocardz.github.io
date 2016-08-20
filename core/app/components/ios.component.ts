import { Router, ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { TimeAgoPipe } from 'angular2-moment';

import { IndexService } from '../services/index.service';
import { MetaService } from '../services/meta.service';

import { Post } from '../models/post';

@Component({
    moduleId: module.id,
    selector: 'ios',
    templateUrl: '/dist/app/views/ios.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ],
    providers: [
        IndexService,
        HTTP_PROVIDERS
    ],
    pipes: [
        TimeAgoPipe
    ]
})
export class IOSComponent implements OnInit {

    params: Object = {}
    title: string = "iOS";
    label: string = "ios";
    posts: Post[] = [];

    constructor(
        private _metaService: MetaService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _indexService: IndexService
    ) {

        this.params = this._route.snapshot.params;

    }

    actionNavigate(post: Post) { this._router.navigate(['/' + post.label + "/" + post.path]); }

    ngOnInit() {

        if (undefined !== this.params["post"]) {

            this._indexService.getPost(this.label, this.params["post"])
                .subscribe(data => {

                    const res = data[0];
                    const markdown = data[1];

                    console.log(res);
                    console.log(markdown._body);

                    this._metaService.setData({
                        title: res.title,
                        description: res.content,
                        image: "/" + this.label + "/" + res.path + "/" + res.image,
                        url: "/" + this.label + "/" + res.path
                    });

                }, error => this._router.navigate(['/not-found']));

        } else {


            this._metaService.setData({ title: this.title, url: "/" + this.label });

            this._indexService.fetch()
                .map(res => res.json())
                .subscribe((res: Post[]) => {

                    this.posts = this._indexService.search(res, this.label, ["label"], false);
                
            });

        }

    }

}