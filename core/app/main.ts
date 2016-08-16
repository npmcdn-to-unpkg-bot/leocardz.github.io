import { provide, enableProdMode } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { APP_ROUTE_PROVIDERS } from './app.routes';
import { AppComponent } from './components/app.component';

enableProdMode();

bootstrap(AppComponent,
    [
        APP_ROUTE_PROVIDERS,
        provide(APP_BASE_HREF, { useValue: '/' })
    ])
    .then(success => { })
    .catch(error => console.log(error));