import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/models/model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  product: Product = {
    title: '',
    price: null,
    offer_price: null,
    type: '',
    image: '',
  };

  private path = 'Product/';

  constructor(
    private navCtrl: NavController,
    public FirestoreService: FirestoreService
  ) {}

  ngOnInit() {}

  addProduct() {
    const id = this.FirestoreService.getId();
    console.log(id);
    console.log(this.product);
    this.FirestoreService.addDoc(this.product, this.path, id);
    this.goBack();
  }

  goBack() {
    this.navCtrl.navigateBack('admin/products');
  }
}
