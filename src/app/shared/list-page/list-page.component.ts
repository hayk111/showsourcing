import { OnInit, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, ReplaySubject, combineLatest } from 'rxjs';
import { takeUntil, tap, map, switchMap, first } from 'rxjs/operators';
import { GlobalServiceInterface } from '~global-services/_global/global.service';
import { SelectParams } from '~global-services/_global/select-params';
import { ERM, EntityMetadata } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService, FilterType, SearchService } from '~shared/filters';
import { SelectionService } from '~shared/list-page/selection.service';
import { Sort } from '~shared/table/components/sort.interface';
import { AutoUnsub } from '~utils';
import { CreationDialogComponent, EditionDialogComponent } from '~shared/custom-dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { RefetchParams } from '~shared/apollo/services/refetch.interface';
import { DocumentNode } from 'graphql';

/**
 * Class used by components that need to display a list
 */
export abstract class ListPageComponent<T extends { id?: string }, G extends GlobalServiceInterface<T>>
	extends AutoUnsub implements OnInit {

	/** currently loaded items */
	items$: Observable<Array<T>>;
	/** non observable version of the above */
	items: Array<T> = [];
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
	/** if all the selected items are favorite or not by default is true but */
	allSelectedFavorite = true;
	/** whether the preview panel is visible, the preview panel is the panel that opens
	 * when clicking an item in the table
	*/
	previewOpen: boolean;
	/** previewed item */
	previewed: T;

	/** can be used on when deleting / creating an entity to refetch */
	private refetchQuery: DocumentNode;
	currentParams: SelectParams = new SelectParams();
	private _selectParams$ = new ReplaySubject<SelectParams>(1);
	protected selectParams$ = this._selectParams$.asObservable();
	protected editDlgComponent: new (...args: any[]) => any;

	searchFilterElements$: Observable<any[]>;
	smartSearchFilterElements$: Observable<any[]>;

	constructor(
		protected router: Router,
		protected featureSrv: G,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected searchSrv?: SearchService,
		protected dlgSrv?: DialogService,
		protected moduleRef?: NgModuleRef<any>,
		protected entityMetadata?: EntityMetadata,
		protected createDlgComponent: new (...args: any[]) => any = CreationDialogComponent) {
		super();
		this.editDlgComponent = EditionDialogComponent;
	}

	/** init */
	ngOnInit() {
		this.setFilters();
		this.setItems();
		this.setSelection();
	}



	protected setItems() {
		const selectList = this.featureSrv.selectInfiniteList(this.selectParams$);
		this.items$ = selectList.items$;
		this.refetchQuery = selectList.refetchQuery;

		this.items$.pipe(
			takeUntil(this._destroy$),
			tap(_ => this.onLoaded())
		).subscribe();
		// when param changes we are loading
		this.selectParams$.pipe(
			tap(params => this.currentParams = params),
			takeUntil(this._destroy$),
			tap(_ => this.onLoad()),
		).subscribe();
	}

	protected onLoad() {
		this.pending = true;
	}

	protected onLoaded() {
		this.pending = false;
	}

	protected setSelection() {
		this.selected$ = this.selectionSrv.selection$;
		this.selectedItems$ = combineLatest(this.selected$, this.items$,
			(selected, items) => {
				return items.filter(item => selected.has(item.id));
			});
	}

	protected setFilters() {
		// since filter is a behavior subject it will trigger instantly
		if (this.filterSrv) {
			this.filterSrv.query$.pipe(
				takeUntil(this._destroy$),
			).subscribe(query => this.filter(query));
		}
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


	search(str: string) {
		this.filterSrv.upsertFilter({ type: FilterType.SEARCH, value: str });
	}

	/** Search within filters */
	smartSearch(str: string) {
		if (this.searchSrv) {
			this.smartSearchFilterElements$ = this.searchSrv.searchFilterElements(str, this.filterSrv, this.entityMetadata);
		}
	}

	onCheckSearchElement(element) {
		this.filterSrv.addFilter({
			type: element.type,
			value: element.id,
			entity: element
		});
	}

	onUncheckSearchElement(element) {
		this.filterSrv.removeFilter({
			type: element.type,
			value: element.id,
			entity: element
		});
	}

	getFiltersNumber() {
		return this.filterSrv.filtersNumber();
	}

	/** Loads more items when we reach the bottom of the page */
	loadMore() {
		this._selectParams$.next(new SelectParams({
			page: ++this.currentParams.page,
			sort: this.currentParams.sort,
			query: this.currentParams.query,
			take: this.currentParams.take
		}));
	}

	nextPage() {
		this._selectParams$.next(new SelectParams({
			page: ++this.currentParams.page,
			sort: this.currentParams.sort,
			query: this.currentParams.query,
			take: this.currentParams.take
		}));
	}

	previousPage() {
		this._selectParams$.next(new SelectParams({
			page: --this.currentParams.page,
			sort: this.currentParams.sort,
			query: this.currentParams.query,
			take: this.currentParams.take
		}));
	}

	firstPage() {
		this._selectParams$.next(new SelectParams({
			page: 0,
			sort: this.currentParams.sort,
			query: this.currentParams.query,
			take: this.currentParams.take
		}));
	}

	/** Sorts items based on sort.sortBy */
	sort(sort: Sort) {
		this._selectParams$.next(new SelectParams({
			sort,
			query: this.currentParams.query,
			take: this.currentParams.take,
			page: 0
		}));
	}

	/** Filters items based  */
	protected filter(query: string) {
		this._selectParams$.next(new SelectParams({
			query,
			sort: this.currentParams.sort,
			take: this.currentParams.take,
			page: 0
		}));
	}

	/** opens the preview for an item */
	openPreview(item: T) {
		this.previewed = item;
		this.previewOpen = true;
	}

	/** closes the preview */
	closePreview() {
		this.previewOpen = false;
		this.allSelectedFavorite = true;
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
		if (checkFavorite && this.allSelectedFavorite) {
			entities.every(entity => {
				if (entity.favorite)
					return true;
				else {
					this.allSelectedFavorite = false;
					return false;
				}
			});
		}
		this.selectionSrv.selectAll(entities);
	}

	/** Unselect all entity */
	resetSelection() {
		this.selectionSrv.unselectAll();
	}

	/** Update entities */
	updateSelected(value) {
		const items = Array.from(this.selectionSrv.selection.keys()).map(id => ({ ...value, id }));
		this.featureSrv.updateMany(items).subscribe(() => {
			this.resetSelection();
		});
	}

	/** Update a entity */
	update(entity: T) {
		this.featureSrv.update(entity).subscribe();
	}

	/** Will show a confirm dialog to delete items selected */
	deleteSelected() {
		const items = Array.from(this.selectionSrv.selection.keys());
		const refetchParams = [{ query: this.refetchQuery, variables: this.currentParams.toApolloVariables() }];
		// callback for confirm dialog
		const callback = () => {
			this.featureSrv.deleteMany(items, refetchParams).subscribe(() => {
				this.resetSelection();
			});
		};
		const text = `Delete ${items.length} ${items.length > 1 ? ERM.ITEM.plural : ERM.ITEM.singular} ?`;
		this.dlgSrv.open(ConfirmDialogComponent, { text, callback });
	}

	/** Deletes an specific item */
	deleteOne(itemId: string) {
		const refetchParams = [{ query: this.refetchQuery, variables: this.currentParams.toApolloVariables() }];
		const callback = () => {
			this.featureSrv.deleteOne(itemId, refetchParams).subscribe();
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
		this.dlgSrv.openFromModule(this.editDlgComponent, this.moduleRef, { type: this.entityMetadata, entity: entity });
	}

}
