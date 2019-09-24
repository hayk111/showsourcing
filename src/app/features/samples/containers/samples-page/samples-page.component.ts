import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren, QueryList, OnChanges, ViewChild, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { FilterType } from '~shared/filters';
import { CommonModalService } from '~common/modals';
import { UserService, SampleService } from '~core/entity-services';
import { ListPageService, ListPageKey } from '~core/list-page';
import { ERM, Sample } from '~models';
import { AutoUnsub } from '~utils';
import { DialogService } from '~shared/dialog';
import { NotificationService } from '~shared/notifications';
import { SupplierRequestDialogComponent } from '~common/modals/component/supplier-request-dialog/supplier-request-dialog.component';
import { SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { SelectParams } from '~core/entity-services/_global/select-params';

@Component({
	selector: 'samples-page-app',
	templateUrl: './samples-page.component.html',
	styleUrls: ['./samples-page.component.scss'],
	providers: [
		ListPageService,
		CommonModalService
	]
})
export class SamplesPageComponent extends AutoUnsub implements OnInit {
	erm = ERM;
	filterTypeEnum = FilterType;
	// filter displayed as button in the filter panel
	filterTypes = [
		FilterType.CATEGORY,
		FilterType.CREATED_BY,
		FilterType.EVENT,
		FilterType.FAVORITE,
		FilterType.PRODUCT_STATUS,
		FilterType.PROJECTS,
		FilterType.SUPPLIER,
		FilterType.TAGS
	];

	samplesCount$: Observable<number>;
	selectItemsConfig: SelectParamsConfig;

	constructor(
		public commonModalSrv: CommonModalService,
		public listSrv: ListPageService<Sample, SampleService>,
		private sampleSrv: SampleService,
		public elem: ElementRef,
		protected dlgSrv: DialogService,
		private userSrv: UserService,
	) {
		super();
	}

	ngOnInit() {
		const selectParams = new SelectParams({ sortBy: 'name' });
		this.listSrv.setup({
			key: ListPageKey.REQUEST,
			entitySrv: this.sampleSrv,
			searchedFields: ['name', 'supplier.name', 'product.name', 'assignee.firstName', 'assignee.lastName'],
			entityMetadata: ERM.SAMPLE,
			initialFilters: [],
			originComponentDestroy$: this._destroy$,
			selectParams
		});

		this.samplesCount$ = this.listSrv.filterList.valueChanges$.pipe(
			switchMap(_ => this.sampleSrv.selectCount(this.listSrv.filterList.asPredicate()).pipe(takeUntil(this._destroy$)))
		);
	}

	toggleMyProducts(show: boolean) {
		const filterAssignee = { type: FilterType.ASSIGNEE, value: this.userSrv.userSync.id };
		if (show)
			this.listSrv.addFilter(filterAssignee);
		else
			this.listSrv.removeFilter(filterAssignee);
	}

	getFilterAmount() {
		// we filter so we don't count archieved or deleted when it's false, so the user doesn't get confused since its the default filter
		const filters = this.listSrv.filterList.asFilters()
			.filter(fil => !(fil.type === FilterType.ARCHIVED && fil.value === false) && !(fil.type === FilterType.DELETED && fil.value === false));
		return filters.length;
	}

	onViewChange(view: 'list' | 'card') {
		this.listSrv.changeView(view);
	}

	onFavourite(sample: Sample) {
		this.listSrv.onItemFavorited(sample.id);
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = {take: Number(count)};
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

	onExport() {
		this.commonModalSrv.openExportDialog(this.listSrv.getSelectedValues());
	}
}
