import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'supplier-products-card-view-app',
	templateUrl: './supplier-products-card-view.component.html',
	styleUrls: ['./supplier-products-card-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierProductsCardViewComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
