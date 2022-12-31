import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { MaterialModule } from '../material.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  declarations: [SignupComponent, LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  ],
  exports: [],
})
export class AuthModule {}
