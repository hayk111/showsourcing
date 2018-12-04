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
import { Filter, FilterList } from '~shared/filters';
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
	<T extends { id?: string, deleted?: boolean }, G extends GlobalServiceInterface<T>>
	implements ListPageDataConfig {

	/** main global service used */
	featureSrv: G;
	/** currently loaded items */
	items$: Observable<Array<T>>;
	/** non observable version of the above */
	items: Array<T> = [];
	/** can be used on when to fetch more etc. */
	listResult: ListQuery<T>;
	/** predicate that will be used at the start for filtering */
	initialPredicate = 'deleted == false';
	/** searched string */
	currentSearch = '';
	/** property we sort by on first query */
	initialSortBy = 'creationDate';
	/** currently used sort */
	currentSort: Sort;
	/** filters coming from the filter panel if any. */
	filterList = new FilterList([
		// initial filters
	]);
	/** Whether the items are pending */
	pending = true;

	/** targeted entity metadata */
	entityMetadata: EntityMetadata;

	/** when making a search, fields we are gonna search through */
	searchedFields: string[] = ['name'];

	initialized = false;

	/** for the smart search feature... */
	searchFilterElements$: Observable<any[]>;
	smartSearchFilterElements$: Observable<any[]>;

	constructor(
		public dlgSrv: DialogService,
		public thumbSrv: ThumbService,
		public selectionSrv: SelectionWithFavoriteService
	) {
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
	init() {
		if (this.initialized) {
			return;
		}
		this.setItems();
		this.setFilters();
		this.initialized = true;
	}

	/** subscribe to items and get the list result */
	setItems() {
		this.listResult = this.featureSrv.getListQuery({
			query: this.initialPredicate,
			sortBy: this.initialSortBy,
			descending: false
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
		const allFilters = [
			this.initialPredicate,
			this.currentSearch,
			this.filterList.asPredicate()
		].filter(p => !!p).join(' AND ');

		this.refetch({ query: allFilters });
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
		this.listResult.fetchMore(this.items.length).subscribe();
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
	updateSelected(value) {
		const items = this.getSelectionIds()
			// we use only the id to not update unnecessary values (and prevent overwrite of another user)
			.map(id => ({ ...value, id }));

		this.featureSrv.updateMany(items).subscribe(() => this.selectionSrv.unselectAll());
	}

	/** Update a entity */
	update(entity: T) {
		this.featureSrv.update(entity).subscribe();
	}

	/** When a product heart is clicked to favorite it */
	onItemFavorited(id: string) {
		this.update({ id, favorite: true } as any);
	}

	/** When a product heart is clicked to unfavorite it */
	onItemUnfavorited(id: string) {
		this.update({ id, favorite: false } as any);
	}

	/** When we favorite all selected items, the items that are already favorited will stay the same */
	onFavoriteAllSelected() {
		const ids = this.getSelectionIds();
		ids.forEach(id => this.onItemFavorited(id));
		this.selectionSrv.allSelectedFavorite = true;
	}

	/** When we unfavorite all selected items, the items that are already unfavorited will stay the same */
	onUnfavoriteAllSelected() {
		this.getSelectionIds().forEach(id => this.onItemUnfavorited(id));
		this.selectionSrv.allSelectedFavorite = false;
	}

	onThumbUp(item: T) {
		const votes = this.thumbSrv.thumbUp(item);
		this.update({ id: item.id, votes } as any);
	}

	onThumbDown(item: T) {
		const votes = this.thumbSrv.thumbDown(item);
		this.update({ id: item.id, votes } as any);
	}

	/**
	 * update the vote of a given selection of items (products) when given thumb up
	 * @param onHighlight indicates the future state of the thumb
	 */
	onMultipleThumbUp(onHighlight: boolean) {
		// BE AWARE THAT THIS IS USING THE FEATURE SERVICE TO UPDATE
		// if you are using another feature srv (as project) override this funcition
		const updated = [];
		this.getSelectionValues().forEach(item => {
			const votes = this.thumbSrv.thumbUpFromMulti(item, onHighlight);
			updated.push({ id: item.id, votes });
		});
		this.featureSrv.updateMany(updated).subscribe();
	}

	/**
	 * update the vote of a given selection of items (products) when given thumb down
	 * @param onHighlight indicates the future state of the thumb
	 */
	onMultipleThumbDown(onHighlight: boolean) {
		// BE AWARE THAT THIS IS USING THE FEATURE SERVICE TO UPDATE
		// if you are using another feature srv (as project) override this funcition
		const updated = [];
		this.getSelectionValues().forEach(item => {
			const votes = this.thumbSrv.thumbDownFromMulti(item, onHighlight);
			updated.push({ id: item.id, votes });
		});
		this.featureSrv.updateMany(updated).subscribe();
	}

	// DELETES

	/** Will show a confirm dialog to delete items selected */
	deleteSelected() {
		const itemIds = this.getSelectionIds();
		// callback for confirm dialog
		const callback = () => {
			this.featureSrv.deleteMany(itemIds).subscribe(_ => {
				this.selectionSrv.unselectAll();
				this.refetch();
			});
		};
		const text = `Delete ${itemIds.length} ${itemIds.length > 1 ? 'items' : 'item'} ?`;
		this.dlgSrv.open(ConfirmDialogComponent, { text, callback });
	}

	/** Deletes an specific item */
	deleteOne(itemId: string) {
		const callback = () => this.featureSrv.delete(itemId).subscribe(_ => this.refetch());
		const text = `Are you sure you want to delete this item?`;
		this.dlgSrv.open(ConfirmDialogComponent, { text, callback });
	}

	/** adds a filters to the list of filters */
	addFilter(filter: Filter) {
		this.filterList.addFilter(filter);
	}

	removeFilter(filter: Filter) {
		this.filterList.removeFilter(filter);
	}

	smartSearch(event: any) {
		throw Error('not implemented');
	}

	private getSelectionValues() {
		return this.selectionSrv.getSelectionValues();
	}

	private getSelectionIds() {
		return this.selectionSrv.getSelectionIds();
	}


}
