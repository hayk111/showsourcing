import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { api, Product, Supplier } from 'lib';
import { Price } from '~core/erm3';

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

	samplesCount$: Observable<number>;
	tasksCount$: Observable<number>;
	commentsCount$: Observable<number>;

	constructor() { }

	ngOnInit() {
		this.samplesCount$ = api.Sample.findByProduct(this.product.id).count$;
		this.tasksCount$ = api.Task.findByProduct(this.product.id).count$;
		// this.commentsCount$ = api.Product.comments(this.product.id).count$;
	}

	update(value: any, prop: string) {
		if (prop === 'name') {
			this.updated.emit({ id: this.product.id, [prop]: value });
		} else {
			this.updated.emit({ id: this.product.id, [prop]: value });
		}
	}

	updatePriceMOQ(value: Partial<Price>, field: 'price' | 'moq') {
		const val = value.value;
		// console.log('ProductSubHeaderDetailsComponent -> updatePriceMOQ -> value, currency, moq', value, currency, moq);
		const currency = value.currency || 'USD';
		const price =  {
			...this.product.propertiesMap.price,
			...(val && field !== 'moq' && { value: val }),
			...(field !== 'moq' && { currency }),
			...(field === 'moq' && { minimumOrderQuantity: value }),
		};

		api.Product.update([{
			id: this.product.id,
			propertiesMap: {
				price
			}
		}]).subscribe(updated => {
			console.log('ProductsTableComponent -> updatePrice -> updated', updated);
		});
	}

	onOpenSupplier(supplier: Supplier, event: MouseEvent) {
		// we stop the propagation of the click so the editable container is not opened
		event.stopImmediatePropagation();
		this.openSupplier.emit(supplier);
	}

}
