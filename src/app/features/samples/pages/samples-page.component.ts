import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SampleService, UserService } from '~core/erm/services';
import { SelectParams, SelectParamsConfig } from '~core/erm/services/_global/select-params';
import { ListPageService } from '~core/list-page';
import { ERM, Sample } from '~core/erm/models';
import { DialogService } from '~shared/dialog';
import { FilterType } from '~shared/filters';
import { AutoUnsub } from '~utils';
import { KanbanService } from '~shared/kanban/services/kanban.service';
import { KanbanSelectionService } from '~shared/kanban/services/kanban-selection.service';

@Component({
	selector: 'samples-page-app',
	templateUrl: './samples-page.component.html',
	styleUrls: ['./samples-page.component.scss'],
	providers: [
		ListPageService,
		KanbanService,
		KanbanSelectionService
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
	) {
		super();
	}

	ngOnInit() {
		const selectParams = new SelectParams({ sortBy: 'creationDate' });
		this.listSrv.setup({
			entitySrv: this.sampleSrv,
			searchedFields: ['name', 'supplier.name', 'product.name', 'assignee.firstName', 'assignee.lastName', 'type'],
			entityMetadata: ERM.SAMPLE,
			initialFilters: [
				{ type: FilterType.ARCHIVED, value: false }
			],
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


	onFavourite(sample: Sample) {
		this.listSrv.onItemFavorited(sample.id);
	}

	showItemsPerPage(count: number) {
		this.selectItemsConfig = { take: Number(count) };
		this.listSrv.refetch(this.selectItemsConfig).subscribe();
	}

}
