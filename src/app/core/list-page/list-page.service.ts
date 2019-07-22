import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { empty, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil, tap, filter, map } from 'rxjs/operators';
import { CreationDialogComponent } from '~common/modals/component/creation-dialog/creation-dialog.component';
import { GlobalServiceInterface } from '~core/entity-services/_global/global.service';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { EntityMetadata } from '~core/models';
import { TemplateService } from '~core/template/services/template.service';
import { DialogService, CloseEventType, CloseEvent } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { Filter, FilterType } from '~shared/filters';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { Sort } from '~shared/table/components/sort.interface';

import { ListPageDataConfig } from './list-page-config.interface';
import { ListPageDataService } from './list-page-data.service';
import { ListPageKey } from './list-page-keys.enum';
import { ListPageViewService } from './list-page-view.service';
import { SelectionWithFavoriteService } from './selection-with-favorite.service';


// where we can save the services
const selectionSrvMap = new Map<ListPageKey | string, SelectionWithFavoriteService>();
const dataSrvMap = new Map<ListPageKey | string, ListPageDataService<any, any>>();
const viewSrvMap = new Map<ListPageKey | string, ListPageViewService<any>>();

export interface ListPageConfig extends ListPageDataConfig {
	key?: ListPageKey | string;
	entityMetadata: EntityMetadata;
	originComponentDestroy$?: Observable<void>;
}

/**
 * Helper service for list pages.
 *
 * It is supposed to be injected in the component providers and therefor is
 * supposed to be created with the component
 *
 * When created it will store the stateful subservices in maps above
 * Then when recreated a second time it will take the services from the map
 */
