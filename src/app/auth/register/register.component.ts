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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  UserForm: FormGroup = new FormGroup({});

  user: User = {
    id: this.FirestoreService.getId(),
    email: '',
    password: '',
    name: '',
    lastname: '',
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
    public FirestorageService: FirestorageService
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

  onSubmit() {}

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
