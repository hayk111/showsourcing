import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProductService, RequestElementService, SupplierRequestService } from '~core/entity-services';
import { ExtendedField, Product, RequestElement, SupplierRequest } from '~core/models';
import { AutoUnsub } from '~utils/auto-unsub.component';
import { PricePipe } from '~shared/price/price.pipe';

@Component({
	selector: 'app-review-request-reply-dlg',
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

	constructor(
		private productSrv: ProductService,
		private requestSrv: SupplierRequestService,
		private elementSrv: RequestElementService,
		private appPricePipe: PricePipe
	) {
		super();
	}

	ngOnInit() {
		this.elementSrv.queryOne(this.elementId).pipe(
			switchMap((element: RequestElement) => this.productSrv.queryOne(element.targetId)),
			takeUntil(this._destroy$)
		).subscribe(product => this.product = product);

		this.request$ = this.requestSrv.selectOne(this.requestId);
		this.request$.pipe(
			tap(request => this.request = request),
			takeUntil(this._destroy$)
		).subscribe(_ => this.setElement());
	}

	/**
	 * So we receive a set of fields in the reply.
	 * We need to display the product value and the field value
	 * Said value can be either on the product or product.extendedField
	 */
	getValues(field: ExtendedField) {
		// TODO: transform values like price. USE a PricePipe !!! you can use it dynamically in here

		const target = field.definition.target;
		const isProductExtendedField = field.definition.target === 'Product.extendedFields';
		// if (isProductExtendedField)
		// 	debugger;
		let currentValue, supplierValue;
		if (isProductExtendedField) {
			const originId = field.definition.originId;
			const currentField = this.product.extendedFields.find(fld => fld.definition.id === originId);
			currentValue = currentField ? currentField.value : '-';
			supplierValue = field.value;
			if (field.definition.type === 'price') {
				currentValue = this.getPrice(currentValue);
				supplierValue = this.getPrice(field.value);
			}
		} else {
			// target will be something like Product.price, we only need price
			const property = target.split('.')[1];
			currentValue = this.product[property];
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

}