@Injectable({
	providedIn: 'root'
})
export class ListPageService
	<T extends { id?: string }, G extends GlobalServiceInterface<T>> {

	selectionSrv: SelectionWithFavoriteService;
	dataSrv: ListPageDataService<T, G>;
	viewSrv: ListPageViewService<T>;

	constructor(
		private router: Router,
		private thumbSrv: ThumbService,
		private dlgSrv: DialogService,
		private zone: NgZone
	) { }

	static reset() {
		selectionSrvMap.clear();
		dataSrvMap.clear();
		viewSrvMap.clear();
	}

	setup(config: ListPageConfig, shouldInitDataLoading = true) {
		this.zone.runOutsideAngular(() => {
			// getting back the services from their map
			this.initServices(config.key || '')
			this.dataSrv.setup(config);
			// setting up the view service so we know what panel is open etc
			this.viewSrv.setup(config.entityMetadata);
		});
		if (shouldInitDataLoading) {
			this.loadData(config.originComponentDestroy$);
		}
	}


	loadData(destroy$: Observable<void>) {
		if (!destroy$) {
			throw Error('Please provide a originComponentDestroyed$ observable');
		}

		this.dataSrv.loadData(destroy$);
		// we need to reset selection when filter changes
		this.dataSrv.filterList.valueChanges$.pipe(
			takeUntil(destroy$)
		).subscribe(_ => this.selectionSrv.unselectAll());
	}

	/**
	 * takes the existing stateful services from the maps above,
	 * this is done so we keep the state even when navigating
	 * from page to page. (angular component providers are recreated upon nav)
	 */
	private initServices(key: ListPageKey | string) {
		// we are gonna set the right services in the map
		this.selectionSrv = selectionSrvMap.get(key);
		this.viewSrv = viewSrvMap.get(key);
		this.dataSrv = dataSrvMap.get(key);
		// if any of those srv doesnt exist we reset the state
		if (!this.selectionSrv || !this.viewSrv || !this.dataSrv) {
			// we have to create instance manually instead of injecting those
			this.selectionSrv = new SelectionWithFavoriteService();
			this.viewSrv = new ListPageViewService<T>(this.router);
			this.dataSrv = new ListPageDataService<T, G>();

			selectionSrvMap.set(key, this.selectionSrv);
			viewSrvMap.set(key, this.viewSrv);
			dataSrvMap.set(key, this.dataSrv);
		}
	}

	/** Here we are gonna bridge the functions from the other services */

	/** bridge for data service */

	get items$() {
		return this.dataSrv.items$;
	}

	get pending() {
		return this.dataSrv.pending;
	}

	get count$() {
		return this.dataSrv.count$;
	}

	get skipped() {
		return this.dataSrv.selectParams.skip;
	}

	get isListening() {
		return this.dataSrv.isListening;
	}

	get smartSearchFilterElements$() {
		return this.dataSrv.smartSearchFilterElements$;
	}

	get filterList() {
		return this.dataSrv.filterList;
	}

	get currentSort() {
		return {
			sortBy: this.dataSrv.selectParams.sortBy,
			descending: this.dataSrv.selectParams.descending
		};
	}

	get searchValue() {
		return this.filterList.search;
	}

	refetch(config?: SelectParamsConfig) {
		return this.dataSrv.refetch(config);
	}

	loadMore() {
		this.dataSrv.loadMore().subscribe();
	}

	loadPage(page: number) {
		this.dataSrv.loadPage(page).subscribe(_ => this.selectionSrv.unselectAll());
	}

	loadNextPage() {
		this.dataSrv.loadNextPage().subscribe(_ => this.selectionSrv.unselectAll());
	}

	loadPreviousPage() {
		this.dataSrv.loadPreviousPage().subscribe(_ => this.selectionSrv.unselectAll());
	}

	loadFirstPage() {
		this.dataSrv.loadFirstPage().subscribe(_ => this.selectionSrv.unselectAll());
	}

	loadLastPage() {
		this.dataSrv.loadLastPage().subscribe(_ => this.selectionSrv.unselectAll());
	}

	sort(sort: Sort) {
		this.dataSrv.sort(sort).subscribe();
	}

	sortFromMenu(fieldName: string) {
		this.dataSrv.sortFromMenu(fieldName).subscribe();
	}

	search(str: string) {
		this.dataSrv.search(str);
	}

	updateSelected(value: any) {
		const items = this.getSelectedIds()
			.map(id => ({ id, ...value }));
		this.dataSrv.updateMany(items).subscribe();
	}

	update(value: T) {
		this.dataSrv.update(value).subscribe();
		// .pipe(
		// 	// sometimes the optimistic ui fails for some odd reason when updating the supplier of a product
		// 	// so we just refetch to cover the bug, fuck this.
		// 	switchMap(_ => this.refetch())
		// ).subscribe();
	}

	updateMany(values: T[]) {
		this.dataSrv.updateMany(values).pipe(
			switchMap(_ => this.refetch())
		).subscribe();
	}

	onItemFavorited(id: string) {
		this.dataSrv.update({ id, favorite: true } as any).subscribe();
	}

	onItemUnfavorited(id: string) {
		this.dataSrv.update({ id, favorite: false } as any).subscribe();
	}

	onFavoriteAllSelected() {
		const elems: any[] = this.getSelectedIds()
			.map(id => ({ id, favorite: true }));
		this.updateMany(elems);
		this.selectionSrv.allSelectedFavorite = true;
	}

	onUnfavoriteAllSelected() {
		const elems: any[] = this.getSelectedIds()
			.map(id => ({ id, favorite: false }));
		this.updateMany(elems);
		this.selectionSrv.allSelectedFavorite = false;
	}

	onThumbUp(item: T) {
		const votes = this.thumbSrv.thumbUp(item);
		return this.dataSrv.update({ id: item.id, votes } as any).subscribe();
	}

	onThumbDown(item: T) {
		const votes = this.thumbSrv.thumbDown(item);
		return this.dataSrv.update({ id: item.id, votes } as any).subscribe();
	}

	/**
	 * update the vote of a given selection of items (products) when given thumb up
	 * @param isCreated if true the vote is created, if false, removed
	 */
	onMultipleThumbUp(isCreated: boolean) {
		const updated = [];
		this.getSelectedValues().forEach(item => {
			const votes = this.thumbSrv.thumbUpFromMulti(item, isCreated);
			updated.push({ id: item.id, votes });
		});
		this.dataSrv.updateMany(updated).subscribe();
		return updated;
	}

	/**
 * update the vote of a given selection of items (products) when given thumb down
 * @param isCreated if true the vote is created, if false, removed
 */
	onMultipleThumbDown(isCreated: boolean) {
		const updated = [];
		this.getSelectedValues().forEach(item => {
			const votes = this.thumbSrv.thumbDownFromMulti(item, isCreated);
			updated.push({ id: item.id, votes });
		});
		this.dataSrv.updateMany(updated).subscribe();
		return updated;
	}

	// entities with audit have the flag deleted, so when they are deleted they are actually updated
	// then the query list gets "refetched" automatically since a value inside got updated
	// but for entities who do NOT have audith we need to refresh it manually since we are deleting it
	// and not updating it
	deleteOne(entity: T, refetch = false) {
		const text = `Are you sure you want to delete this ${this.entityMetadata.singular} ?`;
		this.dlgSrv.open(ConfirmDialogComponent, { text })
			.pipe(
				tap(_ => this.selectionSrv.unselectOne(entity)),
				switchMap(_ => this.dataSrv.deleteOne(entity.id)),
				switchMap(_ => refetch ? this.refetch() : empty())
			).subscribe();
	}

	// read comment on deleteOne function
	deleteSelected(refetch = false) {
		const itemIds = this.getSelectedIds();
		// TODO i18n + erm pipe
		const text = `Delete ${itemIds.length} `
			+ (itemIds.length <= 1 ? this.entityMetadata.singular : this.entityMetadata.plural) + '?';
		this.dlgSrv.open(ConfirmDialogComponent, { text }).pipe(
			filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
			switchMap(_ => this.dataSrv.deleteMany(itemIds)),
			switchMap(_ => refetch ? this.refetch() : empty())
		).subscribe(_ => {
			this.selectionSrv.unselectAll();
		});
	}

	/** creates a new entity, can also create with defaul values with extra?: any */
	create(canRedirect = true, extra?: any) {
		this.dlgSrv.open(CreationDialogComponent, { type: this.entityMetadata, extra, canRedirect }).pipe(
			filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
			map((evt: CloseEvent) => evt.data)
		).subscribe(({ item, redirect }) => {
			// we don't want to put this in a switchmap because we don't want to wait
			// for the refect before redirecting
			this.refetch().subscribe();
			if (redirect)
				this.redirectToCreated(item.id);
		});
	}


	private redirectToCreated(id: string) {
		if (this.entityMetadata.destUrl)
			this.router.navigate([this.entityMetadata.destUrl, id]);
		else
			throw Error(`no destination url`);
	}

	addFilter(_filter: Filter) {
		this.dataSrv.addFilter(_filter);
	}

	removeFilter(_filter: Filter) {
		this.dataSrv.removeFilter(_filter);
	}

	removeFilterType(filterType: FilterType) {
		this.dataSrv.removeFilterType(filterType);
	}

	smartSearch(event: any) {
		this.dataSrv.smartSearch(event);
	}

	/** bridge for view service */

	get view() {
		return this.viewSrv.view;
	}

	get filterPanelOpen() {
		return this.viewSrv.filterPanelOpen;
	}

	get previewOpen() {
		return this.viewSrv.previewOpen;
	}

	get previewed() {
		return this.viewSrv.previewed;
	}

	get entityMetadata() {
		return this.viewSrv.entityMetadata;
	}

	openPreview(item: T) {
		this.viewSrv.openPreview(item);
	}

	closePreview() {
		this.viewSrv.closePreview();
	}

	goToDetails(id: string) {
		this.viewSrv.goToDetails(id);
	}

	openFilterPanel() {
		this.viewSrv.openFilterPanel();
	}

	closeFilterPanel() {
		this.viewSrv.closeFilterPanel();
	}

	changeView(view: 'list' | 'card') {
		this.viewSrv.changeView(view);
	}

	/**
	 * Bridge for selectionSrv
	 */

	get selection$() {
		return this.selectionSrv.selection$;
	}

	get selection() {
		return this.selectionSrv.selection;
	}

	get allSelectedFavorite() {
		return this.selectionSrv.allSelectedFavorite;
	}

	selectOne(entity: any, checkFavorite?: boolean) {
		this.selectionSrv.selectOne(entity, checkFavorite);
	}

	unselectOne(entity: any, checkFavorite?: boolean) {
		this.selectionSrv.unselectOne(entity, checkFavorite);
	}

	selectAll(entities: any[], checkFavorite?: boolean) {
		this.selectionSrv.selectAll(entities, checkFavorite);
	}

	unselectAll() {
		this.selectionSrv.unselectAll();
	}

	getSelectedIds() {
		return this.selectionSrv.getSelectionIds();
	}

	getSelectedValues() {
		return this.selectionSrv.getSelectionValues();
	}

}
