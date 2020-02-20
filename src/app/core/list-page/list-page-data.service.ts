import { Injectable } from '@angular/core';
import { ConnectableObservable, Observable } from 'rxjs';
import {
	first,
	map,
	merge,
	skip,
	switchMap,
	takeUntil,
	tap
} from 'rxjs/operators';
import { ListPageDataConfig } from '~core/list-page/list-page-config.interface';
import { GlobalServiceInterface } from '~core/erm';
import { ListQuery } from '~core/erm';
import { SelectParams, SelectParamsConfig } from '~core/erm';
import { Filter, FilterList, FilterType } from '~shared/filters';
import { Sort } from '~shared/table/components/sort.interface';
import { log } from '~utils/log';

/**
 * Services that helps us for common functionalities in list pages
 */
@Injectable({
	providedIn: 'root'
})
export class ListPageDataService<
	T extends { id?: string; deleted?: boolean },
	G extends GlobalServiceInterface<T>
> {
	/** main global service used */
	protected entitySrv: G;
	/** currently loaded items */
	items$: ConnectableObservable<Array<T>>;
	/** for debugging */
	protected itemsSync: Array<T>;
	/** number of total items */
	count$: Observable<number>;
	/** current page we are at */
	currentPage = 0;

	/** can be used on when to fetch more etc. */
	private listResult: ListQuery<T>;
	selectParams: SelectParamsConfig = new SelectParams();

	/** filters coming from the filter panel if any. */
	filterList = new FilterList([
		// initial filters
	]);
	/** Whether the items are pending */
	pending = true;

	/** initialization flags */
	private isSetup = false;
	private initialized = false;
	/** tells us if loadData has been called */
	isListening = false;

	constructor() {
		log.debug('creating list-data service');
	}

	/**
	 * Sets up the main global/feature service used for making queries.
	 * Should to be called first.
	 * @param service main global/feature service used for making queries
	 */
	setup(config: ListPageDataConfig) {
		this.isListening = false;
		if (this.isSetup) return;
		// we merge the default parameter
		const mergedParams = { ...this.selectParams, ...config.selectParams };
		Object.assign(this, config);
		this.selectParams = { ...mergedParams };
		this.filterList = new FilterList(
			config.initialFilters,
			config.searchedFields
		);
		this.isSetup = true;
	}

	/** init: helper method to set everything up at once */
	loadData(destroy$: Observable<void>) {
		// since the item$ is a connectable observable we
		// can just do it once
		if (!this.initialized) {
			this.setItems();
			// then we start listening
			this.listResult.items$.connect();
			this.initialized = true;
		} else {
			this.refetch({}).subscribe();
		}
		// here we want to unsubscribe from the filter list
		// when the component is destroyed so we do it all the time
		this.listenFilterChanges(destroy$);
		// since the isListening changes after ngAfterViewInit a lot of the time
		// let's use setTimeout to not have a ViewChangedAfterItWasCheckedError
		setTimeout(_ => (this.isListening = true));
	}

	/** subscribe to items and get the list result */
	setItems() {
		// in case we have an initial query and we have to apply a filter
		const query =
			this.selectParams.query && this.filterList.asPredicate()
				? this.selectParams.query +
				  ' AND (' +
				  this.filterList.asPredicate() +
				  ')'
				: this.filterList.asPredicate();
		this.selectParams = { ...this.selectParams, query };
		this.listResult = this.entitySrv.getListQuery({ ...this.selectParams });
		this.items$ = this.listResult.items$.pipe(
			tap(_ => this.onLoaded()),
			// remove deleted items from the list cuz they stay if they
			// start at deleted false then are updated as deleted true
			// and we can't use refetch or we lose the pagination
			map(items => (items || []).filter(itm => !itm.deleted)),
			tap(items => (this.itemsSync = items))
		) as ConnectableObservable<T[]>;
		this.count$ = this.listResult.count$;
	}

	combineItems(items: Observable<T[]>) {
		this.items$ = (merge(
			this.items$,
			items
		) as unknown) as ConnectableObservable<T[]>;
	}

	//? Why do we observe a trigger and not use filters as observable then return a new observable with the query refetched ?
	/** when the filter change we want to refetch the items with a new predicate */
	listenFilterChanges(destroy$: Observable<void>) {
		this.filterList.valueChanges$
			.pipe(
				skip(1),
				tap(_ => (this.currentPage = 0)),
				tap(filterList => (this.selectParams.query = filterList.asPredicate())),
				switchMap(_ => this.refetch()),
				takeUntil(destroy$)
			)
			.subscribe();
	}

	/** when the items are loaded */
	onLoaded() {
		this.pending = false;
	}

	onLoading() {
		this.pending = true;
	}

	/**
	 * refetchs the query and will merge with existing config
	 * @param config configuration used to refetch
	 */
	refetch(config?: SelectParamsConfig) {
		this.onLoading();
		return this.listResult.refetch(config || this.selectParams).pipe(
			tap(_ => this.onLoaded()),
			first()
		);
	}

	/** Loads more items when we reach the bottom of the page */
	loadMore() {
		return this.listResult.fetchMore();
	}

	loadPage(page: number, config?: SelectParamsConfig): Observable<any> {
		this.currentPage = page;
		this.selectParams.take =
			config && config.take ? config.take : this.selectParams.take;
		this.selectParams.skip = this.selectParams.take * page;
		return this.refetch(this.selectParams);
	}

	loadNextPage(): Observable<any> {
		this.currentPage++;
		this.selectParams.skip = this.selectParams.skip + this.selectParams.take;
		return this.refetch(this.selectParams);
	}

	loadPreviousPage(): Observable<any> {
		this.currentPage--;
		this.selectParams.skip = Math.max(
			this.selectParams.skip - this.selectParams.take,
			0
		);
		return this.refetch(this.selectParams);
	}

	loadFirstPage(): Observable<any> {
		this.currentPage = 0;
		this.selectParams.skip = 0;
		return this.refetch(this.selectParams);
	}

	loadLastPage(): Observable<any> {
		throw Error('not implemented yet');
	}

	/** Sorts items based on sort.sortBy */
	sort(sort: Sort) {
		this.selectParams = { ...this.selectParams, ...sort };
		return this.refetch(this.selectParams);
	}

	sortFromMenu(fieldName: string) {
		if (this.selectParams.sortBy === fieldName) {
			this.selectParams.descending = !this.selectParams.descending;
		} else {
			this.selectParams.sortBy = fieldName;
			this.selectParams.descending = false;
		}
		return this.refetch(this.selectParams);
	}

	/** when we want to search through the list we only search the name */
	search(str: string): void {
		this.filterList.setSearch(str);
	}

	// UPDATES
	/** Update entities */
	updateMany(entities: T[]) {
		return this.entitySrv.updateMany(entities);
	}

	/** Update a entity */
	update(entity: T) {
		return this.entitySrv.update(entity);
	}

	// DELETES
	/** Deletes an specific item */
	deleteOne(itemId: string) {
		return this.entitySrv.delete(itemId);
	}

	/** Will show a confirm dialog to delete items selected */
	deleteMany(ids: string[]) {
		return this.entitySrv.deleteMany(ids);
	}

	/** adds a filters to the list of filters */
	addFilter(filter: Filter) {
		this.filterList.addFilter(filter);
	}

	removeFilter(filter: Filter) {
		this.filterList.removeFilter(filter);
	}

	removeFilterType(filterType: FilterType) {
		this.filterList.removeFilterType(filterType);
	}
}
