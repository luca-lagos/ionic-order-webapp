import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/services/firestore.service';
import { Product } from 'src/app/models/model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  productList: Product[] = [];

  private path = 'Product/';

  public results = [...this.productList];

  constructor(public FirestoreService: FirestoreService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.FirestoreService.getAllDocs<Product>(this.path).subscribe((res) => {
      this.productList = res;
    });
  }

  HandleChange(e: any) {
    const query = e.target.value.toLowerCase();
    this.results = this.productList.filter(
      (r) => r.title.toLowerCase().indexOf(query) > -1
    );
  }
}
