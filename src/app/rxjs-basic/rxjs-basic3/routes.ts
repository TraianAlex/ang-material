import { Route } from '@angular/router';

import { RxjsBasic2Component } from '../rxjs-basic2/rxjs-basic.component';
import { RxjsBasic3Component } from './rxjs-basic.component';



export const RXJS_BASIC: Route[] = [
  // {
  //   path: '',
  //   component: RxjsBasic3Component,
  //   children: [
  //     { path: '', redirectTo: 'basic', pathMatch: 'full' },
  //     { path: 'basic2', component: RxjsBasic2Component },
  //     { path: 'basic2', component: RxjsBasic3Component },
  //   ],
  // },
  // {
  //   path: '',
  //   redirectTo: 'basic3',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'basic3',
  //   loadComponent: () => import('../rxjs-basic2/rxjs-basic.component').then((m) => m.RxjsBasic2Component),
  // },
];
