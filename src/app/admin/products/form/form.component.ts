import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  goBack() {
    this.navCtrl.navigateBack('admin/products');
  }
}
