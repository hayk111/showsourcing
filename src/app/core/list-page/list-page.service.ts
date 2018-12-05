import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDialogService } from '~common/dialog';
import { GlobalServiceInterface } from '~core/entity-services/_global/global.service';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { EntityMetadata } from '~core/models';
import { DialogService } from '~shared/dialog';
import { Filter, FilterType } from '~shared/filters';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { Sort } from '~shared/table/components/sort.interface';

import { ListPageDataConfig } from './list-page-config.interface';
import { ListPageDataService } from './list-page-data.service';
import { ListPageKey } from './list-page-keys.enum';
import { ListPageViewService } from './list-page-view.service';
import { SelectionWithFavoriteService } from './selection-with-favorite.service';


// where we can save the services
const selectionSrvMap = new Map<ListPageKey, SelectionWithFavoriteService>();
const dataSrvMap = new Map<ListPageKey, ListPageDataService<any, any>>();
const viewSrvMap = new Map<ListPageKey, ListPageViewService<any>>();

export interface ListPageConfig extends ListPageDataConfig {
	key: ListPageKey;
	entityMetadata: EntityMetadata;
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
export class ListPageService<T extends { id?: string }, G extends GlobalServiceInterface<T>> {

	selectionSrv: SelectionWithFavoriteService;
	dataSrv: ListPageDataService<T, G>;
	viewSrv: ListPageViewService<T>;

	constructor(
		private commonDlgSrv: CommonDialogService,
		private router: Router,
		private thumbSrv: ThumbService,
	) {
	}

	setup(config: ListPageConfig, shouldInitDataLoading = true) {
		this.initServices(config.key);
		this.dataSrv.setup(config);
		this.viewSrv.setup(config.entityMetadata);

		// by default we start loading
		if (shouldInitDataLoading) {
			this.dataSrv.loadData();
		}
	}

	/**
	 * takes the existing stateful services from the maps above,
	 * this is done so we keep the state even when navigating
	 * from page to page. (angular component providers are recreated upon nav)
	 */
	private initServices(key: ListPageKey) {
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

	get smartSearchFilterElements$() {
		return this.dataSrv.smartSearchFilterElements$;
	}

	get filterList() {
		return this.dataSrv.filterList;
	}

	refetch(config?: SelectParamsConfig) {
		this.dataSrv.refetch(config);
	}

	loadMore() {
		this.dataSrv.loadMore();
	}

	sort(sort: Sort) {
		this.dataSrv.sort(sort);
	}

	sortFromMenu(fieldName: string) {
		this.dataSrv.sortFromMenu(fieldName);
	}

	search(str: string) {
		this.dataSrv.search(str);
	}

	updateSelected(value: any) {
		const ids = this.getSelectedIds()
			.map(id => ({ id, ...value }));
		this.dataSrv.updateMany(value).subscribe();
	}

	update(value: T) {
		this.dataSrv.update(value).subscribe();
	}

	onItemFavorited(id: string) {
		this.dataSrv.update({ id, favorite: false } as any).subscribe();
	}

	onItemUnfavorited(id: string) {
		this.dataSrv.update({ id, favorite: false } as any).subscribe();
	}

	onFavoriteAllSelected() {
		const ids = this.getSelectedIds();
		ids.forEach(id => this.onItemFavorited(id));
		this.selectionSrv.allSelectedFavorite = true;
	}

	onUnfavoriteAllSelected() {
		/** When we unfavorite all selected items, the items that are already unfavorited will stay the same */
		this.getSelectedIds()
			.forEach(id => this.onItemUnfavorited(id));
		this.selectionSrv.allSelectedFavorite = false;
	}

	onThumbUp(item: T) {
		const votes = this.thumbSrv.thumbUp(item);
		return this.dataSrv.update({ id: item.id, votes } as any);
	}

	onThumbDown(item: T) {
		const votes = this.thumbSrv.thumbDown(item);
		return this.update({ id: item.id, votes } as any);
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
	}

	deleteOne(id: string) {
		const callback = () => this.dataSrv.deleteOne(id).subscribe(_ => this.refetch());
		const text = `Are you sure you want to delete this item?`;
		this.commonDlgSrv.openConfirmDialog({ text, callback });
	}

	deleteSelected() {
		const itemIds = this.getSelectedIds();
		// callback for confirm dialog
		const callback = () => {
			this.dataSrv.deleteMany(itemIds).subscribe(_ => {
				this.selectionSrv.unselectAll();
				this.refetch();
			});
		};
		const text = `Delete ${itemIds.length} ${itemIds.length > 1 ? 'items' : 'item'} ?`;
		this.commonDlgSrv.openConfirmDialog({ text, callback });
	}

	addFilter(filter: Filter) {
		this.dataSrv.addFilter(filter);
	}

	removeFilter(filter: Filter) {
		this.dataSrv.removeFilter(filter);
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
