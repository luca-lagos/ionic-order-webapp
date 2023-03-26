import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { FireauthService } from 'src/app/services/fireauth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-send-check',
  templateUrl: './send-check.component.html',
  styleUrls: ['./send-check.component.scss'],
})
export class SendCheckComponent implements OnInit {
  constructor(
    private navCtrl: NavController,
    public FireauthService: FireauthService,
    private LoadingService: LoadingService,
    private ToastService: ToastService
  ) {}

  public user$: Observable<any> = this.FireauthService.Auth.user;

  ngOnInit() {
    this.user$.subscribe((val) => {
      if (val === null) {
        this.navCtrl.navigateRoot('auth/login');
        this.ToastService.presentToast(
          'Hubo un error, por favor vuelta a intentarlo',
          'close-circle-outline',
          'danger-toast'
        );
      }
    });
  }

  onSendCheckMail() {
    this.LoadingService.showLoading('crescent');
    this.FireauthService.sendCheckMail()
      .then(() => {
        this.FireauthService.sendCheckMail();
        this.LoadingService.loading.dismiss();
        this.ToastService.presentToast(
          'Correo reenviado, verifique su bandeja de entrada',
          'checkmark-circle-outline',
          'success-toast'
        );
      })
      .catch((err) => {
        this.LoadingService.loading.dismiss();
        this.ToastService.presentToast(
          'Hubo un error, por favor vuelta a intentarlo',
          'close-circle-outline',
          'danger-toast'
        );
      });
  }

  goBack() {
    this.navCtrl.navigateBack('auth/login');
  }
}
