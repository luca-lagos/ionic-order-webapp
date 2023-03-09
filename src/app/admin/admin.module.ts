import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormComponent as ProductFormComponent } from './products/form/form.component';
import { ListComponent as ProductListComponent } from './products/list/list.component';

@NgModule({
  declarations: [ProductFormComponent, ProductListComponent],
  imports: [
    RouterModule,
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    ReactiveFormsModule,
    ScrollingModule
  ],
})
export class AdminModule {}
