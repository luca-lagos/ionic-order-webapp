import { FirestoreService } from './../../../services/firestore.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { Product } from 'src/app/models/model';
import { ActivatedRoute } from '@angular/router';
import {
  Validators,
  FormControl,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { FirestorageService } from 'src/app/services/firestorage.service';

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

  private productRef: any;

  public title: string = '';

  public image = '';

  public file = '';

  public id: any = this.ActivatedRoute.snapshot.paramMap.get('id');

  constructor(
    private navCtrl: NavController,
    private LoadingService: LoadingService,
    private ToastService: ToastService,
    public FirestoreService: FirestoreService,
    private ActivatedRoute: ActivatedRoute,
    private FormBuilder: FormBuilder,
    public FirestorageService: FirestorageService
  ) {
    this.ProductForm = this.FormBuilder.group({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      type: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      offer_price: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    if (this.id !== null) {
      this.title = 'Editar producto';
      this.FirestoreService.getDoc(this.path, this.id).subscribe((res) => {
        this.productRef = res;
        this.image = this.productRef.image;
        this.ProductForm = this.FormBuilder.group({
          title: [this.productRef.title],
          type: [this.productRef.type],
          price: [this.productRef.price],
          offer_price: [this.productRef.offer_price],
          image: [this.image]
        });
      });
    } else {
      this.title = 'Añadir producto';
    }
  }

  async onSubmit() {
    this.LoadingService.showLoading('crescent');
    if (this.id !== null) {
      const editProduct: Product = {
        id: this.id,
        title: this.ProductForm.value['title'],
        price: this.ProductForm.value['price'],
        offer_price: this.ProductForm.value['offer_price'],
        type: this.ProductForm.value['type'],
        image: this.image,
        date: new Date(),
      };
      const name = this.ProductForm.value['title'];
      const res = await this.FirestorageService.uploadFile(
        this.file,
        this.path,
        name
      );
      this.ProductForm.value['image'] = res;
      this.FirestoreService.updateDoc(editProduct, this.path, editProduct.id)
        .then((res) => {
          this.LoadingService.loading.dismiss().then(() => {
            this.goBack();
          });
          this.ToastService.presentToast(
            'Producto actualizado con éxito',
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
      const name = this.product.title;
      const res = await this.FirestorageService.uploadFile(
        this.file,
        this.path,
        name
      );
      this.product.image = res;
      this.FirestoreService.addDoc(this.product, this.path, this.product.id)
        .then((res) => {
          this.LoadingService.loading.dismiss().then(() => {
            this.goBack();
          });
          this.ToastService.presentToast(
            'Producto registrado con éxito',
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

  goBack() {
    this.navCtrl.navigateBack('admin/products');
  }
}
