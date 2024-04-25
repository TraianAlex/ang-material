import { Route } from '@angular/router';

export const RXJS_BASIC: Route[] = [
  // {
  //   path: '',
  //   component: RxjsBasic1Component,
  //   children: [
  //     { path: '', redirectTo: '/basic11', pathMatch: 'full' }, // basic | basic/basic1
  //     { path: 'basic11', component: RxjsBasic11Component }, // basic/basic1
  //     { path: 'basic12', component: RxjsBasic12Component }, // basic/basic1/basic12
  //     { path: 'basic13', component: RxjsBasic13Component }, // basic/basic1/basic13
  //   ],
  // },
  {
    path: '',
    redirectTo: 'basic11',
    pathMatch: 'full',
  },
  {
    path: 'basic11',
    loadComponent: () => import('./rxjs-basic11/rxjs-basic.component').then((m) => m.RxjsBasic11Component),
  },
  {
    path: 'basic12',
    loadComponent: () => import('./rxjs-basic12/rxjs-basic.component').then((m) => m.RxjsBasic12Component),
  },
  {
    path: 'basic13',
    loadComponent: () => import('./rxjs-basic13/rxjs-basic.component').then((m) => m.RxjsBasic13Component),
  }
];
