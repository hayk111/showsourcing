import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Product, ProductConfig, ERM } from '~models';
import { Observable, ReplaySubject } from 'rxjs';
import { FormDescriptor, CustomField } from '~shared/dynamic-forms';
import { FormGroup } from '@angular/forms';
import { AutoUnsub, debug } from '~utils';
import { takeUntil, distinctUntilChanged, map, tap } from 'rxjs/operators';
import { ProductFeatureService } from '~features/products/services';

@Component({
	selector: 'product-preview-app',
	templateUrl: './product-preview.component.html',
	styleUrls: ['./product-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductPreviewComponent extends AutoUnsub implements OnInit {
	/** This is the product passed as input, but it's not yet fully loaded */
	@Input() product: Product;
	@Output() close = new EventEmitter<any>();
	descriptor$ = new ReplaySubject<FormDescriptor>(1);
	descriptor2$ = new ReplaySubject<FormDescriptor>(1);
	/** this is the fully loaded product */
	product$: Observable<Product>;
	erm = ERM.PRODUCT;

	// those are the custom fields for the first form section
	// ultimately "sections" should be added to the form descriptor
	// so we only have one array of custom fields
	customFields: CustomField[] = [
		{ name: 'supplier', type: 'selector', metadata: { target: 'supplier', type: 'entity', labelName: 'name', canCreate: true } },
		{ name: 'category', type: 'selector', metadata: { target: 'category', type: 'entity', labelName: 'name', canCreate: true } },
		{ name: 'name', type: 'text', required: true, label: 'name' },
		{ name: 'price', type: 'price' },
		{ name: 'createdBy', type: 'selector', metadata: { target: 'user', type: 'entity', labelName: 'name' } },
		{
			name: 'createdBy', label: 'Assignee', type: 'selector', metadata:
				{ target: 'user', type: 'entity', labelName: 'name' }
		},
		{ name: 'minimumOrderQuantity', type: 'number', label: 'MOQ' },
		{ name: 'moqDescription', type: 'text', label: 'MOQ description' },
		{
			name: 'event', label: 'Found at', type: 'selector',
			metadata: { target: 'event', type: 'entity', labelName: 'alias', canCreate: true }
		},
		{ name: 'tags', type: 'selector', metadata: { target: 'tag', type: 'entity', labelName: 'name', canCreate: true }, multiple: true },
		{ name: 'description', type: 'textarea', label: 'description' },
	];

	// those are the custom field for the second form section
	customFields2: CustomField[] = [
		{ name: 'innerCarton', type: 'packaging', label: 'inner carton' },
		{ name: 'masterCarton', type: 'packaging', label: 'master carton' },
		// { name: 'samplePrice', type: 'number', label: 'Sample Price' },
		{ name: 'priceMatrix', type: 'priceMatrix', label: 'price matrix' },
		{ name: 'sample', type: 'yesNo' },
		{ name: 'samplePrice', type: 'number', label: 'Sample Price' },
	];

	constructor(private featureSrv: ProductFeatureService) {
		super();
	}

	ngOnInit() {
		// creating the form descriptor
		this.product$ = this.featureSrv.selectOne(this.product.id);
		this.product$.pipe(
			takeUntil(this._destroy$),
			map(product => new FormDescriptor(this.customFields, product)),
		).subscribe(this.descriptor$);
		this.product$.pipe(
			takeUntil(this._destroy$),
			map(product => new FormDescriptor(this.customFields2, product))
		).subscribe(this.descriptor2$);
	}

	/** when we receive back the form from the dynamic form component we subscribe to changes to it and
	 * update the product
	 */
	onFormCreated(form: FormGroup) {
		form.valueChanges
			.pipe(
				takeUntil(this._destroy$),
				distinctUntilChanged()
			)
			.subscribe(product => this.updateProduct(product));
	}

	updateProduct(product: any) {
		return this.featureSrv.update({ id: this.product.id, ...product }).subscribe();
	}

}
