import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { empty, Observable, of } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CreationDialogComponent } from '~common/dialogs/creation-dialogs';
import { ExportDlgComponent } from '~common/dialogs/custom-dialogs';
import { UserService } from '~core/orm/services';
import { GlobalServiceInterface } from '~core/orm/services/_global/global.service';
import { SelectParamsConfig } from '~core/orm/services/_global/select-params';
import { EntityMetadata } from '~core/orm/models';
import { View } from '~shared/controller-table/components';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { Filter, FilterType } from '~shared/filters';
import { RatingService, TypeWithVotes } from '~shared/rating/services/rating.service';
import { Sort } from '~shared/table/components/sort.interface';
import { showsourcing } from '~utils/debug-object.utils';
import { ListPageDataConfig } from './list-page-config.interface';
import { ListPageDataService } from './list-page-data.service';
import { ListPageViewService } from './list-page-view.service';
import { ToastService, ToastType } from '~shared/toast';
import { SelectionService } from './selection.service';
import { KanbanSelectionService } from '~shared/kanban/services/kanban-selection.service';


// It has four legs and it can fly, what is it?
// -
// Two birds.

// TODO: refacotr needed to make it more modulable. For example see product-activity.ts


export interface ListPageConfig extends ListPageDataConfig {
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

	selectionSrv: SelectionService;
	dataSrv: ListPageDataService<T, G>;
	viewSrv: ListPageViewService<T>;

	constructor(
		private router: Router,
		private ratingSrv: RatingService,
		private dlgSrv: DialogService,
		private zone: NgZone,
		private userSrv: UserService,
		private toastSrv: ToastService,
	) {
		if (!showsourcing.tables) {
			showsourcing.tables = {};
		}
		this.initServices();
	}

	setup(config: ListPageConfig, shouldInitDataLoading = true) {
		this.zone.runOutsideAngular(() => {
			this.dataSrv.setup(config);
			// setting up the view service so we know what panel is open etc
			this.viewSrv.setup(config.entityMetadata);
			// storing the state for debugging purpose
			showsourcing.tables[config.entityMetadata.singular] = this;
		});
		if (shouldInitDataLoading) {
			this.loadData(config.originComponentDestroy$);
		}
	}


