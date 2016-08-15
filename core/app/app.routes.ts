import { provideRouter, RouterConfig } from '@angular/router';

import { HomeComponent }  from './components/home.component';
import { AndroidComponent }  from './components/android.component';
import { BlogComponent }  from './components/blog.component';
import { IOSComponent }  from './components/ios.component';
import { LabComponent }  from './components/lab.component';
import { AboutComponent }  from './components/about.component';
import { OpenSourceComponent }  from './components/open.source.component';
import { PrivacyComponent }  from './components/privacy.component';
import { TagComponent }  from './components/tag.component';
import { NotFoundComponent }  from './components/not.found.component';

function getProperRoutes(): RouterConfig {

  return [
    { path: '', component: HomeComponent },
    { path: 'android', component: AndroidComponent },
    { path: 'android/:post', component: AndroidComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'blog/:post', component: BlogComponent },
    { path: 'ios', component: IOSComponent },
    { path: 'ios/:post', component: IOSComponent },
    { path: 'lab', component: LabComponent },
    { path: 'lab/:post', component: LabComponent },
    { path: 'about', component: AboutComponent },
    { path: 'open-source', component: OpenSourceComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'tag/:tag', component: TagComponent },
    { path: '**', component: NotFoundComponent }
  ];

}

export const APP_ROUTE_PROVIDERS = [

  provideRouter(getProperRoutes())

];