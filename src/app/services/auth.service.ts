import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { AuthData } from '../auth/auth-data.model';
import { TrainingService } from './training.service';
// import { User } from '../auth/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authChange = new Subject<boolean>();
  // private user!: User | null;
  private isAuthenticated = false;

  constructor(private router: Router, private afAuth: AngularFireAuth, private trainingService: TrainingService) {}

  initAuthListener() {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.router.navigate(['/training']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.isAuthenticated = false;
        this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString(),
    // };
    this.afAuth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        // this.authSuccessfully();
        console.log('registered');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    // this.user = {
    //   email: authData.email,
    //   userId: Math.round(Math.random() * 10000).toString(),
    // };
    this.afAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((result) => {
        // this.authSuccessfully();
        console.log('loggedin');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  logout() {
    // this.user = null;
    //  this.trainingService.cancelSubscriptions();
    this.afAuth.signOut();
    // this.isAuthenticated = false;
    // this.authChange.next(false);
    // this.router.navigate(['/login']);
  }

  // getUser() {
  //   return { ...this.user };
  // }

  isAuth() {
    return this.isAuthenticated; // this.user != null;
  }

  // private authSuccessfully() {
  //   this.isAuthenticated = true;
  //   this.authChange.next(true);
  //   this.router.navigate(['/training']);
  // }
}
