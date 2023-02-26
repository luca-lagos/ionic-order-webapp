import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor(private loadingCtrl: LoadingController) {}

  async showLoading(message: string, duration: number, spinner: any) {
    const loading = await this.loadingCtrl.create({
      message: message,
      duration: duration,
      spinner: spinner
    });

    await loading.present();
  }
}
