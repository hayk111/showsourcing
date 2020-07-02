import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product, Supplier, Sample } from '~core/erm3';
import { api } from 'lib';
import { Price } from '../../../../../../core/erm/models/price.model';

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
		this.samplesCount$ = api.Product.samples(this.product.id).count$;
		this.tasksCount$ = api.Product.tasks(this.product.id).count$;
		this.commentsCount$ = api.Product.comments(this.product.id).count$;
	}

	update(value: any, prop: string) {
		console.log('ProductSubHeaderDetailsComponent -> update -> value', value);
		console.log('ProductSubHeaderDetailsComponent -> update -> prop----------', prop);
		this.updated.emit({ id: this.product.id, [prop + 'Id']: value[prop + 'Id'] });
	}

	updatePriceMOQ(value: Partial<Price>, field: string) {
		console.log('ProductSubHeaderDetailsComponent -> updatePriceMOQ -> value', value);
		const val = value.value;
		// console.log('ProductSubHeaderDetailsComponent -> updatePriceMOQ -> value, currency, moq', value, currency, moq);
		const currency = value.currency || 'USD';
		const price =  {
			...(val && field !== 'minimumOrderQuantity' && { value: val }),
			...(field !== 'minimumOrderQuantity' && { currency }),
			...(field === 'minimumOrderQuantity' && { minimumOrderQuantity: value }),
		};
		console.log('ProductSubHeaderDetailsComponent -> updatePriceMOQ -> price', price);

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
