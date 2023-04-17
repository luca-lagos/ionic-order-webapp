import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateEmail, updatePassword, getAuth } from 'firebase/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root',
})
export class FireauthService {
  constructor(public Auth: AngularFireAuth) {
    this.getUID();
  }

  loginCommon(email: string, password: string) {
    return this.Auth.signInWithEmailAndPassword(email, password);
  }

  loginWithGoogle() {
    return this.Auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  /*loginWithFacebook() {
    return this.Auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
  }*/

  async getUID() {
    const user = await this.Auth.currentUser;
    if (user === undefined) {
      return null;
    } else {
      return user?.uid;
    }
  }

  stateAuth() {
    return this.Auth.authState;
  }

  logOut() {
    this.Auth.signOut();
  }

  async register(email: string, password: string) {
    return await this.Auth.createUserWithEmailAndPassword(email, password).then(
      () => {
        this.sendCheckMail();
      }
    );
  }

  async sendCheckMail(): Promise<void> {
    return await this.Auth.currentUser.then((user) => {
      return user?.sendEmailVerification();
    });
  }

  async forgotPassword(email: string): Promise<void> {
    return await this.Auth.sendPasswordResetEmail(email);
  }

  async updateAuthData(email: string, password: string): Promise<void> {
    const user: any = getAuth().currentUser;
    console.log(user);
    await updateEmail(user, email);
    await updatePassword(user, password);
  }
}
