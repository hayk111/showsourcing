import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { GlobalServiceInterface } from '~global-services/_global/global.service';
import { SelectParams } from '~global-services/_global/select-params';
import { ERM, ReadProperty } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService } from '~shared/filters';
import { SelectionService } from '~shared/list-page/selection.service';
import { Sort } from '~shared/table/components/sort.interface';
import { AutoUnsub } from '~utils';

/**
 * Class used by components that need to display a list
 */
export abstract class ListPageComponent<T extends { id: string }, G extends GlobalServiceInterface<T>>
	extends AutoUnsub implements OnInit {

	/** currently loaded items */
	items$: Observable<Array<T>>;
	/** non observable version of the above */
	items: Array<T> = [];
	/** Whether the items are pending */
	pending = false;
	/** when the items are loaded for the first time */
	initialLoading = true;
	/** keeps tracks of the current selection */
	selected$: Observable<Map<string, boolean>>;
	/** current view */
	view: 'list' | 'card' = 'list';
	/** whether the filter panel is visible */
	filterPanelOpen: boolean;
	/** whether the preview panel is visible, the preview panel is the panel that opens
	 * when clicking an item in the table
	*/
	previewOpen: boolean;
	/** previewed item */
	previewed: T;

	private currentParams: SelectParams = new SelectParams();
	private _selectParams$ = new BehaviorSubject<SelectParams>(this.currentParams);
	private selectParams$ = this._selectParams$.asObservable();

	constructor(
		protected router: Router,
		protected featureSrv: G,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected dlgSrv: DialogService,
		protected readProperty?: ReadProperty,
		protected createDlgComponent?: new (...args: any[]) => any) {
		super();
	}

	/** Connects products for the page */
	ngOnInit() {
		this.pending = true;
		this.items$ = this.featureSrv.selectMany(this.selectParams$)
			.pipe(
				// when loaded the pending status needs to be false
				tap(() => this.onLoaded())
			);
		this.selected$ = this.selectionSrv.selection$;
		// since filter is a behavior subject it will trigger instantly
		if (this.filterSrv) {
			this.filterSrv.query$.pipe(
				takeUntil(this._destroy$),
			).subscribe(query => this.filter(query));
		}
	}

	private onLoaded() {
		if (this.initialLoading) {
			this.pending = false;
			this.initialLoading = false;
		}
	}

	/** Loads more items when we reach the bottom of the page */
	loadMore() {
		this._selectParams$.next(new SelectParams({
			page: this.currentParams.page++,
			sort: this.currentParams.sort,
			query: this.currentParams.query
		}));
	}

	/** Sorts items based on sort.sortBy */
	sort(sort: Sort) {
		this._selectParams$.next(new SelectParams({ sort, query: this.currentParams.query }));
	}

	/** Filters items based  */
	private filter(query: string) {
		this._selectParams$.next(new SelectParams({ query, sort: this.currentParams.sort }));
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

	/** Selects a an entity */
	onItemSelected(entityId: string) {
		this.selectionSrv.selectOne(entityId);
	}

	/** Unselects a entity */
	onItemUnselected(entityId: string) {
		this.selectionSrv.unselectOne(entityId);
	}

	/** Select all entity */
	selectAll(ids: string[]) {
		this.selectionSrv.selectAll(ids);
	}

	/** Unselect all entity */
	resetSelection() {
		this.selectionSrv.unselectAll();
	}

	/** Update a entity */
	update(entity: T) {
		this.featureSrv.update(entity).subscribe();
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
		const text = `Delete ${items.length} ${items.length > 1 ? ERM.ITEM.plural : ERM.ITEM.singular} ?`;
		this.dlgSrv.open(this.createDlgComponent, { text, callback });
	}

	/** Deletes an specific item */
	deleteItem(itemId: string) {

	}

	/** Open details page of a product */
	goToDetails(itemId: string) {
		this.router.navigate([this.readProperty.singular, ERM.DETAIL.plural, itemId]);
	}

	/** When a product heart is clicked to favorite it */
	onItemFavorited(id: string) {
		this.update({ id, favorite: true } as any);
	}

	/** When a product heart is clicked to unfavorite it */
	onItemUnfavorited(id: string) {
		this.update({ id, favorite: false } as any);
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

	openCreateDlg() {
		this.dlgSrv.open(this.createDlgComponent);
	}

}
