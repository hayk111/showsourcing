import { ERM, selectEntityById } from '~app/shared/entity';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap, takeUntil, map } from 'rxjs/operators';
import { Product } from '~app/features/products/models';
import { selectProductById, productActions } from '~products/store';
import { AutoUnsub } from '~utils';
import { Event } from '~events/models';
import { selectEventsList } from '~app/features/events';
import { FormDescriptor, FormControlDescriptor } from '~app/shared/_unused_/dynamic-forms';
import { selectCustomFields } from '~app/app-root/store/selectors/entities/custom-fields.selector';
import { Patch } from '~entity/utils';
import { supplierActions } from '~app/features/suppliers';
import { Tag } from '~app/app-root/store';
import { UserService } from '~app/features/user';
import { tagActions } from '~app/app-root/store/action';
import { Project } from '~app/features/projects';

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

	categoryRep = ERM.categories;

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
			selectEntityById({ entityId: 'productsCFDef', entityRepr: ERM.customFields })
		);

		this.customFields$.subscribe(d => {});
	}

	isEntityType(fieldType: string) {
		return ~[
			'suppliers',
			'categories',
			'events',
			'teamMembers',
			'tags',
			'projects',
			'productStatus',
			'currencies',
			'incoTerms',
			'harbours',
		].indexOf(fieldType);
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
		debugger;
		const tag = new Tag(tagName, this.userSrv.userId);
		this.store.dispatch(productActions.createTag(tag, id));
	}
}
