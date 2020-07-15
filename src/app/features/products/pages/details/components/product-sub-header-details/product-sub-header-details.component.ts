import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { api, Product, Supplier } from 'lib';
import { Price } from '~core/erm3';
import { updateProductPriceMOQ } from '~utils/price.utils';
import { first } from 'rxjs/operators';

@Component({
	selector: 'product-sub-header-details-app',
	templateUrl: './product-sub-header-details.component.html',
	styleUrls: ['./product-sub-header-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSubHeaderDetailsComponent implements OnInit {
	@Input() product: Product;
	@Output() updated = new EventEmitter<Product>();
	@Output() redirect = new EventEmitter<string>();
	@Output() ratingClicked = new EventEmitter<undefined>();
	@Output() openSupplier = new EventEmitter<Supplier>();

	price: Price;

	samplesCount$: Observable<number>;
	tasksCount$: Observable<number>;
	commentsCount$: Observable<number>;

	constructor() { }

	ngOnInit() {
		this.price = this.product.propertiesMap.price ? this.product.propertiesMap.price : undefined;
		this.samplesCount$ = api.Sample.findByProduct(this.product.id).count$;
		this.tasksCount$ = api.Task.findByProduct(this.product.id).count$;
		// this.commentsCount$ = api.Product.comments(this.product.id).count$;
	}

	updatePriceMoq(priceVal: Partial<Price>, type: 'price' | 'moq') {
		const newVal = type === 'moq' ? { minimumOrderQuantity: priceVal } : priceVal;
		updateProductPriceMOQ(this.price, newVal as any, type, this.product.id)
			.pipe(first())
			.subscribe((updatedProducts: Product[]) => {
				this.price = updatedProducts.length && updatedProducts[0].propertiesMap
					? updatedProducts[0].propertiesMap.price
					: undefined;
			});
	}

	update(value: any, prop: string) {
		if (prop === 'name') {
			this.updated.emit({ id: this.product.id, [prop]: value });
		} else {
			this.updated.emit({ id: this.product.id, [prop]: value });
		}
	}

	onOpenSupplier(supplier: Supplier, event: MouseEvent) {
		// we stop the propagation of the click so the editable container is not opened
		event.stopImmediatePropagation();
		this.openSupplier.emit(supplier);
	}

}
