import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  public loading: any = null;

  constructor(private loadingCtrl: LoadingController) {
  }

  async showLoading(spinner: any) {
    this.loading = await this.loadingCtrl.create({
      spinner: spinner,
      cssClass: 'loading-event'
    });

    await this.loading.present();
  }
}
