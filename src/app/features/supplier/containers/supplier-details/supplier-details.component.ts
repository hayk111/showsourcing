import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, takeUntil, filter } from 'rxjs/operators';
import { AutoUnsub } from '~app/app-root/utils';
import {
	Patch, AppImage, fromImage, selectSupplierFocussed,
	selectSupplierProductsCountForFocussed,
	Tag
} from '~entity';
import { Product, selectProducts } from '~product';
import { Supplier, supplierActions } from '~supplier';
import { selectTasks, Task } from '~task';
import { DialogActions, DialogName } from '~app/shared/dialog';
import { UserService } from '~app/features/user';

@Component({
	selector: 'supplier-details-app',
	templateUrl: './supplier-details.component.html',
	styleUrls: ['./supplier-details.component.scss'],
})
export class SupplierDetailsComponent extends AutoUnsub implements OnInit {
	supplier$: Observable<Supplier>;
	productsCount$: Observable<number>;
	tasks$: Observable<Array<Task>>;
	products$: Observable<Array<Product>>;
	images$: Observable<Array<AppImage>>;
	supplierId: string;
	// this is put in container because it will access the store
	constructor(private route: ActivatedRoute, private store: Store<any>, private userSrv: UserService) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.params.pipe(takeUntil(this._destroy$), map(params => params.id));
		id$.subscribe(id => {
			this.store.dispatch(supplierActions.focus(id));
			this.store.dispatch(supplierActions.loadProductCount());
		});

		this.supplier$ = this.store.select(selectSupplierFocussed);
		this.supplier$.pipe(takeUntil(this._destroy$), filter(d => !!d)).subscribe(supplier => this.supplierId = supplier.id);
		this.productsCount$ = id$.pipe(switchMap(id => this.store.select(selectSupplierProductsCountForFocussed(id))));
		this.tasks$ = this.store.select(selectTasks);
		this.products$ = this.store.select<any>(selectProducts);
		this.images$ = this.store.select(fromImage.selectArray);
	}

	patch(patch: Patch) {
		this.store.dispatch(supplierActions.patch(patch));
	}

	onTagAdded(tag: Tag) {
		this.store.dispatch(supplierActions.addTag(tag, this.supplierId));
	}

	onTagRemoved(tag: Tag) {
		this.store.dispatch(supplierActions.removeTag(tag, this.supplierId));
	}

	onTagCreated(tagName: string) {
		const tag = new Tag(tagName, this.userSrv.userId);
		this.store.dispatch(supplierActions.createTag(tag, this.supplierId));
	}

	openNewContactDlg() {
		this.store.dispatch(DialogActions.open(DialogName.NEW_CONTACT));
	}
}
