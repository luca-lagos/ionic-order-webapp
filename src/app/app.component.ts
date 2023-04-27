import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { ToastService } from './services/toast.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FireauthService } from './services/fireauth.service';
import { User } from 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public current_user: any = '';

  private img_profile: string = '';

  private path: string = '';

  constructor(
    private menuController: MenuController,
    private navCtrl: NavController,
    public FireauthService: FireauthService,
    private FirestoreService: FirestoreService,
    private ToastService: ToastService
  ) {
    this.FireauthService.stateAuth().subscribe((res) => {
      this.current_user = res;
      console.log(this.current_user);
    });
  }

  closeMenu() {
    this.menuController.close();
  }

  logOut() {
    this.FireauthService.logOut();
    this.navCtrl.navigateRoot('').then(() => {
      this.ToastService.presentToast(
        'Se ha cerrado la sesión correctamente',
        'checkmark-circle-outline',
        'success-toast'
      );
    });
  }
}
