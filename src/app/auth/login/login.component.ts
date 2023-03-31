import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/model';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  AbstractControlOptions,
  Validators,
  FormControl,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { FirestoreService } from './../../services/firestore.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { FireauthService } from 'src/app/services/fireauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup = new FormGroup({});

  result: User[] = [];

  private path = 'User/';

  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  password = new FormControl('', [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);

  constructor(
    private navCtrl: NavController,
    private LoadingService: LoadingService,
    private ToastService: ToastService,
    public FirestoreService: FirestoreService,
    private ActivatedRoute: ActivatedRoute,
    private FormBuilder: FormBuilder,
    public FirestorageService: FirestorageService,
    public FireauthService: FireauthService
  ) {
    this.LoginForm = this.FormBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: this.password,
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.LoadingService.showLoading('crescent');
    const credentials = {
      email: this.LoginForm.value['email'],
      password: this.LoginForm.value['password'],
    };
    this.validateUser(credentials.email)
      .then((res) => {
        this.FireauthService.loginCommon(
          credentials.email,
          credentials.password
        )
          .then((res) => {
            if (res.user?.emailVerified) {
              this.LoadingService.loading.dismiss();
              this.navCtrl.navigateRoot('');
            } else {
              this.LoadingService.loading.dismiss();
              this.FireauthService.logOut();
              this.ToastService.presentToast(
                'La cuenta todavia no ha sido verificada, revise su bandeja de entrada!',
                'alert-circle-outline',
                'warning-toast'
              );
              this.FireauthService.logOut();
            }
          })
          .catch((err) => {
            const message = err.code;
            this.LoadingService.loading.dismiss();
            switch (message) {
              case 'auth/wrong-password':
                this.ToastService.presentToast(
                  'La contraseña ingresada es incorrecta',
                  'close-circle-outline',
                  'danger-toast'
                );
                break;
              case 'auth/user-not-found':
                this.ToastService.presentToast(
                  'No se ha encontrado la cuenta ingresada',
                  'close-circle-outline',
                  'danger-toast'
                );
                break;
              default:
                this.ToastService.presentToast(
                  'Hubo un error, por favor vuelta a intentarlo',
                  'close-circle-outline',
                  'danger-toast'
                );
                break;
            }
          });
      })
      .catch((err) => {
        this.LoadingService.loading.dismiss();
        this.ToastService.presentToast(
          'No existe un usuario registrado con el correo electrónico ingresado',
          'close-circle-outline',
          'danger-toast'
        );
      });
  }

  async validateUser(email: string) {
    this.FirestoreService.getAllDocs<User>(this.path).subscribe((res) => {
      this.result = res.filter((item) => item.email === email);
    });
    if (this.result.length > 0) {
      return true;
    }
    return false;
  }

  goBack() {
    this.navCtrl.navigateBack('');
  }
}
