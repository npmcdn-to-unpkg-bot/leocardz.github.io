import { enableProdMode } from '@angular/core';
import { bootstrap } from '@angular/platform-browser-dynamic';

import { APP_ROUTE_PROVIDERS } from './app.routes';
import { AppComponent } from './components/app.component';

enableProdMode();

bootstrap(AppComponent, [APP_ROUTE_PROVIDERS])
    .then(success => { })
    .catch(error => console.log(error));