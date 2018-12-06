import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonDialogService } from '~common/dialog';
import { SampleService, UserService } from '~core/entity-services';
import { ListPageDataService, ListPageViewService, SelectionService, SelectionWithFavoriteService } from '~core/list-page';
import { Sample, ERM } from '~core/models';
import { FilterType } from '~shared/filters';

@Component({
	selector: 'my-sample-page-app',
	templateUrl: './my-sample-page.component.html',
	styleUrls: ['./my-sample-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageDataService,
		ListPageViewService,
		SelectionService,
		CommonDialogService
	]
})
export class MySamplePageComponent implements OnInit {

	filterTypes = [
		FilterType.SUPPLIER,
		FilterType.PRODUCT
	];

	erm = ERM;

	constructor(
		private userSrv: UserService,
		public featureSrv: SampleService,
		public viewSrv: ListPageViewService<Sample>,
		public dataSrv: ListPageDataService<Sample, SampleService>,
		public selectionSrv: SelectionService,
	) { }

	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.featureSrv,
			searchedFields: ['name', 'assignee.firstName', 'assignee.lastName', 'product.name', 'supplier.name']
		});
		this.dataSrv.init();
	}

	// can be moved to abstract
	toggleMyTasks(show: boolean) {
		const filterAssignee = { type: FilterType.ASSIGNEE, value: this.userSrv.userSync.id };
		if (show)
			this.dataSrv.filterList.addFilter(filterAssignee);
		else
			this.dataSrv.filterList.removeFilter(filterAssignee);
	}

	onMultipleStatusUpdated(selection, status) {

	}

}
