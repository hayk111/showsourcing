import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProductService, RequestElementService, SupplierRequestService } from '~core/entity-services';
import { ExtendedField, Product, RequestElement, SupplierRequest, AppImage } from '~core/models';
import { PricePipe } from '~shared/price/price.pipe';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { SelectionService } from '~core/list-page';
import { DialogService } from '~shared/dialog';

@Component({
	selector: 'review-request-reply-dlg-app',
	templateUrl: './review-request-reply-dlg.component.html',
	styleUrls: ['./review-request-reply-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewRequestReplyDlgComponent extends AutoUnsub implements OnInit {
	@Input() elementId: string;
	@Input() requestId: string;
	@Input() selectedIndex = 0;
	request$: Observable<SupplierRequest>;
	request: SupplierRequest;
	element: RequestElement;
	elements: RequestElement[] = [];
	product: Product;
	product$: Observable<Product>;

	constructor(
		private productSrv: ProductService,
		private requestSrv: SupplierRequestService,
		private elementSrv: RequestElementService,
		private appPricePipe: PricePipe,
		private cdr: ChangeDetectorRef,
		public selectionSrv: SelectionService,
		private dlgSrv: DialogService
	) {
		super();
	}

	ngOnInit() {
		this.product$ = this.elementSrv.queryOne(this.elementId).pipe(
			switchMap((element: RequestElement) => this.productSrv.queryOne(element.targetId)),
			takeUntil(this._destroy$)
		);
		this.product$.subscribe(product => {
			this.product = product;
			this.cdr.markForCheck();
		});

		this.request$ = this.requestSrv.selectOne(this.requestId);
		this.request$.pipe(
			tap(request => this.request = request),
			takeUntil(this._destroy$)
		).subscribe(_ => {
			this.setElement();
			this.acceptAllFields();
			this.acceptAllImages();
			this.cdr.markForCheck();
		});
	}

	acceptAllImages() {
		this.selectionSrv.selectAll(this.element.reply.images as any);
	}

	refuseAllImages() {
		this.selectionSrv.unselectMany(this.element.reply.images as any);
	}

	acceptAllFields() {
		this.selectionSrv.selectAll(this.element.reply.fields);
	}

	refuseAllFields() {
		this.selectionSrv.unselectMany(this.element.reply.fields);
	}

	/**
	 * So we receive a set of fields in the reply.
	 * We need to display the product value and the field value
	 * Said value can be either on the product or product.extendedField
	 */
	getValues(field: ExtendedField) {

		const target = field.definition.target;
		const isProductExtendedField = field.definition.target === 'Product.extendedFields';
		let currentValue, supplierValue;
		if (isProductExtendedField) {
			const originId = field.definition.originId;
			const currentField = this.product ? this.product.extendedFields.find(fld => fld.definition.id === originId) : '';
			currentValue = currentField ? currentField.value : '';
			supplierValue = field.value;
			if (field.definition.type === 'price') {
				currentValue = this.getPrice(currentValue);
				supplierValue = this.getPrice(field.value);
			}
		} else {
			// target will be something like Product.price, we only need price
			const property = target.split('.')[1];
			currentValue = this.product ? this.product[property] : '';
			supplierValue = field.value;
			if (property === 'price') {
				currentValue = this.getPrice(currentValue);
				supplierValue = this.getPrice(field.value);
			}
		}
		return [currentValue, supplierValue];
	}


	getPrice(item: any) {
		return item ? this.appPricePipe.transform(JSON.parse(item)) : undefined;
	}

	next() {
		this.selectedIndex = (this.selectedIndex + 1) % (this.elements.length);
		this.setElement();
	}

	back() {
		this.selectedIndex = this.selectedIndex - 1 >= 0 ? this.selectedIndex - 1 : this.elements.length - 1;
		this.setElement();
	}

	private setElement() {
		this.elements = this.request.requestElements;
		this.element = this.elements[this.selectedIndex];

		if (!this.element) {
			throw Error(`no element at index ${this.selectedIndex} in array: ${this.elements.toString()}`);
		}
	}

	acceptRequest() {
		let tempProduct = { id: this.product.id, images: this.product.images, extendedFields: this.product.extendedFields };
		this.selectionSrv.selection.forEach(item => {
			// if its image
			if (item.__typename === 'Image') {
				// tempProduct = ({ ...tempProduct, images: [...tempProduct.images, { ...item }] });
				// if its extended field
			} else if (item.__typename === 'ExtendedField') {
				if (item.definition.target === 'Product.extendedFields') {
					let fieldReplace = this.product.extendedFields.find(fld => fld.definition.id === item.definition.id);
					fieldReplace = ({ ...fieldReplace, value: item.value });
					tempProduct = ({ ...tempProduct, extendedFields: [...tempProduct.extendedFields, { ...fieldReplace }] });
				} else {
					const property = item.definition.target.split('.')[1];
					if (property === 'price')
						tempProduct = ({ ...tempProduct, [property]: { ...JSON.parse(item.value) } });
					else
						tempProduct = ({ ...tempProduct, [property]: item.value });
				}
			}
		});
		// this.productSrv.update(tempProduct).subscribe();
		// this.dlgSrv.close();
	}

}
