import { Component, OnInit } from '@angular/core';

import { MetaService } from '../services/meta.service';

@Component({
    moduleId: module.id,
    selector: 'not-found',
    templateUrl: '/dist/app/views/not.found.component.html'
})
export class NotFoundComponent implements OnInit {

    constructor(private _metaService: MetaService) {

        _metaService.setData({});

    }

    ngOnInit() { console.log("not.found"); }

}