import { Component, OnInit } from '@angular/core';

import { MetaService } from '../services/meta.service';

@Component({
    moduleId: module.id,
    selector: 'privay',
    templateUrl: 'dist/app/views/privacy.component.html'
})
export class PrivacyComponent implements OnInit {

    constructor(private _metaService: MetaService) {

        _metaService.setData({ title: "Privacy", url: "/privacy" });

    }

    ngOnInit() {

    }

}