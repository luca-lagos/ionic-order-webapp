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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  UserForm: FormGroup = new FormGroup({});

  user: User = {
    id: '',
    email: '',
    password: '',
    name: '',
    lastname: '',
    phone: null,
    type: '',
    location: '',
    des_location: '',
    img_profile: '',
  };

  private path = 'User/';

  public image = '';

  public file = '';

  passwordsMatching = false;
  isConfirmPasswordDirty = false;
  password = new FormControl('', [
    (c: AbstractControl) => Validators.required(c),
    Validators.pattern(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
    ),
  ]);
  confirmPassword = new FormControl('', [
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
    this.UserForm = this.FormBuilder.group(
      {
        name: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        lastname: new FormControl('', [
          Validators.required,
          Validators.minLength(5),
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: this.password,
        confirm_password: this.confirmPassword,
        phone: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
        ]),
        location: new FormControl('', [Validators.required]),
        des_location: new FormControl(''),
        img_profile: new FormControl('', [Validators.required]),
      },
      {
        validators: this.confirmedValidator('password', 'confirm_password'),
      } as AbstractControlOptions
    );
  }

  ngOnInit() {}

  async onSubmit() {
    this.register();
  }

  async register() {
    const credentials = {
      email: this.user.email,
      password: this.user.password,
    };
    const res = await this.FireauthService.register(
      credentials.email,
      credentials.password
    ).catch((err) => {
      console.log(err);
    });
    const UID = await this.FireauthService.getUID();
    this.user.id = UID;
    this.addUser();
  }

  async addUser() {
    this.LoadingService.showLoading('Por favor espere...', 'crescent');
    const name = this.user.name;
    const res = await this.FirestorageService.uploadFile(
      this.file,
      this.path,
      name
    );
    this.user.img_profile = res;
    this.FirestoreService.addDoc(this.user, this.path, this.user.id)
      .then((res) => {
        this.LoadingService.loading.dismiss().then(() => {
          this.goBack();
        });
        this.ToastService.presentToast(
          'Su cuenta ha sido creada con exito',
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

  logOut() {
    this.FireauthService.logOut();
  }

  async uploadFile($e: any) {
    if ($e.target.files && $e.target.files[0]) {
      this.file = $e.target.files[0];
      const reader = new FileReader();
      reader.onload = (image: any) => {
        this.image = image.target.result as string;
      };
      reader.readAsDataURL($e.target.files[0]);
    }
  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (FormGroup: FormGroup) => {
      const control = FormGroup.controls[controlName];
      const matchingControl = FormGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors['confirmedValidator']
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  goBack() {
    this.navCtrl.navigateBack('auth/login');
  }
}
