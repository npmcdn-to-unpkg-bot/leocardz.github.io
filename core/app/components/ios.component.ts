import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { IndexService } from '../services/index.service';
import { MetaService } from '../services/meta.service';

import { Post } from '../models/post';

@Component({
    moduleId: module.id,
    selector: 'ios',
    templateUrl: 'dist/app/views/ios.component.html',
    providers: [IndexService, HTTP_PROVIDERS]
})
export class IOSComponent implements OnInit {

    constructor(private _metaService: MetaService, private _router: Router, private _route: ActivatedRoute, private _indexService: IndexService) {

        const params = this._route.snapshot.params;

        if (undefined !== params["post"]) {

            _indexService.getPost("ios", params["post"])
                .subscribe(data => {

                    const res = data[0];
                    const markdown = data[1];

                    console.log(res);
                    console.log(markdown._body);

                    _metaService.setData({
                        title: res.title,
                        description: res.content,
                        image: "/ios/" + res.path + "/" + res.image,
                        url: "/ios/" + res.path
                    });

                }, error => this._router.navigate(['/not-found']));

        } else {


            _metaService.setData({ title: "iOS", url: "/ios" });
            _indexService.after = function () {

                _indexService.filter(function (res: Post[]) { console.log(res.length); }, "ios");

            };

        }

    }

    ngOnInit() { }

}