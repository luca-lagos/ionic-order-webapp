import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormComponent as ProductFormComponent } from './products/form/form.component';
import { ListComponent as ProductListComponent } from './products/list/list.component';
import { FormComponent as UserFormComponent } from './users/form/form.component';
import { ListComponent as UserListComponent } from './users/list/list.component';

@NgModule({
  declarations: [
    ProductFormComponent,
    ProductListComponent,
    UserFormComponent,
    UserListComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
