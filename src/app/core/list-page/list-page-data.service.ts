import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ListPageDataConfig } from '~core/list-page/list-page-config.interface';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { GlobalServiceInterface } from '~entity-services/_global/global.service';
import { ListQuery } from '~entity-services/_global/list-query.interface';
import { SelectParamsConfig } from '~entity-services/_global/select-params';
import { EntityMetadata } from '~models';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { DialogService } from '~shared/dialog/services';
import { Filter, FilterList, FilterType } from '~shared/filters';
import { ThumbService } from '~shared/rating/services/thumbs.service';
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
	/** non observable version of the above */
	private items: Array<T> = [];
	/** can be used on when to fetch more etc. */
	private listResult: ListQuery<T>;
	/** predicate that will be used at the start for filtering */
	private initialPredicate = 'deleted == false';
	/** searched string */
	private currentSearch = '';
	/** currently used sort */
	currentSort: Sort = { sortBy: 'creationDate', descending: true };
	/** filters coming from the filter panel if any. */
	filterList = new FilterList([
		// initial filters
	]);
	/** Whether the items are pending */
	pending = true;

	/** when making a search, fields we are gonna search through */
	private searchedFields: string[] = ['name'];

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
		Object.assign(this, config);
	}

	/** init: helper method to set everything up at once */
	loadData() {
		if (this.initialized) {
			return;
		}
		this.setItems();
		this.setFilters();
		this.initialized = true;
	}

	/** subscribe to items and get the list result */
	setItems() {
		this.listResult = this.entitySrv.getListQuery({
			query: this.getPredicate(),
			sortBy: this.currentSort.sortBy,
			descending: this.currentSort.descending
		});

		this.items$ = this.listResult.items$.pipe(
			tap(_ => this.onLoaded()),
			tap(items => this.items = items),
			// remove deleted items from the list cuz they stay if they
			// start at deleted false then are updated as deleted true
			// and we can't use refetch or we lose the pagination
			map(items => items.filter(itm => !itm.deleted))
		);
	}

	/** when the filter change we want to refetch the items with a new predicate */
	setFilters() {
		this.filterList
			.valueChanges$
			.subscribe(_ => this.onPredicateChange());
	}

	/** when the items are loading */
	onLoad() {
		this.pending = true;
	}

	/** when the items are loaded */
	onLoaded() {
		this.pending = false;
	}

	/** On any of the predicate change we should call this to refetch */
	onPredicateChange() {
		const allFilters = this.getPredicate();
		return this.refetch({ query: allFilters });
	}

	private getPredicate() {
		return [
			this.initialPredicate,
			this.currentSearch,
			this.filterList.asPredicate()
		].filter(p => !!p).join(' AND ');
	}

	/**
	 * refetchs the query and will merge with existing config
	 * @param config configuration used to refetch
	 */
	refetch(config?: SelectParamsConfig) {
		this.listResult.refetch(config).subscribe();
	}

	/** Loads more items when we reach the bottom of the page */
	loadMore() {
		return this.listResult.fetchMore(this.items.length);
	}

	/** Sorts items based on sort.sortBy */
	sort(sort: Sort) {
		this.currentSort = sort;
		this.refetch({ ...sort });
	}

	sortFromMenu(fieldName) {
		if (this.currentSort && this.currentSort.sortBy === fieldName) {
			this.currentSort = { ...this.currentSort, descending: !this.currentSort.descending };
		} else {
			this.currentSort = { sortBy: fieldName, descending: false };
		}
		this.refetch({ ...this.currentSort });
	}

	/** when we want to search through the list we only search the name */
	search(str: string) {
		// the search predicate
		if (!str) {
			this.currentSearch = '';
		} else {
			this.currentSearch = this.searchedFields
				.map(field => `${field} CONTAINS[c] "${str}"`)
				.join(' OR ');
		}
		this.onPredicateChange();
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
