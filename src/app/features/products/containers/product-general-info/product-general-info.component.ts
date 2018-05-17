import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { ERM, FormControlDescriptor, FormDescriptor, selectEntityById } from '~app/entity';
import { UserService } from '~app/features/user';
import { Event } from '~models';
import { Product } from '~models';
import { Project, Tag } from '~models';
import { AutoUnsub } from '~utils';

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
		// this.product$ = this.route.parent.params.pipe(
		// 	takeUntil(this._destroy$),
		// 	switchMap(params => this.store.select(selectOneProduct(params.id)))
		// );
		// this.product$.pipe(takeUntil(this._destroy$)).subscribe(product => (this.productId = product.id));
		// this.customFields$ = this.store.select(
		// 	selectEntityById({ entityId: 'productsCFDef', entityRepr: ERM.customField })
		// );

		// this.customFields$.subscribe(d => { });
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
