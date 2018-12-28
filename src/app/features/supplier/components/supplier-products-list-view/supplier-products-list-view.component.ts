import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'supplier-products-list-view-app',
	templateUrl: './supplier-products-list-view.component.html',
	styleUrls: ['./supplier-products-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierProductsListViewComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
