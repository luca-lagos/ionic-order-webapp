import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Product } from 'src/app/models/model';
import { AlertController, NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  productList: Product[] = [];

  private path = 'Product/';

  public results: Product[] = [];

  constructor(
    public FirestoreService: FirestoreService,
    private AlertController: AlertController,
    private navCtrl: NavController,
    private ToastService: ToastService
  ) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.FirestoreService.getAllDocs<Product>(this.path).subscribe((res) => {
      this.productList = res;
      this.results = [...this.productList];
    });
  }

  async deleteProduct(item: Product) {
    const alert = await this.AlertController.create({
      header: `PRECAUCIÓN!!!`,
      message: '¿Estás seguro de eliminar este producto?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'confirm',
          handler: () => {
            this.FirestoreService.deleteDoc(this.path, item.id)
              .then((res) => {
                this.ToastService.presentToast(
                  'Producto eliminado con éxito',
                  'checkmark-circle-outline',
                  'success-toast'
                );
              })
              .catch((err) => {
                this.ToastService.presentToast(
                  'Hubo un error, por favor intente de nuevo',
                  'close-circle-outline',
                  'danger-toast'
                );
              });
          },
        },
      ],
    });

    await alert.present();
  }

  HandleChange(e: any) {
    const query = e.target.value.toLowerCase();
    this.results = this.productList.filter(
      (r) => r.title.toLowerCase().indexOf(query) > -1
    );
  }

  goRoot() {
    this.navCtrl.navigateRoot('admin/products');
  }
}
