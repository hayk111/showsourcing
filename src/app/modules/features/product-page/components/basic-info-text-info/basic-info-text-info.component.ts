import { Component, OnInit, Input } from '@angular/core';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';
import { Product } from '../../../../store/model/entities/product.model';
import { ProductActions } from '../../../../store/action/entities/product.action';

@Component({
	selector: 'basic-info-text-info-app',
	templateUrl: './basic-info-text-info.component.html',
	styleUrls: ['./basic-info-text-info.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasicInfoTextInfoComponent implements OnInit {
	@Input() product: Product;
	supplierRep = entityRepresentationMap.suppliers;
	categoryRep = entityRepresentationMap.categories;
	eventRep = entityRepresentationMap.events;

	constructor(private store: Store<any>) { }

	ngOnInit() {
	}

	onUpdate(field, value) {
		this.store.dispatch(ProductActions.patch(this.product.id, field, value));
	}

	getPriceObject(product: Product) {
		if (!product.price)
			return {};
		else {
			const priceAmount = product.price.priceAmount;
			const priceCurrency = product.price.priceCurrency;
			return { priceAmount, priceCurrency, toString: () => priceAmount + ' ' + priceCurrency };
		}

	}

}
