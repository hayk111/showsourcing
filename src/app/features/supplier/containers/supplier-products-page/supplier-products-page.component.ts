import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'supplier-products-page-app',
	templateUrl: './supplier-products-page.component.html',
	styleUrls: ['./supplier-products-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierProductsPageComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
