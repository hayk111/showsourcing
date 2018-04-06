import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, takeUntil, filter, tap } from 'rxjs/operators';
import { AutoUnsub } from '~app/app-root/utils';
import {
	Patch, AppImage, fromImage, fromSupplier,
	Tag
} from '~entity';
import { Product, selectProducts } from '~product';
import { Supplier } from '~supplier';
import { fromTask, Task } from '~task';
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
			this.store.dispatch(fromSupplier.Actions.focus(id));
		});

		this.supplier$ = this.store.select(fromSupplier.selectFocussed).pipe(
			filter(d => !!d)),
			tap((supplier: Supplier) => this.supplierId = supplier.id);

		this.productsCount$ = this.store.select(fromSupplier.selectState).pipe(
			map(state => state.productsCount[state.focussed])
		);
		this.tasks$ = this.store.select(fromTask.selectArray);
		this.products$ = this.store.select<any>(selectProducts);
		this.images$ = this.store.select(fromImage.selectArray);
	}

	patch(patch: Patch) {
		this.store.dispatch(fromSupplier.Actions.patch(patch));
	}

	onTagAdded(tag: Tag) {
		this.store.dispatch(fromSupplier.Actions.addTag(tag, this.supplierId));
	}

	onTagRemoved(tag: Tag) {
		this.store.dispatch(fromSupplier.Actions.removeTag(tag, this.supplierId));
	}

	onTagCreated(tagName: string) {
		const tag = new Tag(tagName, this.userSrv.userId);
		this.store.dispatch(fromSupplier.Actions.createTag(tag, this.supplierId));
	}

	openNewContactDlg() {
		this.store.dispatch(DialogActions.open(DialogName.NEW_CONTACT));
	}
}
