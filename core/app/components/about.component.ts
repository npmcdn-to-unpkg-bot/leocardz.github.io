import { Component, OnInit } from '@angular/core';

import { MetaService } from '../services/meta.service';

@Component({
    moduleId: module.id,
    selector: 'about',
    templateUrl: 'dist/app/views/about.component.html'
})
export class AboutComponent implements OnInit {

    constructor(private _metaService: MetaService) {

        _metaService.setData({ title: "About", url: "/about" });

    }

    ngOnInit() {

    }

}