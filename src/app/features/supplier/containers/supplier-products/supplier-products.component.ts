import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-supplier-products',
  templateUrl: './supplier-products.component.html',
  styleUrls: ['./supplier-products.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierProductsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
