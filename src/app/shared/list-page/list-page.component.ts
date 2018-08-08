import { OnInit, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, ReplaySubject } from 'rxjs';
import { takeUntil, tap, map, switchMap } from 'rxjs/operators';
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
		this.items$ = this.selectParams$.pipe(
			tap(params => this.currentParams = params),
			takeUntil(this._destroy$),
			tap(_ => this.onLoad()),
			switchMap(param$ => this.featureSrv.selectMany(this.selectParams$)),
			tap(() => this.onLoaded())
		);
	}

	protected setSelection() {
		this.selected$ = this.selectionSrv.selection$;
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

	selectionItems() {
		return Array.from(this.selectionSrv.selection.values());
	}


	search(str: string) {
		this.filterSrv.upsertFilter({ type: FilterType.SEARCH, value: str });
		this.searchFilters(str);
	}

	smartSearch(str: string) {
		this.smartSearchFilters(str);
	}

	/** Search within filters */
	searchFilters(str: string) {
		this.searchFilterElements$ = this.searchSrv.searchFilterElements(str, this.filterSrv, this.entityMetadata);
	}

	/** Search within filters */
	smartSearchFilters(str: string) {
		this.smartSearchFilterElements$ = this.searchSrv.searchFilterElements(str, this.filterSrv, this.entityMetadata);
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

	protected onLoad() {
		this.pending = true;
	}

	protected onLoaded() {
		this.pending = false;
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
	}

	/** Selects a an entity */
	onItemSelected(entity: any) {
		this.selectionSrv.selectOne(entity);
	}

	/** Unselects a entity */
	onItemUnselected(entity: any) {
		this.selectionSrv.unselectOne(entity);
	}

	/** Select all entity */
	selectAll(entities: any[]) {
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
		// callback for confirm dialog
		const callback = () => {
			this.featureSrv.deleteMany(items).subscribe(() => {
				this.resetSelection();
			});
		};
		const text = `Delete ${items.length} ${items.length > 1 ? ERM.ITEM.plural : ERM.ITEM.singular} ?`;
		this.dlgSrv.open(ConfirmDialogComponent, { text, callback });
	}

	/** Deletes an specific item */
	deleteOne(itemId: string) {
		const callback = () => {
			this.featureSrv.deleteOne(itemId).subscribe();
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
