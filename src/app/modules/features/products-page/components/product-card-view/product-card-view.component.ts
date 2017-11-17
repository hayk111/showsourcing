import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card-view-app',
  templateUrl: './product-card-view.component.html',
  styleUrls: ['./product-card-view.component.scss']
})
export class ProductCardViewComponent implements OnInit {
	@Input() products = [];
  constructor() { }

  ngOnInit() {
  }

}
