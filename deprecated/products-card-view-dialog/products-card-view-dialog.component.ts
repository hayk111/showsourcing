import { Component } from '@angular/core';
import { EntityTableComponent } from '~core/list-page/entity-table.component';
import { Product } from '~models';


@Component({
	selector: 'products-card-view-dialog-app',
	templateUrl: './products-card-view-dialog.component.html',
	styleUrls: ['./products-card-view-dialog.component.scss'],
})
export class ProductsCardViewDialogComponent extends EntityTableComponent<Product> {

	constructor() {
		super();
	}

	isSelected(product) {
		if (this.selection)
			return this.selection.has(product.id);

		throw Error(`Selection Input is undefined`);
	}

}
