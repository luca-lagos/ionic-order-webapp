import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(public database: AngularFirestore) {}

  collection(path: string) {
    return this.database.collection(path);
  }

  addDoc(data: any, path: string, id: string) {
    return this.collection(path).doc(id).set(data);
  }

  getId() {
    return this.database.createId();
  }

  getDoc(path: string, id: string) {
    return this.collection(path).doc(id).valueChanges();
  }

  getAllDocs<T>(path: string) {
    return this.database.collection<T>(path).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    return this.collection(path).doc(id).delete();
  }

  updateDoc(path: string, id: string, data: any) {
    return this.collection(path).doc(id).update(data);
  }
}

//SEGUIR EN VIDEO 8 MIN 13
