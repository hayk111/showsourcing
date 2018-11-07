import { NgModuleRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { GlobalServiceInterface } from '~global-services/_global/global.service';
import { ListQuery } from '~global-services/_global/list-query.interface';
import { SelectParamsConfig } from '~global-services/_global/select-params';
import { ProductQueries } from '~global-services/product/product.queries';
import { EntityMetadata, Product } from '~models';
import { CreationDialogComponent, EditionDialogComponent } from '~shared/custom-dialog';
import { DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { Filter, FilterList, SearchService } from '~shared/filters';
import { SelectionService } from '~shared/list-page/selection.service';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { Sort } from '~shared/table/components/sort.interface';
import { AutoUnsub } from '~utils';



/**
 * Class used by components that need to display a list
 */
export abstract class ListPageComponent<T extends { id?: string, deleted?: boolean }, G extends GlobalServiceInterface<T>>
	extends AutoUnsub implements OnInit {


	/** currently loaded items */
	items$: Observable<Array<T>>;
	/** non observable version of the above */
	items: Array<T> = [];
	/** can be used on when to fetch more etc. */
	protected listResult: ListQuery<T>;
	// predicate that can be used at the start for filtering
	protected initialPredicate = 'deleted == false';
	protected currentSearch = '';
	/** property we sort by on first query */
	protected initialSortBy = 'creationDate';
	// filters coming from the filter panel if any.
	filterList = new FilterList([
		// initial filters
	]);
	/** Whether the items are pending */
	pending = true;
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, any>>;
	/** keeps tracks of the items selected on the current selection */
	selectedItems$: Observable<T[]>;
	/** current view */
	view: 'list' | 'card' = 'list';
	/** whether the filter panel is visible */
	filterPanelOpen: boolean;
	/** if all the selected items are favorite or not, to display a heart */
	allSelectedFavorite = true; // true by default for convenience, doesn't affect end result
	/** whether the preview panel is visible, the preview panel is the panel that opens
	 * when clicking an item in the table
	*/
	previewOpen: boolean;
	/** previewed item */
	previewed: T;
	/** dialog to edit an item in the list.. */
	protected editDlgComponent = EditionDialogComponent;

	/** for the smart search feature... */
	searchFilterElements$: Observable<any[]>;
	smartSearchFilterElements$: Observable<any[]>;

	constructor(
		protected router: Router,
		protected featureSrv: G,
		protected selectionSrv?: SelectionService,
		protected searchSrv?: SearchService,
		protected dlgSrv?: DialogService,
		protected moduleRef?: NgModuleRef<any>,
		protected entityMetadata?: EntityMetadata,
		protected thumbSrv?: ThumbService,
		protected createDlgComponent: new (...args: any[]) => any = CreationDialogComponent) {
		super();
	}

	/** init */
	ngOnInit() {
		this.setItems();
		this.setSelection();
		this.setFilters();
	}

	/** subscribe to items and get the list result */
	protected setItems() {
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
			map(items => items.filter(itm => !itm.deleted))
		);
	}

	/** when the filter change we want to refetch the items with a new predicate */
	protected setFilters() {
		this.filterList
			.valueChanges$
			.subscribe(_ => this.onPredicateChange());
	}

	/** gets the selection from the selection service */
	protected setSelection() {
		this.selected$ = this.selectionSrv.selection$;
		this.selectedItems$ = combineLatest(this.selected$, this.items$,
			(selected, items) => items.filter(item => selected.has(item.id))
		);
	}

	/** when the items are loading */
	protected onLoad() {
		this.pending = true;
	}

	/** when the items are loaded */
	protected onLoaded() {
		this.pending = false;
	}

	/**
	 * refetchs the query and will merge with existing config
	 */
	refetch(config?: SelectParamsConfig) {
		this.listResult.refetch(config).subscribe();
	}

	/**
	 * refetchs the query and will merge with existing config
	 */
	refetchWithAllFilters() {
		const allFilters = [
			this.initialPredicate,
			this.currentSearch,
			this.filterList.asPredicate()
		].filter(p => !!p).join(' AND ');
		this.refetch({ query: allFilters });
	}

	/** Loads more items when we reach the bottom of the page */
	loadMore() {
		this.listResult.fetchMore(this.items.length).subscribe();
	}

	/** Sorts items based on sort.sortBy */
	sort(sort: Sort) {
		this.refetch({ ...sort });
	}

	/** when we want to search through the list, by default we only search the name
	 * Override this to search more than just the name
	 */
	search(str: string) {
		// the search predicate
		this.currentSearch = str ? `name CONTAINS[c] "${str}"` : '';
		this.onPredicateChange();
	}

	/**
	 * On any of the predicate change we should call this to refetch
	 */
	onPredicateChange() {
		const allFilters = [
			this.initialPredicate,
			this.currentSearch,
			this.filterList.asPredicate()
		].filter(p => !!p).join(' AND ');

		this.refetch({ query: allFilters });
	}

	get selectionArray() {
		return Array.from(this.selectionSrv.selection.keys());
	}

	get selectionArrayItems() {
		return Array.from(this.selectionSrv.selection.values());
	}

	selectionItems() {
		return Array.from(this.selectionSrv.selection.values());
	}

	/** Search within filters */
	smartSearch(str: string) {
		if (this.searchSrv) {
			this.smartSearchFilterElements$ = this.searchSrv.searchFilterElements(str, this.filterList, this.entityMetadata);
		}
	}

	/** adds a filters to the list of filters */
	addFilter(filter: Filter) {
		this.filterList.addFilter(filter);
	}

	removeFilter(filter: Filter) {
		this.filterList.removeFilter(filter);
	}

	/** opens the preview for an item */
	openPreview(item: T) {
		this.previewed = item;
		this.previewOpen = true;
	}

	/** closes the preview */
	closePreview() {
		this.previewOpen = false;
	}

	/** Selects a an entity
	*  checkFavorite is used when you select a entity with favorite field
	*  and want to check if the selection bar should display a colorful heart or not */
	onItemSelected(entity: any, checkFavorite = false) {
		// we check only if the status is true since we only need to check if the next item will convert the select heart
		// into false
		if (checkFavorite && this.allSelectedFavorite)
			this.allSelectedFavorite = entity.favorite ? true : false;
		this.selectionSrv.selectOne(entity);
	}

	/** Unselects a entity
	 *  checkFavorite is used when you unselect a entity with favorite field
	 *  and want to check if the selection bar should display a colorful heart or not */
	onItemUnselected(entity: any, checkFavorite = false) {
		// we only check when the current status of the heart is false and when the unselected item is false too
		// this is because the only way it can be converted to true is by checking that the last item wasn't preventing
		// the heart of being true
		if (checkFavorite && (!this.allSelectedFavorite && !entity.favorite))
			this.allSelectedFavorite = !this.selectionItems().some(item => item.id !== entity.id && !item.favorite);
		this.selectionSrv.unselectOne(entity);
	}

	/** Select all entity */
	selectAll(entities: any[], checkFavorite = false) {
		// we check for each item if it has unfavorite, if it has we stop looking and update the icon to false
		if (checkFavorite && this.allSelectedFavorite) {
			this.allSelectedFavorite = entities.every(entity => entity.favorite);
		}
		this.selectionSrv.selectAll(entities);
	}

	/** Unselect all entity */
	resetSelection() {
		this.selectionSrv.unselectAll();
		this.allSelectedFavorite = true;
	}

	/** Update entities */
	updateSelected(value) {
		const items = Array.from(this.selectionSrv.selection.keys()).map(id => ({ ...value, id }));
		this.featureSrv.updateMany(items).subscribe(() => {
			this.resetSelection();
		});
	}

	/** Update a entity */
	update(entity: T, fields?: string | string[]) {
		this.featureSrv.update(entity, fields).subscribe();
	}

	/** Will show a confirm dialog to delete items selected */
	deleteSelected() {
		const items = Array.from(this.selectionSrv.selection.keys());
		// callback for confirm dialog
		const callback = () => {
			this.featureSrv.deleteMany(items).subscribe(() => {
				this.resetSelection();
			});
		};
		const text = `Delete ${items.length} ${items.length > 1 ? 'items' : 'item'} ?`;
		this.dlgSrv.open(ConfirmDialogComponent, { text, callback });
	}

	/** Deletes an specific item */
	deleteOne(itemId: string) {
		// const refetchParams = [{ query: this.refetchQuery, variables: this.currentParams.toApolloVariables() }];
		const callback = () => {
			this.featureSrv.delete(itemId/*, refetchParams*/).subscribe();
		};
		const text = `Are you sure you want to delete this item?`;
		this.dlgSrv.open(ConfirmDialogComponent, { text, callback });
	}

	/** Open details page of a product */
	goToDetails(itemId: string) {
		// TODO change to destination URL
		this.router.navigate([this.entityMetadata.singular, 'details', itemId]);
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
		this.selectionItems().forEach(item => this.onItemFavorited(item.id));
		this.allSelectedFavorite = true;
	}

	/** When we unfavorite all selected items, the items that are already unfavorited will stay the same */
	onUnfavoriteAllSelected() {
		this.selectionItems().forEach(item => this.onItemUnfavorited(item.id));
		this.allSelectedFavorite = false;
	}

	onThumbUp(product: Product) {
		const votes = this.thumbSrv.thumbUp(product);
		this.update({ id: product.id, votes } as any, `${ProductQueries.votes}`);
	}

	onThumbDown(product: Product) {
		const votes = this.thumbSrv.thumbDown(product);
		this.update({ id: product.id, votes } as any, `${ProductQueries.votes}`);
	}

	/**
	 * update the vote of a given selection of items (products) when given thumb up
	 * @param onHighlight indicates the future state of the thumb
	 */
	onMultipleThumbUp(onHighlight: boolean) {
		// BE AWARE THAT THIS IS USING THE FEATURE SERVICE TO UPDATE
		// if you are using another feature srv (as project) override this funcition
		this.selectionItems().forEach(item => {
			const votes = this.thumbSrv.thumbUpFromMulti(item, onHighlight);
			this.update({ id: item.id, votes } as any);
		});
	}

	/**
	 * update the vote of a given selection of items (products) when given thumb down
	 * @param onHighlight indicates the future state of the thumb
	 */
	onMultipleThumbDown(onHighlight: boolean) {
		// BE AWARE THAT THIS IS USING THE FEATURE SERVICE TO UPDATE
		// if you are using another feature srv (as project) override this funcition
		this.selectionItems().forEach(item => {
			const votes = this.thumbSrv.thumbDownFromMulti(item, onHighlight);
			this.update({ id: item.id, votes } as any);
		});
	}

	/** when filter button is clicked at the top we open the panel */
	openFilterPanel() {
		this.filterPanelOpen = true;
	}

	/** When we need to close the filter panel */
	closeFilterPanel() {
		this.filterPanelOpen = false;
	}

	/** Whenever we switch from list to card view */
	onViewChange(v: 'list' | 'card') {
		this.view = v;
	}

	/** opens the create dialog, redirects you to entityMetadata.createUrl if its truem otherwise it will stay on the same page */
	openCreateDlg(shouldRedirect: boolean = false) {
		this.dlgSrv.openFromModule(this.createDlgComponent, this.moduleRef, { type: this.entityMetadata, shouldRedirect: shouldRedirect });
	}

	/** opens the edit dialog, to change the name of an entity, if the enitty does not have a name attribute check Event model for example*/
	openEditDlg(entity: T) {
		this.dlgSrv.openFromModule(this.editDlgComponent, this.moduleRef, { type: this.entityMetadata, entity });
	}

}
