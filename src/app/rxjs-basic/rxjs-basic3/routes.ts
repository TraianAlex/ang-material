import { Route } from '@angular/router';

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
  {
    path: '',
    redirectTo: 'basic31',
    pathMatch: 'full',
  },
  {
    path: 'basic31',
    loadComponent: () => import('./rxjs-basic31/rxjs-basic.component').then((m) => m.RxjsBasic31Component),
  },
  {
    path: 'basic32',
    loadComponent: () => import('./rxjs-basic32/rxjs-basic.component').then((m) => m.RxjsBasic32Component),
  },
  {
    path: 'basic33',
    loadComponent: () => import('./rxjs-basic33/rxjs-basic.component').then((m) => m.RxjsBasic33Component),
  },
  {
    path: 'basic34',
    loadComponent: () => import('./rxjs-basic34/rxjs-basic.component').then((m) => m.RxjsBasic34Component),
  }
];
