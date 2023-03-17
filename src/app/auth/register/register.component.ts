import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User } from 'src/app/models/model';
import { ActivatedRoute } from '@angular/router';
import {
  Validators,
  FormControl,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { FirestorageService } from 'src/app/services/firestorage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  UserForm: FormGroup = new FormGroup({});

  user: User = {

  }


  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  onSubmit(){

  }

  goBack() {
    this.navCtrl.navigateBack('auth/login');
  }
}
