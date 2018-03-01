import { Component, OnInit, Input } from '@angular/core';
import { entityRepresentationMap } from '~store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
import { Product } from '~products/models';
import { ProductActions } from '~products/store/actions';

@Component({
	selector: 'product-info-card-app',
	templateUrl: './product-info-card.component.html',
	styleUrls: ['./product-info-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfoCardComponent implements OnInit {
	@Input() product: Product;
	supplierRep = entityRepresentationMap.suppliers;
	categoryRep = entityRepresentationMap.categories;
	eventRep = entityRepresentationMap.events;

	constructor(private store: Store<any>) {}

	ngOnInit() {}

	onUpdate(field, value) {
		const patch = { id: this.product.id, propName: field, value };
		this.store.dispatch(ProductActions.patch(patch));
	}

	getPriceObject(product: Product) {
		if (!product.price) return {};
		else {
			const priceAmount = product.price.priceAmount;
			const priceCurrency = product.price.priceCurrency;
			return { priceAmount, priceCurrency, toString: () => priceAmount + ' ' + priceCurrency };
		}
	}
}
