import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { takeUntil, map, switchMap } from 'rxjs/operators';
import { AutoUnsub } from '~app/app-root/utils';
import { Supplier } from '~app/features/suppliers/models';
import {
	selectSupplierProductsCountForId,
	selectSupplierSelected,
	supplierActions,
} from '~app/features/suppliers/store';
import { Patch } from '~app/shared/entity';
import { selectTasks, Task } from '~app/features/tasks';

@Component({
	selector: 'supplier-details-app',
	templateUrl: './supplier-details.component.html',
	styleUrls: ['./supplier-details.component.scss'],
})
export class SupplierDetailsComponent extends AutoUnsub implements OnInit {
	supplier$: Observable<Supplier>;
	productsCount$: Observable<number>;
	tasks$: Observable<Array<Task>>;
	// this is put in container because it will access the store
	constructor(private route: ActivatedRoute, private store: Store<any>) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.params.pipe(takeUntil(this._destroy$), map(params => params.id));
		id$.subscribe(id => {
			this.store.dispatch(supplierActions.select(id));
			this.store.dispatch(supplierActions.loadProductCount());
		});

		this.supplier$ = this.store.select(selectSupplierSelected);
		this.productsCount$ = id$.pipe(switchMap(id => this.store.select(selectSupplierProductsCountForId(id))));
		this.tasks$ = this.store.select(selectTasks);
	}

	patch(patch: Patch) {
		this.store.dispatch(supplierActions.patch(patch));
	}
}
