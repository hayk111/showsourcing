import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { ProductService, RequestElementService, SupplierRequestService } from '~core/entity-services';
import { SelectionService } from '~core/list-page';
import { AppImage, EntityMetadata, ERM, ExtendedField, Price, Product, RequestElement, SupplierRequest, ReplyStatus } from '~core/models';
import { DialogService } from '~shared/dialog';
import { PricePipe } from '~shared/price/price.pipe';
import { AutoUnsub } from '~utils/auto-unsub.component';

import { ReplySentDlgComponent } from '../reply-sent-dlg/reply-sent-dlg.component';

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
	erm = ERM;

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
			this.cdr.markForCheck();
		});
	}

	acceptAll(type: EntityMetadata) {
		switch (type) {
			case ERM.IMAGE:
				this.selectionSrv.selectAll(this.element.reply.images as any);
				break;
			case ERM.EXTENDED_FIELD:
				this.selectionSrv.selectAll(this.element.reply.fields);
				break;
			case ERM.ATTACHMENT:
				this.selectionSrv.selectAll(this.element.reply.attachments as any);
				break;
		}
	}

	refuseAll(type: EntityMetadata) {
		switch (type) {
			case ERM.IMAGE:
				this.selectionSrv.unselectMany(this.element.reply.images as any);
				break;
			case ERM.EXTENDED_FIELD:
				this.selectionSrv.unselectMany(this.element.reply.fields);
				break;
			case ERM.ATTACHMENT:
				this.selectionSrv.unselectMany(this.element.reply.attachments as any);
				break;
		}
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
				currentValue = this.getPriceExtendedField(currentValue);
				supplierValue = this.getPriceExtendedField(field.value);
			}
		} else {
			// target will be something like Product.price, we only need price
			const property = target.split('.')[1];
			currentValue = this.product ? this.product[property] : '';
			supplierValue = field.value;
			if (property === 'price') {
				currentValue = this.getPrice(currentValue);
				supplierValue = this.getPriceExtendedField(field.value);
			}
		}
		return [currentValue, supplierValue];
	}


	getPrice(item: Price) {
		return this.appPricePipe.transform(item);
	}
	getPriceExtendedField(item: any) {
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
		this.selectionSrv.unselectAll();
		this.acceptAll(ERM.EXTENDED_FIELD);
		this.acceptAll(ERM.IMAGE);
		this.acceptAll(ERM.ATTACHMENT);

		if (!this.element) {
			throw Error(`no element at index ${this.selectedIndex} in array: ${this.elements.toString()}`);
		}
	}

	close() {
		this.dlgSrv.close();
	}

	openReplySentDlg() {
		this.dlgSrv.open(ReplySentDlgComponent);
	}

	acceptRequest() {
		let tempProduct = { id: this.product.id, images: this.product.images, extendedFields: this.product.extendedFields };
		this.selectionSrv.selection.forEach(item => {
			switch (item.__typename) {
				case 'Image':
					const newImage = new AppImage({ ...item });
					tempProduct = ({ ...tempProduct, images: [...tempProduct.images, { ...newImage }] });
					break;
				case 'ExtendedField':
					tempProduct = this.acceptExtendedField(item, tempProduct);
					break;
				default:
					throw Error(`__typename ${item.__typename} wasn't found`);
			}
		});
		this.productSrv.update(tempProduct).subscribe(_ =>
			this.requestSrv.update({ id: this.requestId, status: ReplyStatus.VALIDATED })
		);
		this.openReplySentDlg();
	}

	private acceptExtendedField(item, tempProduct) {
		// we check if we have to accept an extended field or a product attribute
		if (item.definition.target === 'Product.extendedFields')
			tempProduct = this.replaceProductExtendedField(item, tempProduct);
		else
			tempProduct = this.replaceProductAttribute(item, tempProduct);
		return tempProduct;
	}

	private replaceProductAttribute(item, tempProduct) {
		const property = item.definition.target.split('.')[1];
		// this switch case handles the exceptions when we have to convert a extended field string to a value like boolean or price
		switch (item.definition.type) {
			case 'price':
				tempProduct = ({ ...tempProduct, [property]: { ...JSON.parse(item.value) } });
				break;
			case 'boolean':
				const toBoolean = item.value === 'yes' ? true : false;
				tempProduct = ({ ...tempProduct, [property]: toBoolean });
				break;
			default:
				tempProduct = ({ ...tempProduct, [property]: item.value });
				break;
		}
		return tempProduct;
	}

	private replaceProductExtendedField(item, tempProduct) {
		// we find if the field exists already on the product
		let fieldToReplace = this.product.extendedFields.find(fld => fld.definition.id === item.definition.originId);
		// if the field already exists on the product, we update it
		if (fieldToReplace) {
			// we remove the field form the existent array, this way we have an array without the value
			// then we replace the field with the new value and add it to the array of extendedFields
			const extendedFieldsTrim = tempProduct.extendedFields.filter(field => fieldToReplace.id !== field.id);
			fieldToReplace = ({ ...fieldToReplace, value: item.value });
			tempProduct = ({ ...tempProduct, extendedFields: [...extendedFieldsTrim, { ...fieldToReplace }] });
		} else {
			// we create a new extended field with the id of the definition as the ORIGINID, important
			const newField = new ExtendedField({
				definition: { id: item.definition.originId },
				value: item.value
			});
			tempProduct = ({ ...tempProduct, extendedFields: [...tempProduct.extendedFields, { ...newField }] });
		}
		return tempProduct;
	}
}
