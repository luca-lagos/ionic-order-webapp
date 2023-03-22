import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FireauthService } from './services/fireauth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menuController: MenuController, public FireauthService: FireauthService) {}

  closeMenu() {
    this.menuController.close();
  }

  logOut(){}
}
