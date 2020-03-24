import { Injectable } from '@angular/core';
import * as Fuse from 'fuse.js';
import { combineLatest, forkJoin, Observable, of, Subject, timer } from 'rxjs';
import { debounce, switchMap, tap } from 'rxjs/operators';
import { TeamService } from '~core/auth';
import { ApiQueryOption, ApiService } from '~core/erm3/services/api.service';
import { ObservableQuery } from '~core/erm3/services/_global/observable-query.interface';
import { Typename } from '~core/erm3/typename.type';
import { FilterService, FilterType } from '~core/filters';
import { SelectionService } from './selection.service';


@Injectable({ providedIn: 'root' })
export class ListFuseHelperService<G = any> {
	private queryRef: ObservableQuery<G[]>;
	private typename: Typename;
	private _fuse$ = new Subject();
	pending = true;

	private _total$ = new Subject<number>();
	total$ = this._total$.asObservable();

	fuseOptions = {
		keys: [],
		shouldSort: true,
		includeScore: true,
		threshold: 0.5, // 0 = full match
		location: 0,
		distance: 100,
		minMatchCharLength: 1
	};

	constructor(
		private selectionSrv: SelectionService,
		private apiSrv: ApiService,
		private filterSrv: FilterService
	) {}

	setup(
		typename: Typename,
		byProperty: string = 'Team',
		byId: string = TeamService.teamSelected.teamId,
		queryOptions: ApiQueryOption = {}
	) {
		this.typename = typename;
		queryOptions.fetchPolicy = queryOptions.fetchPolicy || 'cache-first';
		this.queryRef = this.apiSrv.listBy<G>(typename, byProperty, byId, queryOptions);
		this.fuseOptions.keys = this.filterSrv.searchedFields || this.fuseOptions.keys;
		// when we update datas it will reasign fuse
		this.queryRef.data$.subscribe(datas => {
			this._fuse$.next(new Fuse(datas, this.fuseOptions));
		});
	}

	getFilteredItems$: Observable<G[]> = combineLatest(this._fuse$, this.filterSrv.valueChanges$).pipe(
		debounce(() => timer(300)),
		switchMap(([fuse]: any) => {
			// the value changed should concern the FilterType search
			const searchValue = this.filterSrv.getFiltersForType(FilterType.SEARCH)[0];
			console.log('ListFuseHelperService<G -> searchValue', searchValue);
			if (searchValue) return of(fuse.search(searchValue.value).map(data => data.item));
			else return this.queryRef.data$;
		}),
		tap(searchedDatas => {
			console.log('total should change:  ', searchedDatas.length);
			this._total$.next(searchedDatas.length);
		}),
	);
	// result.sort(); // TODO should take sort property from filterSrv, not implemented yet
	// TODO should trigger getFilteredItems$() when sort is updated
	// TODO update pagination

	private refetch() {
		this.pending = true;
		return this.queryRef.refetch({ fetchPolicy: 'cache-first' }).then(_ => (this.pending = false));
	}

	create(entity: any) {
		this.apiSrv
			.create(this.typename, entity)
			.pipe(switchMap(_ => this.refetch()))
			.subscribe();
	}

	update(entity: any) {
		this.apiSrv.update(this.typename, entity);
	}

	delete(entity: any) {
		this.apiSrv
			.delete(this.typename, entity)
			.pipe(switchMap(_ => this.refetch()))
			.subscribe();
	}

	deleteSelected() {
		const selected = this.selectionSrv.getSelectedValues();
		const all = selected.map(entity => this.apiSrv.delete(this.typename, entity));
		forkJoin(all)
			.pipe(switchMap(_ => this.refetch()))
			.subscribe();
	}

	loadMore() {
		throw Error('not implemented yet');
	}

	loadPage() {
		throw Error('not implemented yet');
	}

	loadNextPage() {
		throw Error('not implemented yet');
	}

	loadPreviousPage() {
		throw Error('not implemented yet');
	}

	loadFirstPage() {
		throw Error('not implemented yet');
	}

	loadLastPage() {
		throw Error('not implemented yet');
	}

	/** Sorts items based on sort.sortBy */
	sort() {
		throw Error('not implemented');
	}
}
