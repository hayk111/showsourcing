import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-status-badge-app',
  templateUrl: './product-status-badge.component.html',
  styleUrls: ['./product-status-badge.component.scss']
})
export class ProductStatusBadgeComponent implements OnInit {
	@Input() status;
  constructor() { }

  ngOnInit() {
  }

}
