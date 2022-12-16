import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { OrderListComponent } from './order-list/order-list.component';

import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [OrdersComponent, OrderListComponent],
  imports: [CommonModule, OrdersRoutingModule, MatTabsModule],
})
export class OrdersModule {}
