import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule) },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then((m) => m.CustomersModule) },
  { path: 'messages', loadChildren: () => import('./messages/messages.module').then((m) => m.MessagesModule) },
  { path: '', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
