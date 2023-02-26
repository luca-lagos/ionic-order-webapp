import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Product } from 'src/app/models/model';
import {
  Validators,
  FormControl,
  FormBuilder,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  ProductForm: FormGroup = new FormGroup({});

  productList: Product[] = [];

  product: Product = {
    id: this.FirestoreService.getId(),
    title: '',
    price: null,
    offer_price: null,
    type: '',
    image: '',
    date: new Date(),
  };

  private path = 'Product/';

  constructor(
    private navCtrl: NavController,
    public FirestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.ProductForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      type: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      offer_price: new FormControl('', [Validators.required]),
    });

    this.getAllProducts();
  }

  addProduct() {
    this.FirestoreService.addDoc(this.product, this.path, this.product.id);
    this.goBack();
  }

  getAllProducts() {
    this.FirestoreService.getAllDocs<Product>(this.path).subscribe((res) => {
      this.productList = res;
    });
  }

  goBack() {
    this.navCtrl.navigateBack('admin/products');
  }
}
