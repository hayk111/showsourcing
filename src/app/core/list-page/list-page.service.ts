import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDialogService } from '~common/dialog';
import { GlobalServiceInterface } from '~core/entity-services/_global/global.service';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { DialogService } from '~shared/dialog';
import { Filter } from '~shared/filters';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { Sort } from '~shared/table/components/sort.interface';

import { ListPageDataService } from './list-page-data.service';
import { ListPageViewService } from './list-page-view.service';
import { SelectionWithFavoriteService } from './selection-with-favorite.service';
import { Product, EntityMetadata } from '~core/models';
import { ListPageKey } from './list-page-keys.enum';
import { ListPageDataConfig } from './list-page-config.interface';


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
export class ListPageService<A, B extends GlobalServiceInterface<A>> {

	selectionSrv: SelectionWithFavoriteService;
	dataSrv: ListPageDataService<A, B>;
	viewSrv: ListPageViewService<A>;

	constructor(
		private commonDlgSrv: CommonDialogService,
		private router: Router,
		private dlgSrv: DialogService,
		private thumbSrv: ThumbService
	) { }

	setup(config: ListPageConfig, shouldInitDataLoading = true) {
		this.initServices(config.key);
		this.dataSrv.setup(config);
		this.viewSrv.setup(config.entityMetadata);

		// by default we start loading
		if (shouldInitDataLoading) {
			this.dataSrv.init();
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
			this.viewSrv = new ListPageViewService<A>(this.router);
			this.dataSrv = new ListPageDataService<A, B>(this.dlgSrv, this.thumbSrv, this.selectionSrv);

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
		this.dataSrv.updateSelected(value);
	}

	update(value: A) {
		this.dataSrv.update(value);
	}

	onItemFavorited(id: string) {
		this.dataSrv.onItemFavorited(id);
	}

	onItemUnfavorited(id: string) {
		this.dataSrv.onItemUnfavorited(id);
	}

	onFavoriteAllSelected() {
		this.dataSrv.onFavoriteAllSelected();
	}

	onUnfavoriteAllSelected() {
		this.dataSrv.onUnfavoriteAllSelected();
	}

	onThumbUp(item: A) {
		this.dataSrv.onThumbUp(item);
	}

	onThumbDown(item: A) {
		this.dataSrv.onThumbDown(item);
	}

	onMultipleThumbUp(isCreated: boolean) {
		this.dataSrv.onMultipleThumbUp(isCreated);
	}

	onMultipleThumbDown(isCreated: boolean) {
		this.dataSrv.onMultipleThumbDown(isCreated);
	}

	deleteSelected() {
		this.dataSrv.deleteSelected();
	}

	deleteOne(id: string) {
		this.dataSrv.deleteOne(id);
	}

	addFilter(filter: Filter) {
		this.dataSrv.addFilter(filter);
	}

	removeFilter(filter: Filter) {
		this.dataSrv.removeFilter(filter);
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

	openPreview(item: A) {
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

}
