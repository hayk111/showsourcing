import { ERM, selectEntityById } from '~app/shared/entity';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap, takeUntil, map } from 'rxjs/operators';
import { Product } from '~app/features/products/models';
import { selectProductById, ProductActions } from '~products/store';
import { AutoUnsub } from '~utils';
import { Event } from '~events/models';
import { selectEventsList } from '~app/features/events';
import { FormDescriptor, FormControlDescriptor } from '~app/shared/_unused_/dynamic-forms';
import { selectCustomFields } from '~app/app-root/store/selectors/entities/custom-fields.selector';
import { Patch } from '~app/app-root/store/utils';

@Component({
	selector: 'product-general-info-app',
	templateUrl: './product-general-info.component.html',
	styleUrls: ['./product-general-info.component.scss'],
})
export class ProductGeneralInfoComponent extends AutoUnsub implements OnInit {
	product$: Observable<Product>;
	events$: Observable<Array<Event>>;
	customFields$: Observable<FormDescriptor>;

	categoryRep = ERM.categories;

	constructor(private route: ActivatedRoute, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		this.product$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => this.store.select(selectProductById(params.id)))
		);
		this.events$ = this.store.select(selectEventsList);
		this.customFields$ = this.store.select(
			selectEntityById({ entityId: 'productsCFDef', entityRepr: ERM.customFields })
		);

		this.customFields$.subscribe(d => {});
	}

	isEntityType(fieldType: string) {
		return ~['suppliers', 'categories', 'events', 'teamMembers'].indexOf(fieldType);
	}

	getFirstCol(fields: Array<FormControlDescriptor>) {
		const half = Math.ceil(fields.length / 2);
		return fields.slice(0, half);
	}

	getSecondCol(fields: Array<FormControlDescriptor>) {
		const half = Math.ceil(fields.length / 2);
		return fields.slice(half);
	}

	onUpdate(id: string, propName: string, value: any) {
		console.log(value);
		// this.store.dispatch(ProductActions.patch({ id, propName, value }));
	}

	onSupplierUpdate() {}
}
