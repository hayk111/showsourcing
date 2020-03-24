import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { empty, Observable } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { CreationDialogComponent } from '~common/dialogs/creation-dialogs';
import { ExportDlgComponent } from '~common/dialogs/custom-dialogs';
import {
	Entity,
	EntityMetadata,
	GlobalServiceInterface,
	SelectParamsConfig,
	UserService
} from '~core/erm';
import { CloseEvent, CloseEventType, DialogService } from '~shared/dialog';
import { ConfirmDialogComponent } from '~shared/dialog/containers/confirm-dialog/confirm-dialog.component';
import { FilterService } from '~core/filters';
import {
	RatingService,
	TypeWithVotes
} from '~shared/rating/services/rating.service';
import { Sort } from '~shared/table/components/sort.interface';
import { ToastService, ToastType } from '~shared/toast';
import { showsourcing } from '~utils/debug-object.utils';
import { ListPageDataConfig } from './list-page-config.interface';
import { ListPageDataService } from './list-page-data.service';
import { ListPageViewService } from './list-page-view.service';
import { SelectionService } from './selection.service';

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
export class ListPageService<
	T extends Entity,
	G extends GlobalServiceInterface<T>
> {
	selectionSrv: SelectionService;
	dataSrv: ListPageDataService<T, G>;
	viewSrv: ListPageViewService<T>;
	filterSrv: FilterService;

	constructor(
		private router: Router,
		private ratingSrv: RatingService,
		private dlgSrv: DialogService,
		private zone: NgZone,
		private userSrv: UserService,
		private toastSrv: ToastService
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
		this.viewSrv.closePreview();
		this.dataSrv.loadData(destroy$);
		// we need to reset selection when filter changes
		this.filterSrv.valueChanges$
			.pipe(takeUntil(destroy$))
			.subscribe(_ => this.selectionSrv.unselectAll());
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
		this.filterSrv.setup();
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

	get currentSort() {
		return {
			sortBy: this.dataSrv.selectParams.sortBy,
			descending: this.dataSrv.selectParams.descending
		};
	}

	refetch(config?: SelectParamsConfig) {
		return this.dataSrv.refetch(config);
	}

	loadMore() {
		this.dataSrv.loadMore().subscribe();
	}

	loadPage(page: number, config?: SelectParamsConfig) {
		this.dataSrv
			.loadPage(page, config)
			.subscribe(_ => this.selectionSrv.unselectAll());
	}

	loadNextPage() {
		this.dataSrv.loadNextPage().subscribe(_ => this.selectionSrv.unselectAll());
	}

	loadPreviousPage() {
		this.dataSrv
			.loadPreviousPage()
			.subscribe(_ => this.selectionSrv.unselectAll());
	}

	loadFirstPage() {
		this.dataSrv
			.loadFirstPage()
			.subscribe(_ => this.selectionSrv.unselectAll());
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
		const items = this.selectionSrv
			.getSelectedIds()
			.map(id => ({ id, ...value }));
		this.dataSrv.updateMany(items).subscribe();
	}

	update(value: T) {
		this.dataSrv
			.update(value)
			.pipe()
			.subscribe();
	}

	updateMany(values: T[]) {
		this.dataSrv
			.updateMany(values)
			.pipe()
			.subscribe();
	}

	onItemUnfavorited(id: string) {
		this.dataSrv.update({ id, favorite: false } as any).subscribe();
	}


	// entities with audit have the flag deleted, so when they are deleted they are actually updated
	// then the query list gets "refetched" automatically since a value inside got updated
	// but for entities who do NOT have audith we need to refresh it manually since we are deleting it
	// and not updating it
	deleteOne(entity: T, refetch = false, callback?: () => void) {
		const text = `Are you sure you want to delete this ${this.viewSrv.entityMetadata.singular} ?`;
		this.dlgSrv
			.open(ConfirmDialogComponent, { text })
			.pipe(
				tap(_ => this.selectionSrv.unselectOne(entity)),
				filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
				switchMap(_ => this.dataSrv.deleteOne(entity.id)),
				tap(_ => callback()),
				switchMap(_ => (refetch ? this.refetch() : empty()))
			)
			.subscribe();
	}

	// read comment on deleteOne function
	deleteSelected(refetch = false) {
		const itemIds = this.selectionSrv.getSelectedIds();
		// TODO i18n + erm pipe
		const text =
			`Delete ${itemIds.length} ` +
			(itemIds.length <= 1
				? this.viewSrv.entityMetadata.singular
				: this.viewSrv.entityMetadata.plural) +
			'?';
		this.dlgSrv
			.open(ConfirmDialogComponent, { text })
			.pipe(
				filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
				switchMap(_ => this.dataSrv.deleteMany(itemIds)),
				// unselect must go before refetch, otherwise it won't update
				tap(_ => this.selectionSrv.unselectAll()),
				switchMap(_ => (refetch ? this.refetch() : empty()))
			)
			.subscribe();
	}

	/** creates a new entity, can also create with defaul values with extra?: any */
	create(canRedirect = false, extra?: any) {
		this.dlgSrv
			.open(CreationDialogComponent, {
				type: this.viewSrv.entityMetadata,
				extra,
				canRedirect
			})
			.pipe(
				filter((evt: CloseEvent) => evt.type === CloseEventType.OK),
				map((evt: CloseEvent) => evt.data)
			)
			.subscribe(({ item, redirect }) => {
				// we don't want to put this in a switchmap because we don't want to wait
				// for the refect before redirecting
				this.refetch().subscribe();
				if (redirect) this.redirectToCreated(item.id);
			});
	}

	archiveOne(entity: T) {
		this.dataSrv
			.update(({ id: entity.id, archived: true } as unknown) as T)
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
		this.dataSrv
			.updateMany(
				entities.map(
					entity => (({ id: entity.id, archived: true } as unknown) as T)
				)
			)
			.pipe(switchMap(_ => this.refetch()))
			.subscribe(_ => {
				this.toastSrv.add({
					type: ToastType.SUCCESS,
					title: 'title.items-archived',
					message: 'message.items-archived-successfully'
				});
			});
	}

	private redirectToCreated(id: string) {
		if (this.viewSrv.entityMetadata.destUrl)
			this.router.navigate([this.viewSrv.entityMetadata.destUrl, id]);
		else throw Error(`no destination url`);
	}

	exportSelection() {
		this.dlgSrv.open(ExportDlgComponent, {
			targets: this.selectionSrv.getSelectedValues()
		});
	}

	exportAll() {
		this.dlgSrv.open(ExportDlgComponent, {
			query: 'deleted == false AND archived == false',
			type: this.viewSrv.entityMetadata.entityName
		});
	}
}
