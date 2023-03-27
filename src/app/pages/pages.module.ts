import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { EditComponent as ProfileEditComponent } from './my-profile/edit/edit.component';
import { InfoComponent as ProfileInfoComponent } from './my-profile/info/info.component';
import { OrderComponent as ProfileOrderComponent } from './my-profile/order/order.component';

@NgModule({
  declarations: [
    HomeComponent,
    ProfileInfoComponent,
    ProfileEditComponent,
    ProfileOrderComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PagesModule {}
