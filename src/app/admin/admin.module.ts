import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormComponent as ProductFormComponent } from './products/form/form.component';
import { ListComponent as ProductListComponent } from './products/list/list.component';

@NgModule({
  declarations: [ProductFormComponent, ProductListComponent],
  imports: [RouterModule,CommonModule, IonicModule],
})
export class AdminModule {}
