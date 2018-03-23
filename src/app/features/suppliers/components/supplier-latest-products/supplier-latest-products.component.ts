import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-supplier-latest-products',
  templateUrl: './supplier-latest-products.component.html',
  styleUrls: ['./supplier-latest-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierLatestProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
