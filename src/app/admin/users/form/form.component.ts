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
import { FirestoreService } from './../../../services/firestore.service';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { FireauthService } from 'src/app/services/fireauth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  UserForm: FormGroup = new FormGroup({});

  userList: User[] = [];

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

  private userRef: any;

  public title: string = '';

  public image = '';

  public file = '';

  public uid: any = this.ActivatedRoute.snapshot.paramMap.get('id');

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
        type: new FormControl('', [Validators.required]),
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

  ngOnInit() {
    if (this.uid !== null) {
      this.title = 'Editar usuario';
      this.FirestoreService.getDoc(this.path, this.uid).subscribe((res) => {
        this.userRef = res;
        this.image = this.userRef.img_profile;
        this.UserForm = this.FormBuilder.group({
          email: [this.userRef.email],
          password: [this.userRef.password],
          confirm_password: [this.userRef.password],
          name: [this.userRef.name],
          lastname: [this.userRef.lastname],
          phone: [this.userRef.phone],
          type: [this.userRef.type],
          location: [this.userRef.location],
          des_location: [this.userRef.des_location],
          img_profile: [this.image],
        });
        console.log(this.image);
      });
    } else {
      this.title = 'Añadir usuario';
    }
  }

  async onSubmit() {
    const credentials = {
      email: this.user.email,
      password: this.user.password,
    };
    this.LoadingService.showLoading('crescent');
    if (this.uid !== null) {
      const editUser: User = {
        id: this.uid,
        email: this.UserForm.value['email'],
        password: this.UserForm.value['password'],
        name: this.UserForm.value['name'],
        lastname: this.UserForm.value['lastname'],
        phone: this.UserForm.value['phone'],
        type: this.UserForm.value['type'],
        location: this.UserForm.value['location'],
        des_location: this.UserForm.value['des_location'],
        img_profile: this.image,
      };
      const name =
        this.UserForm.value['name'] + '_' + this.UserForm.value['lastname'];
      const res = await this.FirestorageService.uploadFile(
        this.file,
        this.path,
        name
      );
      this.UserForm.value['img_profile'] = res;
      this.FirestoreService.updateDoc(editUser, this.path, editUser.id)
        .then((res) => {
          this.LoadingService.loading.dismiss().then(() => {
            this.goBack();
          });
          this.ToastService.presentToast(
            'Usuario actualizado con éxito',
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
    } else {
      await this.FireauthService.register(
        credentials.email,
        credentials.password
      ).catch((err) => {
        console.log(err);
      });
      const UID = await this.FireauthService.getUID();
      this.user.id = UID;
      const name = this.user.name + '_' + this.user.lastname;
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
            'Usuario registrado con éxito',
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
    this.navCtrl.navigateBack('admin/users');
  }
}
