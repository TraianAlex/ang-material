import { Route } from '@angular/router';

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
  {
    path: '',
    redirectTo: 'basic21',
    pathMatch: 'full',
  },
  {
    path: 'basic21',
    loadComponent: () => import('./rxjs-basic21/rxjs-basic.component').then((m) => m.RxjsBasic21Component),
  },
  {
    path: 'basic22',
    loadComponent: () => import('./rxjs-basic22/rxjs-basic.component').then((m) => m.RxjsBasic22Component),
  },
  {
    path: 'basic23',
    loadComponent: () => import('./rxjs-basic23/rxjs-basic.component').then((m) => m.RxjsBasic23Component),
  }
];
