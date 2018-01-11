import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../../../store/model/product.model';
import { entityRepresentationMap } from '../../../../store/utils/entities.utils';
import { Store } from '@ngrx/store';
import { ProductActions } from '../../../../store/action/product.action';

@Component({
	selector: 'basic-info-text-info-app',
	templateUrl: './basic-info-text-info.component.html',
	styleUrls: ['./basic-info-text-info.component.scss']
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
		const priceAmount = product.priceAmount;
		const priceCurrency = product.priceCurrency;
	}

}
