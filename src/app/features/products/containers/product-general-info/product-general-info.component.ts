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

@Component({
	selector: 'product-general-info-app',
	templateUrl: './product-general-info.component.html',
	styleUrls: ['./product-general-info.component.scss'],
})
export class ProductGeneralInfoComponent extends AutoUnsub implements OnInit {
	product$: Observable<Product>;
	descriptor$: Observable<FormDescriptor>;

	customFields: CustomField[] = [
		// { name: 'supplier', type: 'selector'},
		{ name: 'name', type: 'text', required: true, label: 'name' },
		// { name: 'price', type: 'price'},
		{ name: 'minimumOrderQuantity', type: 'number', label: 'MOQ' },
		{ name: 'moqDescription', type: 'text', label: 'MOQ description' },
		{ name: 'description', type: 'textarea', label: 'description' }
	]

	constructor(private route: ActivatedRoute, private srv: ProductService) {
		super();
	}

	ngOnInit() {
		this.product$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => this.srv.selectById(params.id)),
		);
		this.descriptor$ = this.product$.pipe(
			map(product => new FormDescriptor(this.customFields, product))
		);
	}


	// getFirstCol(fields: CustomField[]) {
	// 	const half = Math.ceil(fields.length / 2);
	// 	return fields.slice(0, half);
	// }

	// getSecondCol(fields: CustomField[]) {
	// 	const half = Math.ceil(fields.length / 2);
	// 	return fields.slice(half);
	// }


}
