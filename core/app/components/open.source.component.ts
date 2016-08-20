import { Component, OnInit } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { GitHubService } from '../services/github.service';
import { MetaService } from '../services/meta.service';

@Component({
    moduleId: module.id,
    selector: 'open-source',
    templateUrl: '/dist/app/views/open.source.component.html',
    providers: [
        GitHubService,
        HTTP_PROVIDERS
    ],

})
export class OpenSourceComponent implements OnInit {

    repos: Object[] = [];
    constructor(private _githubService: GitHubService, private _metaService: MetaService) {

        _metaService.setData({ title: "Open Source", url: "/open-source" });

    }

    ngOnInit() {

        this._githubService.getOpenSource(res => { this.repos = res; });

    }

}