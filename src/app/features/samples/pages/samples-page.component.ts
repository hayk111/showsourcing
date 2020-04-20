import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import {
	ERM,
	Sample,
	SampleService,
	SelectParams,
	SelectParamsConfig,
} from '~core/erm';
import { UserService } from '~core/auth/services';
import { FilterType } from '~shared/filters';
import { FilterService } from '~shared/filters/services/filter.service';
import { ListHelperService, ListPageViewService, SelectionService } from '~core/list-page2';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'samples-page-app',
	templateUrl: './samples-page.component.html',
	styleUrls: ['./samples-page.component.scss'],
	providers: [
		ListHelperService,
		ListPageViewService,
		FilterService,
		SelectionService
	],
	host: {
		class: 'table-page'
	}
})
export class SamplesPageComponent extends AutoUnsub implements OnInit {

	items$: Observable<Sample[]>;

	erm = ERM;
	filterTypeEnum = FilterType;
	// filter displayed as button in the filter panel
	filterTypes = [
		FilterType.PRODUCT,
		FilterType.SUPPLIER,
		FilterType.CREATED_BY,
		FilterType.STATUS,
		FilterType.ASSIGNEE
	];

	samplesCount$: Observable<number>;
	selectItemsConfig: SelectParamsConfig;

	constructor(
		public selectionSrv: SelectionService,
		public dialogCommonSrv: DialogCommonService,
		public listHelper: ListHelperService,
		public viewSrv: ListPageViewService<any>,
		public elem: ElementRef,
		private userSrv: UserService,
	) {
		super();
	}

	ngOnInit() {
		this.listHelper.setup('Sample');
		this.items$ = this.listHelper.filteredItems$;
	}

	// toggleMyProducts(show: boolean) {
	// 	const filterAssignee = {
	// 		type: FilterType.ASSIGNEE,
	// 		value: this.userSrv.userSync.id
	// 	};
	// 	if (show) this.filterSrv.addFilter(filterAssignee);
	// 	else this.filterSrv.removeFilter(filterAssignee);
	// }

	// getFilterAmount() {
	// 	// we filter so we don't count archieved or deleted when it's false, so the user doesn't get confused since its the default filter
	// 	const filters = this.filterSrv.filterList
	// 		.asFilters()
	// 		.filter(
	// 			fil =>
	// 				!(fil.type === FilterType.ARCHIVED && fil.value === false) &&
	// 				!(fil.type === FilterType.DELETED && fil.value === false)
	// 		);
	// 	return filters.length;
	// }

	generateUuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}

	create() {
		this.listHelper.create();
	}

}
