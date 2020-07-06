import { Injectable, NgZone } from '@angular/core';
import { api, ISearchOptions, Typename, IApiResponse } from 'showsourcing-api-lib';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, tap, map, share, distinctUntilChanged } from 'rxjs/operators';
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
	private _data$ = new BehaviorSubject([]);
	data$ = this._data$.asObservable();

	private typename: Typename;
	private _pending$ = new BehaviorSubject(true);
	pending$ = this._pending$.asObservable();

	total = 0;
	private _total$ = new Subject<number>();
	total$ = this._total$.asObservable();

	constructor(
		private selectionSrv: SelectionService,
		private filterSrv: FilterService,
		private dlgSrv: DialogService,
		private paginationSrv: PaginationService,
		private sortSrv: SortService,
	) {
		// When the total change, we setup pagination
		this.total$.pipe().subscribe((total) => {
			this.total = total;
			this.paginationSrv.setupTotal(total);
		});
	}

	/**
	 * @param typename the collection used for update and mutations
	 * @param componentDestroy$ tells the service to stop listening when the component is destroyed
	 * if it's a global list you don't have to specify it
	 */
	setup(
		typename: Typename,
		componentDestroy$?: Observable<any>,
		findFn?: (options: ISearchOptions) => IApiResponse,
	) {
		componentDestroy$ = componentDestroy$ || new Subject();
		findFn = findFn || ((options: ISearchOptions) => api[typename].find(options));
		this.typename = typename;

		const reactiveFind = combineLatest(
			this.filterSrv.valueChanges$,
			this.paginationSrv.pagination$,
			this.sortSrv.sort$
		).pipe(
			map(([filter, pagination, sort]) => findFn({ filter, sort, pagination })),
		);

		// data
		reactiveFind.pipe(
			switchMap(result => result.data$),
			tap(_ => this._pending$.next(false)),
			takeUntil(componentDestroy$),
		).subscribe(data => this._data$.next(data));
		// total
		reactiveFind.pipe(
			switchMap(result => result.count$),
			takeUntil(componentDestroy$),
			distinctUntilChanged()
		).subscribe(count => this._total$.next(count));
	}

	openCreationDialog(addedProperties: any = {}) {
		this.dlgSrv
			.open(DefaultCreationDialogComponent, {
				typename: this.typename,
				extra: addedProperties,
			})
			.data$.pipe(
				switchMap((entity) => api[this.typename].create([entity])),
			).subscribe();
	}

	update(entity: any, typename?: Typename) {
		api[typename || this.typename].update([entity]).subscribe();
	}

	delete(entity: any, typename?: Typename) {
		const { id, teamId } = entity;
		api[typename || this.typename].delete([{ id }])
			.subscribe();
	}

	updateSelected(entity) {
		const selected = this.selectionSrv.getSelectedValues();
		return api[this.typename].update(
			selected.map(ent => ({ id: ent.id, ...entity}))
		);
	}

	deleteSelected() {
		const selecteds = this.selectionSrv.getSelectedValues();
		this.dlgSrv
			.open(ConfirmDialogComponent)
			.data$.pipe(switchMap((_) => api[this.typename].delete(selecteds as any)))
			.subscribe((_) => {
				this.selectionSrv.unselectAll();
			});
	}

	loadMore() {
		throw Error('not implemented yet');
	}
}
