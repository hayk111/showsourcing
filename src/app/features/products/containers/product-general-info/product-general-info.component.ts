import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap, takeUntil, tap, map } from 'rxjs/operators';
import { FormDescriptor, CustomField } from '~shared/dynamic-forms'
import { UserService } from '~features/user';
import { Event } from '~models';
import { Product } from '~models';
import { Project, Tag } from '~models';
import { AutoUnsub } from '~utils';
import { ProductService } from '~features/products/services';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'product-general-info-app',
	templateUrl: './product-general-info.component.html',
	styleUrls: ['./product-general-info.component.scss'],
})
export class ProductGeneralInfoComponent extends AutoUnsub implements OnInit {
	product$: Observable<Product>;
	productId: string;
	descriptor$: Observable<FormDescriptor>;
	descriptor2$: Observable<FormDescriptor>;

	customFields: CustomField[] = [
		{ name: 'supplier', type: 'selector', metadata: { subtype: 'supplier' } },
		{ name: 'category', type: 'selector', metadata: { subtype: 'category' } },
		{ name: 'tags', type: 'selector', metadata: { subtype: 'tag' }, multiple: true },

		{ name: 'name', type: 'text', required: true, label: 'name' },
		// { name: 'price', type: 'price'},
		// { name: 'event', type: 'selector', metadata: { subtype: 'event' } },

		{ name: 'minimumOrderQuantity', type: 'number', label: 'MOQ' },
		{ name: 'moqDescription', type: 'text', label: 'MOQ description' },
		{ name: 'description', type: 'textarea', label: 'description' }
	];
	customFields2: CustomField[] = [
		// { name: 'harbour'},
		// { name: 'incoTerm'},
		// { name: 'innerCarton', type: 'packaging', label: 'inner carton' },
		// { name: 'masterCarton', type: 'packaging', label: 'master carton' },
		// { name: 'priceMatrix', type: 'priceMatrix', label: 'price matrix'},
		{ name: 'leadTimeValue', type: 'number', label: 'Lead time value' },
		{ name: 'leadTimeUnit', type: 'text', label: 'Lead time unit' }

	]

	constructor(private route: ActivatedRoute, private srv: ProductService) {
		super();
	}

	ngOnInit() {
		this.product$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => this.srv.selectById(params.id)),
			tap(product => this.productId = product.id)
		);
		// creating the form descriptor
		this.descriptor$ = this.product$.pipe(
			map(product => new FormDescriptor(this.customFields, product))
		);
		this.descriptor2$ = this.product$.pipe(
			map(product => new FormDescriptor(this.customFields2, product))
		);
	}

	/** when we receive back the form from the dynamic form component we subscribe to changes to it and
	 * update the product
	 */
	onFormCreated(form: FormGroup) {
		form.valueChanges
			.pipe(takeUntil(this._destroy$))
			.subscribe(product => this.updateProduct(product));
	}

	updateProduct(product: Product) {
		product.id = this.productId;
		this.srv.updateProduct(product)
			.pipe(takeUntil(this._destroy$))
			.subscribe();
	}

}
