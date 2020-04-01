import { Injectable } from '@angular/core';
import * as Fuse from 'fuse.js';
import { combineLatest, forkJoin, Observable, of, Subject, timer } from 'rxjs';
import { debounce, switchMap, tap, filter, map } from 'rxjs/operators';
import { ApiQueryOption, ApiService, ObservableQuery } from '~core/erm3/services/api.service';
import { Typename } from '~core/erm3/typename.type';
import { FilterService, FilterType } from '~core/filters';
import { SelectionService } from './selection.service';
import { CloseEventType, DialogService } from '~shared/dialog';
import { CreationDialogComponent } from '~common/dialogs/creation-dialogs';
import { TeamService } from '~core/auth';


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

	filteredItems$: Observable<G[]> = combineLatest(this._fuse$, this.filterSrv.valueChanges$).pipe(
		debounce(() => timer(400)),
		switchMap(([fuse]: any) => {
			// the value changed should concern the FilterType search
			const searchValue = this.filterSrv.getFiltersForType(FilterType.SEARCH)[0];
			if (searchValue) return of(fuse.search(searchValue.value).map(data => data.item));
			else return this.queryRef.data$;
		}),
		tap(searchedDatas => {
			this._total$.next(searchedDatas.length);
		}),
	);
	// result.sort(); // TODO should take sort property from filterSrv, not implemented yet
	// TODO should trigger filteredItems$ when sort is updated
	// TODO update pagination

	constructor(
		private selectionSrv: SelectionService,
		private apiSrv: ApiService,
		private filterSrv: FilterService,
		private dlgSrv: DialogService
	) {}

	setup(
		typename: Typename,
		byProperty: string = 'Team',
		byId: string = TeamService.teamSelected.teamId,
		queryOptions: ApiQueryOption = {}
	) {
		byId = byId || TeamService.teamSelected.id;
		this.typename = typename;
		queryOptions.fetchPolicy = queryOptions.fetchPolicy || 'cache-first';
		this.queryRef = this.apiSrv.listBy<G>(typename, byProperty, byId, queryOptions);
		this.fuseOptions.keys = this.filterSrv.searchedFields || this.fuseOptions.keys;
		// when we update datas it will reasign fuse
		this.queryRef.data$.subscribe(datas => {
			this._fuse$.next(new Fuse(datas, this.fuseOptions));
			this.pending = false;
		});
	}

	private refetch() {
		this.pending = true;
		return this.queryRef.refetch({ fetchPolicy: 'cache-first' }).then(_ => (this.pending = false));
	}

	create(addedProperties: any) {
		this.dlgSrv.open(CreationDialogComponent , {
			typename: this.typename,
			extra: addedProperties
		}).pipe(
			filter(closeEvent => closeEvent.type === CloseEventType.OK),
			map(closeEvent => closeEvent.data),
			switchMap(entity => this.apiSrv.create(this.typename, entity)),
		).subscribe(created => this.apiSrv.addToList(this.queryRef, created));
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
