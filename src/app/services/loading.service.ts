import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  public loading: any = null;

  constructor(private loadingCtrl: LoadingController) {
  }

  async showLoading(message: string, spinner: any) {
    this.loading = await this.loadingCtrl.create({
      message: message,
      spinner: spinner,
    });

    await this.loading.present();
  }
}
