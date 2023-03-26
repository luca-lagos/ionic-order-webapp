import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import {
  Validators,
  FormControl,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { FirestoreService } from 'src/app/services/firestore.service';
import { FireauthService } from 'src/app/services/fireauth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { User } from 'src/app/models/model';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  ForgotPwdGroup: FormGroup = new FormGroup({});

  userList: User[] = [];

  email: string = '';

  public path = 'User/';

  constructor(
    private navCtrl: NavController,
    private FormBuilder: FormBuilder,
    public FireauthService: FireauthService,
    private LoadingService: LoadingService,
    private ToastService: ToastService,
    public FirestoreService: FirestoreService
  ) {
    this.ForgotPwdGroup = this.FormBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.LoadingService.showLoading('crescent');
    this.FireauthService.forgotPassword(this.email)
      .then(() => {
        this.LoadingService.loading.dismiss().then(() => {
          this.navCtrl.navigateRoot('auth/login');
        });
        this.ToastService.presentToast(
          'Correo enviado, verifique su bandeja de entrada',
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
