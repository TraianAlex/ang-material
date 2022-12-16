import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MessagesRoutingModule } from './messages-routing.module';

import { MessagesComponent } from './messages.component';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageNewComponent } from './message-new/message-new.component';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [MessagesComponent, MessageListComponent, MessageNewComponent],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatStepperModule,
  ],
})
export class MessagesModule {}
