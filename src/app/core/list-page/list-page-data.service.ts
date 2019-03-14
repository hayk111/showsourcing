import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, skip, switchMap, tap, first } from 'rxjs/operators';
import { ListPageDataConfig } from '~core/list-page/list-page-config.interface';
import { GlobalServiceInterface } from '~entity-services/_global/global.service';
import { ListQuery } from '~entity-services/_global/list-query.interface';
import { SelectParamsConfig } from '~entity-services/_global/select-params';
import { Filter, FilterList, FilterType } from '~shared/filters';
import { Sort } from '~shared/table/components/sort.interface';
import { log } from '~utils/log';

/**
 * Services that helps us for common functionalities in list pages
 */
@Injectable({
	providedIn: 'root'
})
export class ListPageDataService
	<T extends { id?: string, deleted?: boolean }, G extends GlobalServiceInterface<T>> {

	/** main global service used */
	protected entitySrv: G;
	/** currently loaded items */
	items$: Observable<Array<T>>;

	/** can be used on when to fetch more etc. */
	private listResult: ListQuery<T>;
	selectParams: SelectParamsConfig = {
		query: '',
		sortBy: 'creationDate',
		descending: true,
		take: 50,
		skip: 0
	};

	/** filters coming from the filter panel if any. */
	filterList = new FilterList([
		// initial filters
	]);
	/** Whether the items are pending */
	pending = true;

	/** initialization flags */
	private isSetup = false;
	private initialized = false;

	/** for the smart search feature... */
	private searchFilterElements$: Observable<any[]>;
	smartSearchFilterElements$: Observable<any[]>;

	constructor() {
		log.debug('creating list-data service');
	}

	/**
	 * Sets up the main global/feature service used for making queries.
	 * Should to be called first.
	 * @param service main global/feature service used for making queries
	 */
	setup(config: ListPageDataConfig) {
		if (this.isSetup)
			return;
		Object.assign(this, config);
		this.filterList = new FilterList(
			config.initialFilters,
			config.searchedFields,
			this.selectParams.query
		);
		this.isSetup = true;
	}

	/** init: helper method to set everything up at once */
	loadData() {
		if (this.initialized) {
			return this.refetch().subscribe();
		}
		this.setItems();
		this.listenFilterChanges();
		this.initialized = true;
	}

	/** subscribe to items and get the list result */
	setItems() {
		this.listResult = this.entitySrv.getListQuery({
			...this.selectParams,
			// overriding query in case there is a filter / search
			query: this.filterList.asPredicate()
		});

		this.items$ = this.listResult.items$.pipe(
			tap(_ => this.onLoaded()),
			// remove deleted items from the list cuz they stay if they
			// start at deleted false then are updated as deleted true
			// and we can't use refetch or we lose the pagination
			map(items => items.filter(itm => !itm.deleted))
		);
	}

	/** when the filter change we want to refetch the items with a new predicate */
	listenFilterChanges() {
		this.filterList
			.valueChanges$
			.pipe(
				skip(1),
				switchMap(_ => this.refetch({ query: this.filterList.asPredicate() }))
			).subscribe();
	}

	/** when the items are loading */
	onLoad() {
		this.pending = true;
	}

	/** when the items are loaded */
	onLoaded() {
		this.pending = false;
	}

	/**
	 * refetchs the query and will merge with existing config
	 * @param config configuration used to refetch
	 */
	refetch(config?: SelectParamsConfig) {
		return this.listResult.refetch(config || this.selectParams).pipe(first());
	}

	/** Loads more items when we reach the bottom of the page */
	loadMore() {
		return this.listResult.fetchMore();
	}

	/** Sorts items based on sort.sortBy */
	sort(sort: Sort) {
		this.selectParams = { ...this.selectParams, ...sort };
		return this.refetch();
	}

	sortFromMenu(fieldName: string) {
		if (this.selectParams.sortBy === fieldName) {
			this.selectParams.descending = !this.selectParams.descending;
		} else {
			this.selectParams.sortBy = fieldName;
			this.selectParams.descending = false;
		}
		return this.refetch();
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

	smartSearch(event: any) {
		throw Error('not implemented');
	}

}
