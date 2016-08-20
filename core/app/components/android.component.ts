import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { IndexService } from '../services/index.service';
import { MetaService } from '../services/meta.service';

import { Post } from '../models/post';

@Component({
    moduleId: module.id,
    selector: 'android',
    templateUrl: '/dist/app/views/android.component.html',
    providers: [IndexService, HTTP_PROVIDERS]
})
export class AndroidComponent implements OnInit {

    params: Object = {}
    title: string = "Android";
    label: string = "android";

    constructor(
        private _metaService: MetaService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _indexService: IndexService
    ) {

        this.params = this._route.snapshot.params;

    }

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
                    console.log(this._indexService.search(res, this.label, ["label"], false));
                });

        }

    }

}