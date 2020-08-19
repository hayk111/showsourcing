import { Observable } from 'rxjs';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { api, Product, Supplier, ProductTag } from 'showsourcing-api-lib';
import { Price } from '~core/erm3';
import { updateProductPriceMOQ } from '~utils/price.utils';
import { first, switchMap, map, takeUntil } from 'rxjs/operators';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'product-sub-header-details-app',
	templateUrl: './product-sub-header-details.component.html',
	styleUrls: ['./product-sub-header-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSubHeaderDetailsComponent extends AutoUnsub implements OnInit {
	@Input() product: Product;
	@Output() updated = new EventEmitter<Product>();
	@Output() redirect = new EventEmitter<string>();
	@Output() ratingClicked = new EventEmitter<undefined>();
	@Output() openSupplier = new EventEmitter<Supplier>();

	price: Price;
	productTags: ProductTag[];

	samplesCount$: Observable<number>;
	tasksCount$: Observable<number>;
	commentsCount$: Observable<number>;

	supplierSelectorHovered = false;

	constructor(
		private cdr: ChangeDetectorRef,
	) { super(); }

	ngOnInit() {
		api.ProductTag.find$({
			filter: { property: 'product', isString: this.product.id },
		}).data$
			.pipe(
				takeUntil(this._destroy$),
				map((productTags: ProductTag[]) => productTags.map(productTag => productTag.tag))
			)
			.subscribe(tags => {
				this.productTags = [...tags] as ProductTag[];
			});

		this.price = this.product.propertiesMap.price ? this.product.propertiesMap.price : undefined;
		this.samplesCount$ = api.Sample.findByProduct$(this.product.id).count$;
		this.tasksCount$ = api.Task.findByProduct$(this.product.id).count$;
		this.commentsCount$ = api.Comment.findByNodeId$('Product:' + this.product.id).count$;
	}

	updatePriceMoq(priceVal: Partial<Price>, type: 'price' | 'moq') {
		const newVal = type === 'moq' ? { minimumOrderQuantity: priceVal } : priceVal;
		updateProductPriceMOQ(this.price, newVal as any, type, this.product.id)
			.pipe(
				first(),
				takeUntil(this._destroy$)
			)
			.subscribe((updatedProducts: Product[]) => {
				if (updatedProducts.length && updatedProducts[0].propertiesMap) {
					this.price = updatedProducts[0].propertiesMap.price;
				}
			});
	}

	update(value: any, prop: string) {
		this.updated.emit({ [prop]: value });
	}

	onOpenSupplier(supplier: Supplier, event: MouseEvent) {
		// we stop the propagation of the click so the editable container is not opened
		event.stopImmediatePropagation();
		this.openSupplier.emit(supplier);
	}

	getCount(count: number, str: string) {
		return count === 1 ? count + ' ' + str : count + ' ' + str + 's';
	}

}
