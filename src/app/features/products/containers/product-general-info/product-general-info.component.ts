import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap, takeUntil, map } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { Event } from '~event';
import { selectEventsList } from '~event';
import { FormDescriptor, FormControlDescriptor } from '~entity';
import { Patch } from '~entity/utils';
import { supplierActions } from '~supplier';
import { UserService } from '~app/features/user';
import { Project } from '~project';
import { Product, ERM, selectProductById, selectEntityById, Tag, productActions } from '~app/entity';

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

	categoryRep = ERM.category;

	constructor(private route: ActivatedRoute, private store: Store<any>, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		this.product$ = this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			switchMap(params => this.store.select(selectProductById(params.id)))
		);
		this.product$.pipe(takeUntil(this._destroy$)).subscribe(product => (this.productId = product.id));
		this.events$ = this.store.select(selectEventsList);
		this.customFields$ = this.store.select(
			selectEntityById({ entityId: 'productsCFDef', entityRepr: ERM.customField })
		);

		this.customFields$.subscribe(d => { });
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
		this.store.dispatch(productActions.patch({ id, propName, value }));
	}

	onSupplierUpdate(id: string, propName: string, value: any) {
		this.store.dispatch(supplierActions.patch({ id, propName, value }));
	}

	onTagAdded(tag: Tag) {
		this.store.dispatch(productActions.addTag(tag, this.productId));
	}

	onTagRemoved(tag: Tag) {
		this.store.dispatch(productActions.removeTag(tag, this.productId));
	}

	onProjectAdded(project: Project) {
		this.store.dispatch(productActions.addProject(project, this.productId));
	}

	onProjectRemoved(project: Project) {
		this.store.dispatch(productActions.removeProject(project, this.productId));
	}

	onTagCreated(id: string, tagName: string, currentTagIds: Array<string>) {
		const tag = new Tag(tagName, this.userSrv.userId);
		this.store.dispatch(productActions.createTag(tag, id));
	}
}
