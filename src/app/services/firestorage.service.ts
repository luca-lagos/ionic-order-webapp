import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestorageService {
  constructor(private AngularFireStorage: AngularFireStorage) {}

  uploadFile(file: any, path: string, name: string): Promise<string> {
    return new Promise((resolve: any, reject: any) => {
      const filePath =
        path +
        '/' +
        name.replaceAll('/', '_').replaceAll(' ', '_').replaceAll('-', '_').toLowerCase();
      const ref = this.AngularFireStorage.ref(filePath);
      const task = ref.put(file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe((res) => {
              const downloadURL = res;
              resolve(downloadURL);
              return;
            });
          })
        )
        .subscribe();
    });
  }
}
