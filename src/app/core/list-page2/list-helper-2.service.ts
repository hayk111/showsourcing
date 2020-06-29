import { Injectable } from '@angular/core';
import { api, Collection } from 'lib';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DefaultCreationDialogComponent } from '~common/dialogs/creation-dialogs';
import { FilterService } from '~core/filters';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { PaginationService } from '~shared/pagination/services/pagination.service';
import { SortService } from '~shared/table/services/sort.service';
import { SelectionService } from './selection.service';

/** this service is about managing the tables of non searchable entities like category, tag, ...
 * It must be setup before use (see setup method)
 *
 * As some entities are not searchable / sortable, we query all entities (from the cache first)
 * and manage them as an array (search with fuse, sorting, paginating, ...)
 */
@Injectable({ providedIn: 'root' })
export class ListHelper2Service<G = any> {
	data$: Observable<any[]>;
	private collection: 'Product' | 'Sample' | 'Task' | 'Supplier' | 'Project';
	private _pending$ = new BehaviorSubject(true);
	pending$ = this._pending$.asObservable();

	private _total$ = new Subject<number>();
	private _total: number;
	total$ = this._total$.asObservable();

	constructor(
		private selectionSrv: SelectionService,
		private filterSrv: FilterService,
		private dlgSrv: DialogService,
		private paginationSrv: PaginationService,
		private sortSrv: SortService
	) {
		// When the total change, we setup pagination
		this.total$.pipe().subscribe((total) => {
			this._total = total;
			this.paginationSrv.setupTotal(total);
		});
	}

	setup(
		collection: 'Product' | 'Sample' | 'Task' | 'Supplier' | 'Project',
	) {
		this.collection = collection;
		const service = api.col(collection as any);
		this.data$ = combineLatest(
			this.filterSrv.valueChanges$,
			this.paginationSrv.page$,
			this.paginationSrv.limit$,
			this.sortSrv.sort$
		).pipe(
			switchMap(([filter, page, limit, sort]) => service.find(filter, sort, { page, limit }).data$)
		);
	}

	create(addedProperties: any = {}) {
		this.dlgSrv
			.open(DefaultCreationDialogComponent, {
				typename: this.collection,
				extra: addedProperties,
			})
			.data$.pipe(
				switchMap((entity) => api[this.collection].create([entity])),
			).subscribe();
	}

	update(entity: any, collection?: Collection) {
		api.col(collection || this.collection as any).update([entity]).subscribe();
	}

	delete(entity: any, collection?: Collection) {
		const { id, teamId } = entity;
		api.col(collection || this.collection as any).delete([{ id }])
			.subscribe();
	}

	updateSelected(entity) {
		const selected = this.selectionSrv.getSelectedValues();
		return api[this.collection].update(
			selected.map(ent => ({ id: ent.id, ...entity}))
		);
	}

	deleteSelected() {
		const selecteds = this.selectionSrv.getSelectedValues();
		this.dlgSrv
			.open(ConfirmDialogComponent)
			.data$.pipe(switchMap((_) => api[this.collection].delete(selecteds as any)))
			.subscribe((_) => {
				this.selectionSrv.unselectAll();
			});
	}

	loadMore() {
		throw Error('not implemented yet');
	}
}
