import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SampleService, UserService } from '~core/entity-services';
import { SelectParams, SelectParamsConfig } from '~core/entity-services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { ERM, Sample } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterType } from '~shared/filters';
import { ControllerListService } from '~shared/controller-list/services/controller-list.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'samples-page-app',
	templateUrl: './samples-page.component.html',
	styleUrls: ['./samples-page.component.scss'],
	providers: [
		ListPageService,
		DialogCommonService
	],
	host: {
		class: 'table-page'
	}
})
export class SamplesPageComponent extends AutoUnsub implements OnInit {
	erm = ERM;
	filterTypeEnum = FilterType;
	// filter displayed as button in the filter panel
	filterTypes = [
		FilterType.PRODUCT,
		FilterType.SUPPLIER,
		FilterType.CREATED_BY,
		FilterType.SAMPLE_STATUS,
		FilterType.ASSIGNEE,
	];

	samplesCount$: Observable<number>;
	selectItemsConfig: SelectParamsConfig;

	constructor(
		public dialogCommonSrv: DialogCommonService,
		public listSrv: ListPageService<Sample, SampleService>,
		private sampleSrv: SampleService,
		public elem: ElementRef,
		protected dlgSrv: DialogService,
		private userSrv: UserService,
		private controllerListService: ControllerListService,
	) {
		super();
	}

	ngOnInit() {
		const selectParams = new SelectParams({ sortBy: 'creationDate' });
		this.listSrv.setup({
			entitySrv: this.sampleSrv,
			searchedFields: ['name', 'supplier.name', 'product.name', 'assignee.firstName', 'assignee.lastName', 'type'],
			entityMetadata: ERM.SAMPLE,
			initialFilters: [],
			originComponentDestroy$: this._destroy$,
			selectParams
		});

		this.samplesCount$ = this.listSrv.filterList.valueChanges$.pipe(
			switchMap(_ => this.sampleSrv.selectCount(this.listSrv.filterList.asPredicate()).pipe(takeUntil(this._destroy$)))
		);

		this.sampleSrv.sampleListUpdate$.pipe(
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
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
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

	onClearFilters() {
		this.listSrv.filterList.resetAll();

		// this.listSrv.addFilter({ type: FilterType.ARCHIVED, value: false}); TODO backend
		this.listSrv.addFilter({ type: FilterType.DELETED, value: false });

		this.controllerListService.onFiltersClear();
	}

}
