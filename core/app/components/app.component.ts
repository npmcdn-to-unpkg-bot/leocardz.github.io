import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, ROUTER_DIRECTIVES } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { Title } from '@angular/platform-browser';

import 'marked'; declare var marked: any;

import { TimeAgoPipe } from 'angular2-moment';

import { HomeComponent }  from './home.component';
import { AndroidComponent }  from './android.component';
import { BlogComponent }  from './blog.component';
import { IOSComponent }  from './ios.component';
import { LabComponent }  from './lab.component';
import { AboutComponent }  from './about.component';
import { OpenSourceComponent }  from './open.source.component';
import { PrivacyComponent }  from './privacy.component';
import { TagComponent }  from './tag.component';
import { NotFoundComponent }  from './not.found.component';

import { IndexService } from '../services/index.service';
import { SearchService } from '../services/search.service';
import { MetaService } from '../services/meta.service';
import { LabelService } from '../services/label.service';

import { Post } from '../models/post';

@Component({
    moduleId: module.id,
    selector: 'app',
    templateUrl: 'dist/app/views/app.component.html',
    directives: [
        ROUTER_DIRECTIVES
    ],
    pipes: [
        TimeAgoPipe
    ],
    providers: [
        IndexService,
        SearchService,
        MetaService,
        LabelService,
        Title,
        HTTP_PROVIDERS
    ],
    precompile: [
        HomeComponent,
        AndroidComponent,
        BlogComponent,
        IOSComponent,
        LabComponent,
        AboutComponent,
        OpenSourceComponent,
        PrivacyComponent,
        TagComponent,
        NotFoundComponent
    ]
})

export class AppComponent implements OnInit {

    isLoading: boolean = true;
    posts: Post[] = [];
    activities: Object[] = [];

    constructor(
        private _router: Router,
        private _indexService: IndexService,
        private _metaService: MetaService,
        private _labelService: LabelService
    ) {

        _indexService.activities(res => this.activities = res);

        _router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.posts = [];
                this.isLoading = true;
            }
            else if (event instanceof NavigationEnd) this.isLoading = false;
        });

    }

    ngOnInit() { }

    actionSearch(s: string) {

        this._indexService.search(res => this.posts = res, s);

    }

    actionNavigate(post: Post) {

        this._router.navigate(['/' + post.label + "/" + post.path]);

    }

    getLinkStyle(path: string) {

        return (path === "/" && window.location.pathname === path) || (path !== "/" && window.location.pathname.indexOf(path) === 0);

    }

    labelnize(label: string, uppercase: boolean) {

        return this._labelService.labelnize(label, uppercase);

    }

    markdown(s: string) {

        s = s.replace(/\*\*\*\*/g, "");
        const md = marked(s);
        return md.substring(3, md.length - 5) + " ";

    }

}