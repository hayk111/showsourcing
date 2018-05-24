import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
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
	events$: Observable<Array<Event>>;
	customFields$: Observable<FormDescriptor>;
	productId: string;

	constructor(private route: ActivatedRoute, private srv: ProductService) {
		super();
	}

	ngOnInit() {
		this.product$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => this.srv.selectById(params.id))
		);
	}


	getFirstCol(fields: CustomField[]) {
		const half = Math.ceil(fields.length / 2);
		return fields.slice(0, half);
	}

	getSecondCol(fields: CustomField[]) {
		const half = Math.ceil(fields.length / 2);
		return fields.slice(half);
	}

	onUpdate(id: string, propName: string, value: any) {
		// this.store.dispatch(productActions.patch({ id, propName, value }));
	}

	onSupplierUpdate(id: string, propName: string, value: any) {
		// this.store.dispatch(fromSupplier.Actions.patch({ id, propName, value }));
	}

	onTagAdded(tag: Tag) {
		// this.store.dispatch(productActions.addTag(tag, this.productId));
	}

	onTagRemoved(tag: Tag) {
		// this.store.dispatch(productActions.removeTag(tag, this.productId));
	}

	onTagCreated(id: string, name: string, currentTagIds: Array<string>) {
		const tag = new Tag({ name });
		// this.store.dispatch(productActions.createTag(tag, id));
	}

	onProjectAdded(project: Project) {
		// this.store.dispatch(productActions.addProject(project, this.productId));
	}

	onProjectRemoved(project: Project) {
		// this.store.dispatch(productActions.removeProject(project, this.productId));
	}

}
