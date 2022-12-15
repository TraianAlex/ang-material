import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { MessagesComponent } from './messages.component';
import { MessageListComponent } from './message-list/message-list.component';


@NgModule({
  declarations: [
    MessagesComponent,
    MessageListComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule
  ]
})
export class MessagesModule { }
