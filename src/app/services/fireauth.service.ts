import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class FireauthService {
  constructor(public Auth: AngularFireAuth) {}

  loginCommon(email: string, password: string) {
    return this.Auth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    return this.Auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  /*loginWithFacebook() {
    return this.Auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }*/

  logOut() {
    this.Auth.signOut();
  }

  register(email: string, password: string) {
    return this.Auth.createUserWithEmailAndPassword(email, password);
  }
}
