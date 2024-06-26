import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'training',
    loadChildren: () => import('./training/training.module').then((m) => m.TrainingModule),
    canLoad: [AuthGuard],
  },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule) },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then((m) => m.CustomersModule) },
  { path: 'messages', loadChildren: () => import('./messages/messages.module').then((m) => m.MessagesModule) },
  {
    path: 'football',
    loadChildren: () => import('./football-standings/football-standings.module').then((m) => m.FootballStandingsModule),
  },
  {
    path: 'google-sheets',
    loadChildren: () => import('./google-sheets/google-sheets.module').then((m) => m.GoogleSheetsModule),
  },
  {
    path: 'basic',
    loadChildren: () => import('./rxjs-basic/routes').then((m) => m.RXJS_BASIC),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
