import { Route } from '@angular/router';
import { RxjsBasicComponent } from './rxjs-basic.component';
import { RxjsBasic2Component } from './rxjs-basic2/rxjs-basic.component';
import { RxjsBasic3Component } from './rxjs-basic3/rxjs-basic.component';
import { RxjsBasic11Component } from './rxjs-basic1/rxjs-basic11/rxjs-basic.component';

export const RXJS_BASIC: Route[] = [
  // {
  //   path: '',
  //   component: RxjsBasicComponent,
  //   children: [
  //     { path: '', redirectTo: 'basic1', pathMatch: 'full' }, // basic
  //     { path: 'basic1', component: RxjsBasic11Component }, // basic/basic1
  //     { path: 'basic2', component: RxjsBasic2Component }, // basic/basic2
  //     { path: 'basic3', component: RxjsBasic3Component }, // basic/basic3
  //   ],
  // },
  {
    path: '',
    redirectTo: 'basic1',
    pathMatch: 'full',
  },
  {
    path: 'basic1',
    loadComponent: () => import('./rxjs-basic1/rxjs-basic.component').then((m) => m.RxjsBasic1Component),
    loadChildren: () => import('./rxjs-basic1/routes').then((m) => m.RXJS_BASIC),
  },
  {
    path: 'basic2',
    loadComponent: () => import('./rxjs-basic2/rxjs-basic.component').then((m) => m.RxjsBasic2Component),
    //loadChildren: () => import('./rxjs-basic2/rxjs-basic.component').then((m) => m.RxjsBasic2Component),
  },
  {
    path: 'basic3',
    loadComponent: () => import('./rxjs-basic3/rxjs-basic.component').then((m) => m.RxjsBasic3Component),
    //loadChildren: () => import('./rxjs-basic3/rxjs-basic.component').then((m) => m.RxjsBasic3Component),
  },
];
