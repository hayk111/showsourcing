import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { RequestReply, RequestElement, ExtendedField, Product } from '~core/models';
import { Observable } from 'rxjs';
import { RequestElementService, ProductService } from '~core/entity-services';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { AutoUnsub } from '~utils/auto-unsub.component';

@Component({
	selector: 'app-review-request-reply-dlg',
	templateUrl: './review-request-reply-dlg.component.html',
	styleUrls: ['./review-request-reply-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewRequestReplyDlgComponent extends AutoUnsub implements OnInit {
	@Input() elementId: string;
	element$: Observable<RequestElement>;
	product: Product;

	constructor(
		private productSrv: ProductService,
		private elementSrv: RequestElementService
	) {
		super();
	}

	ngOnInit() {
		this.element$ = this.elementSrv.queryOne(this.elementId);
		this.element$.pipe(
			switchMap((element: RequestElement) => this.productSrv.queryOne(element.targetId)),
			takeUntil(this._destroy$)
		).subscribe(product => this.product = product);
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
		let currentValue;
		if (isProductExtendedField) {
			const originId = field.definition.originId;
			const currentField = this.product.extendedFields.find(fld => fld.definition.id === originId);
			currentValue = currentField ? currentField.value : '-';
		} else {
			// target will be something like Product.price, we only need price
			const property = target.split('.')[1];
			currentValue = this.product[property];
		}
		return [currentValue, field.value];
	}

}
