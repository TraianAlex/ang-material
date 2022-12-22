import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TrainingComponent } from './training/training.component';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
  { path: 'orders', loadChildren: () => import('./orders/orders.module').then((m) => m.OrdersModule) },
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then((m) => m.CustomersModule) },
  { path: 'messages', loadChildren: () => import('./messages/messages.module').then((m) => m.MessagesModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
