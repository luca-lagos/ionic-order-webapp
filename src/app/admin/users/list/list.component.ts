import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from 'src/app/models/model';
import { AlertController, NavController } from '@ionic/angular';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  userList: User[] = [];

  private path = 'User/';

  public results: User[] = [];

  public list: any = [];

  private showUsers: number = 3;

  constructor(
    public FirestoreService: FirestoreService,
    private AlertController: AlertController,
    private navCtrl: NavController,
    private ToastService: ToastService
  ) {}

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.FirestoreService.getAllDocs<User>(this.path).subscribe((res) => {
      this.userList = res;
      this.results = [...this.userList];
      /* this.list = this.results.slice(0, this.showProducts);*/
      this.list = this.results;
    });
  }

  async deleteUser(item: User) {
    const alert = await this.AlertController.create({
      header: `PRECAUCIÓN!!!`,
      message: '¿Estás seguro de eliminar este usuario?',
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
                  'Usuario eliminado con éxito',
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
    this.list = this.userList.filter(
      (r) =>
        r.name.toLowerCase().indexOf(query) > -1 ||
        r.lastname.toLowerCase().indexOf(query) > -1 ||
        r.email.toLowerCase().indexOf(query) > -1 ||
        r.toString().toLowerCase().indexOf(query) > -1 ||
        r.type.toLowerCase().indexOf(query) > -1 ||
        r.des_location.toLowerCase().indexOf(query) > -1
    );
  }

  loadData(e: any) {
    setTimeout(() => {
      this.showUsers += 3;
      this.list = this.results.slice(0, this.showUsers);
      e.target.complete();
      if (
        this.list[this.list.length - 1].id ===
        this.userList[this.userList.length - 1].id
      ) {
        e.target.disabled = true;
      }
    }, 500);
  }

  goRoot() {
    this.navCtrl.navigateRoot('admin/users');
  }
}