	loadData(destroy$: Observable<void>) {
		if (!destroy$) {
			throw Error('Please provide a originComponentDestroyed$ observable');
		}
		this.closePreview();
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
	private initServices() {
		this.selectionSrv = new SelectionService();
		this.viewSrv = new ListPageViewService<T>(this.router);
		this.dataSrv = new ListPageDataService<T, G>();
	}

	/** Here we are gonna bridge the functions from the other services */

	/** bridge for data service */

	get items$() {
		return this.dataSrv.items$;
	}

	get selectableItems$() {
		return this.items$;
	}

	combine(items: Observable<any>) {
		this.dataSrv.combineItems(items);
	}

	get currentPage() {
		return this.dataSrv.currentPage;
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

	get filterList() {
		return this.dataSrv.filterList;
	}

	get currentSort() {
		return {
			sortBy: this.dataSrv.selectParams.sortBy,
			descending: this.dataSrv.selectParams.descending
		};
	}

	get isFiltering() {
		// when searching or filtering by non initial filters
		return !!this.filterList.search || (this.filterList.asFilters().length > this.filterList.initialFilters.length);
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

	loadPage(page: number, config?: SelectParamsConfig) {
		this.dataSrv.loadPage(page, config).subscribe(_ => this.selectionSrv.unselectAll());
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
		this.dataSrv.update(value).pipe(
		).subscribe();
	}

	updateMany(values: T[]) {
		this.dataSrv.updateMany(values).pipe(
		).subscribe();
	}

	onItemFavorited(id: string) {
		this.dataSrv.update({ id, favorite: true } as any).subscribe();
	}

	onItemUnfavorited(id: string) {
		this.dataSrv.update({ id, favorite: false } as any).subscribe();
	}

	onThumbUp(item: T, type: TypeWithVotes) {
		const votes = this.ratingSrv.thumbUp(item, type);
		return this.dataSrv.update({ id: item.id, votes } as any).subscribe();
	}

	onThumbDown(item: T, type: TypeWithVotes) {
		const votes = this.ratingSrv.thumbDown(item, type);
		return this.dataSrv.update({ id: item.id, votes } as any).subscribe();
	}

	/**
	 * update the vote of a given selection of items (products) when given thumb up
	 * @param isCreated if true the vote is created, if false, removed
	 */
	onMultipleThumbUp(isCreated: boolean, type: TypeWithVotes) {
		const updated = [];
		this.getSelectedValues().forEach(item => {
			const votes = this.ratingSrv.thumbUpFromMulti(item, isCreated, type);
			updated.push({ id: item.id, votes });
		});
		this.dataSrv.updateMany(updated).subscribe();
		return updated;
	}

	/**
 * update the vote of a given selection of items (products) when given thumb down
 * @param isCreated if true the vote is created, if false, removed
 */
	onMultipleThumbDown(isCreated: boolean, type: TypeWithVotes) {
		const updated = [];
		this.getSelectedValues().forEach(item => {
			const votes = this.ratingSrv.thumbDownFromMulti(item, isCreated, type);
			updated.push({ id: item.id, votes });
		});
		this.dataSrv.updateMany(updated).subscribe();
		return updated;
	}

	// entities with audit have the flag deleted, so when they are deleted they are actually updated
	// then the query list gets "refetched" automatically since a value inside got updated
	// but for entities who do NOT have audith we need to refresh it manually since we are deleting it
	// and not updating it
	deleteOne(entity: T, refetch = false, callback?: () => void) {
		const text = `Are you sure you want to delete this ${this.entityMetadata.singular} ?`;
		this.dlgSrv.open(ConfirmDialogComponent, { text })
			.pipe(
				tap(_ => this.selectionSrv.unselectOne(entity)),
				filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
				switchMap(_ => this.dataSrv.deleteOne(entity.id)),
				tap(_ => callback()),
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
			// unselect must go before refetch, otherwise it won't update
			tap(_ => this.selectionSrv.unselectAll()),
			switchMap(_ => refetch ? this.refetch() : empty())
		).subscribe();
	}

	/** creates a new entity, can also create with defaul values with extra?: any */
	create(canRedirect = false, extra?: any) {
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

	archiveOne(entity: T) {
		this.dataSrv.update({ id: entity.id, archived: true } as unknown as T)
			.pipe(switchMap(_ => this.refetch()))
			.subscribe(_ => {
				this.toastSrv.add({
					type: ToastType.SUCCESS,
					title: 'title.item-archived',
					message: 'message.item-archived-successfully'
				});
			});
	}

	archiveMany(entities: T[]) {
		this.dataSrv.updateMany(
			entities.map(entity => ({ id: entity.id, archived: true } as unknown as T))
		).pipe(switchMap(_ => this.refetch()))
			.subscribe(_ => {
				this.toastSrv.add({
					type: ToastType.SUCCESS,
					title: 'title.items-archived',
					message: 'message.items-archived-successfully'
				});
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

	resetFilters() {
		this.dataSrv.filterList.reset();
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

	changeView(view: View) {
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

	selectOne(entity: any) {
		this.selectionSrv.selectOne(entity);
	}

	unselectOne(entity: any) {
		this.selectionSrv.unselectOne(entity);
	}

	selectAll(entities: any[]) {
		this.selectionSrv.selectAll(entities);
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

	getFilterAmount(): number {
		const filters = this.filterList.asFilters()
			.filter(fil => !this.filterList.initialFilters.some(elem => elem.type === fil.type && elem.value === fil.value));
		return filters.length;
	}

	/** filter by archived, attention, weird logic:
	 * if shouldAdd is true we the products archived
	 * if shouldAdd is false we only see the not archived + not archived */
	filterByArchived(shouldAdd: boolean) {
		const filterParam = { type: FilterType.ARCHIVED, value: false };

		if (shouldAdd) {
			this.addFilter(filterParam);
			return;
		}

		this.removeFilter(filterParam);
	}

	filterByAssignedToMe(shouldAdd: boolean) {
		const filterParam = { type: FilterType.ASSIGNEE, value: this.userSrv.userId };

		if (shouldAdd) {
			this.addFilter(filterParam);
			return;
		}

		this.removeFilter(filterParam);
	}

	/** filter by done, attention, weird logic:
	 * if shouldAdd is true we the products done
	 * if shouldAdd is false we only see the not done + not done */
	filterByDone(shouldAdd: boolean) {
		const filterParam = { type: FilterType.DONE, value: false };

		if (shouldAdd) {
			this.addFilter(filterParam);
			return;
		}

		this.removeFilter(filterParam);
	}

	filterByCreatedByMe(shouldAdd: boolean) {
		const filterParam = { type: FilterType.CREATED_BY, value: this.userSrv.userId };

		if (shouldAdd) {
			this.addFilter(filterParam);
			return;
		}

		this.removeFilter(filterParam);
	}

	exportSelection() {
		this.dlgSrv.open(ExportDlgComponent, { targets: this.getSelectedValues() });
	}

	exportAll() {
		this.dlgSrv.open(ExportDlgComponent, { query: 'deleted == false AND archived == false', type: this.entityMetadata.entityName });
	}
}
