import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class FirestorageService {
  constructor(private AngularFireStorage: AngularFireStorage) {}

  uploadFile() {
    return new Promise<void>((resolve: any, reject: any) => {
      setTimeout(() => {
        resolve(true);
        return;
      }, 2000);
    });
  }
}
