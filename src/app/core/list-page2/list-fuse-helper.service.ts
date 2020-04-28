import { Injectable } from '@angular/core';
import Fuse from 'fuse.js/dist/fuse.esm.js';
import { BehaviorSubject, combineLatest, Observable, of, Subject, timer } from 'rxjs';
import { debounce, filter, map, switchMap, tap } from 'rxjs/operators';
import * as uuid from 'uuid';
import { DefaultCreationDialogComponent } from '~common/dialogs/creation-dialogs';
import { TeamService } from '~core/auth';
import { ApiQueryOption, ApiService, ObservableQuery } from '~core/erm3/services/api.service';
import { Typename } from '~core/erm3/typename.type';
import { FilterService, FilterType } from '~core/filters';
import { DialogService } from '~shared/dialog';
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
export class ListFuseHelperService<G = any> {
	private queryRef: ObservableQuery<G[]>;
	private typename: Typename;
	private _fuse$ = new Subject();
	private _pending$ = new BehaviorSubject(true);
	pending$ = this._pending$.asObservable();

	private _total$ = new Subject<number>();
	private _total: number;
	total$ = this._total$.asObservable();

	fuseOptions = {
		keys: [],
		shouldSort: true,
		includeScore: true,
		threshold: 0.5, // 0 = full match
		location: 0,
		distance: 100,
		minMatchCharLength: 1,
	};

	constructor(
		private selectionSrv: SelectionService,
		private apiSrv: ApiService,
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

		/** the filterSrv should be setup before the listFuseHelper to specify searchable columns.
	 * example of use:
	 * this.filterSrv.setup([], ['name']); => fuse will be searchable on name and not on createdBy, ...
	 * this.listHelper.setup('Category');
	 */
	setup(
		typename: Typename,
		byProperty: string = 'Team',
		byId: string = TeamService.teamSelected.teamId,
		queryOptions: ApiQueryOption = {}
	) {
		byId = byId || TeamService.teamSelected.id;
		this.typename = typename;
		queryOptions.fetchPolicy = 'network-only';
		this.queryRef = this.apiSrv.listBy<G>(typename, byProperty, byId, queryOptions);
		this.fuseOptions.keys = this.filterSrv.searchedFields || this.fuseOptions.keys;
		// when we update the query, datas it will reasign fuse
		this.queryRef.data$.subscribe((datas) => {
			this._fuse$.next(new Fuse(datas, this.fuseOptions));
			this._pending$.next(false);
		});
	}

	/** items searched, without sort and without pagination */
	private _fusedItems$: Observable<G[]> = combineLatest(
		this._fuse$,
		this.filterSrv.valueChanges$
	).pipe(
		debounce(() => timer(400)),
		switchMap(([fuse]: any) => {
			// the value changed should concern the FilterType search
			const searchValue = this.filterSrv.getFiltersForType(FilterType.SEARCH)[0];
			if (searchValue) return of(fuse.search(searchValue.value).map((data) => data.item));
			else return this.queryRef.data$;
		}),
		tap((searchedDatas) => {
			this._total$.next(searchedDatas.length);
		})
	);

	/** items sorted, without pagination */
	searchedItems$ = combineLatest(this._fusedItems$, this.sortSrv.sort$).pipe(
		map(([searchedItems, sort]) => {
			if (!sort) return searchedItems;
			return searchedItems.sort((item1, item2) => {
				const direction = sort.direction === 'ASC' ? 1 : -1;
				return item1[sort.property] > item2[sort.property] ? direction : direction * -1;
			});
		})
	);

	paginedItems$: Observable<G[]> = combineLatest(
		this.paginationSrv.page$,
		this.paginationSrv.limit$,
		this.searchedItems$
	).pipe(
		map(([page, limit, sortedItems]) => {
			const indexStart = page * limit;
			return sortedItems.slice(indexStart, indexStart + limit);
		}),
		filter((paginedItems) => this._total === 0 || paginedItems.length > 0)
	);

	refetch() {
		this._pending$.next(true);
		return this.queryRef
			.refetch({ fetchPolicy: 'cache-first' })
			.then((_) => this._pending$.next(false));
	}

	create(addedProperties: any) {
		this.dlgSrv
			.open(DefaultCreationDialogComponent, {
				typename: this.typename,
				extra: addedProperties,
			})
			.data$.pipe(
				switchMap((entity) => this.apiSrv.create(this.typename, entity)),
				tap((entity) => this.apiSrv.addToList(this.queryRef, entity))
			)
			.subscribe();
	}

	update(entity: any, options?: any) {
		this.apiSrv.update(this.typename, entity, options);
	}

	delete(entity: any) {
		this.apiSrv.deleteManyFromList(this.queryRef, [entity.id]);
		this.apiSrv.delete(this.typename, entity).subscribe();
	}

	deleteSelected() {
		const selecteds = this.selectionSrv.getSelectedValues();
		this.apiSrv.deleteMany(this.typename, selecteds).subscribe((_) => {
			this.apiSrv.deleteManyFromList(
				this.queryRef,
				selecteds.map((el) => el.id)
			);
			this.selectionSrv.unselectAll();
		});
		selecteds.map((deleted) => this.apiSrv.deleteManyFromList(this.queryRef, [deleted.id]));
		this.selectionSrv.unselectAll();
	}

	loadMore() {
		throw Error('not implemented yet');
	}
}
