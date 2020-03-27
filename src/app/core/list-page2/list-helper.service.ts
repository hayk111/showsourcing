import { Injectable } from '@angular/core';
import { WatchQueryOptions } from 'apollo-client';
import { BehaviorSubject, combineLatest, forkJoin, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { CreationDialogComponent } from '~common/dialogs/creation-dialogs';
import { ApiService, ObservableQuery } from '~core/erm3/services/api.service';
import { Typename } from '~core/erm3/typename.type';
import { FilterService } from '~core/filters/filter.service';
import { CloseEventType, DialogService } from '~shared/dialog';
import { SelectionService } from './selection.service';
import { Sort } from '~shared/table/components/sort.interface';

@Injectable({ providedIn: 'root' })
export class ListHelperService<G = any> {
	/** saving the queryRef for future referencing (refetch, add to cache) */
	private queryRef: ObservableQuery<G[]>;
	private typename: Typename;
	private _pending$ = new BehaviorSubject<boolean>(true);
	pending$ = this._pending$.asObservable();
	/** number of items taken at once */
	private currentLimit = 25;
	private _limit$ = new BehaviorSubject<number>(this.currentLimit);
	limit$ = this._limit$.asObservable();
	/** from which page */
	private currentPage = 0;
	private _page$ = new BehaviorSubject<number>(this.currentPage);
	page$ = this._page$.asObservable();
	/** sorting */
	private currentSort: Sort; // sync version
	private _sort$ = new BehaviorSubject<Sort>(this.currentSort);
	sort$ = this._sort$.asObservable();
	/** total number of items */
	private total: number;
	total$: Observable<number>;
	/** the filtered items */
	filteredItems$ = combineLatest(
		this.filterSrv.valueChanges$,
		this._page$,
		this._limit$,
		this._sort$
	).pipe(
		// gets the query
		map(([{ queryArg }, from, limit, sort]) => this.apiSrv.search<G>(
			this.typename, { filter: queryArg, limit, from, sort })
		),
		// save it
		tap(query => this.queryRef = query),
		// add observable version of total for the view,
		// and synchronous one for easy access in this class
		tap(query => this.total$ = query.total$.pipe(
			tap(total => this.total = total)
			)
		),
		// add the next token for infiniscroll
		// TODO
		// return the result
		switchMap(_ => this.queryRef.data$),
		// setting pending to false because we received data
		tap(_ => this._pending$.next(false)),
		shareReplay(1)
	);

	constructor(
		private selectionSrv: SelectionService,
		private apiSrv: ApiService,
		private filterSrv: FilterService,
		private dlgSrv: DialogService
	) {}

	setup(typename: Typename) {
		this.typename = typename;
	}

	refetch(options?: WatchQueryOptions) {
		this._pending$.next(true);
		return this.queryRef.refetch({ ...options, fetchPolicy: 'network-only' })
		.then(_ => this._pending$.next(false));
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

	updateSelected(entity) {
		const selected = this.selectionSrv.getSelectedValues();
		const all = selected.map(ent => this.apiSrv.update(this.typename, { id: ent.id, ...entity}));
		forkJoin(all).pipe(
			switchMap(_ => this.refetch())
		).subscribe();
	}

	delete(entity: any) {
		this.apiSrv.delete(this.typename, entity).pipe(
			switchMap(_ => this.refetch())
		).subscribe();
	}

	deleteSelected() {
		const selected = this.selectionSrv.getSelectedValues();
		const all = selected.map(entity => this.apiSrv.delete(this.typename, entity));
		forkJoin(all).pipe(
			switchMap(_ => this.refetch())
		).subscribe();
	}

	setItemsPerPage(value: number) {
		this._limit$.next(value);
	}

	loadMore() {
		throw Error('not implemented yet');
	}

	loadPage(page: number) {
		this._page$.next(page);
	}

	loadNextPage() {
		this._page$.next(this.currentPage + 1);
	}

	loadPreviousPage() {
		this._page$.next(this.currentPage - 1);
	}

	loadFirstPage() {
		this._page$.next(0);
	}

	loadLastPage() {
		const lastPage = Math.ceil(this.total / this.currentLimit) - 1;
		this._page$.next(lastPage);
	}

	/** Sorts items based on sort.sortBy */
	sort(sort: Sort) {
		this._sort$.next(sort);
	}

}
