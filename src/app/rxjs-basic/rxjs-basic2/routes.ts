import { Route } from '@angular/router';
import { RxjsBasic2Component } from '../rxjs-basic2/rxjs-basic.component';
import { RxjsBasic3Component } from '../rxjs-basic3/rxjs-basic.component';


export const RXJS_BASIC: Route[] = [
  // {
  //   path: '',
  //   component: RxjsBasic2Component,
  //   children: [
  //     { path: '', redirectTo: 'basic', pathMatch: 'full' },
  //     { path: 'basic2', component: RxjsBasic2Component },
  //     { path: 'basic3', component: RxjsBasic3Component },
  //   ],
  // },
  // {
  //   path: '',
  //   redirectTo: 'basic2',
  //   pathMatch: 'full',
  // },
  // {
  //   path: 'basic2',
  //   loadComponent: () => import('../rxjs-basic2/rxjs-basic.component').then((m) => m.RxjsBasic2Component),
  // },
];
