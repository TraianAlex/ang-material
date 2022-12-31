import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [ReactiveFormsModule, AuthRoutingModule, AngularFireAuthModule, AngularFirestoreModule, SharedModule],
  exports: [],
})
export class AuthModule {}
