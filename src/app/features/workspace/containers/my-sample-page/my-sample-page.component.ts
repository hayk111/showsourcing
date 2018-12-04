import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { SampleService } from '~core/entity-services';
import { Sample, ERM, ERM_TOKEN } from '~core/models';
import { ListPageViewService, ListPageDataService, SelectionService, SelectionWithFavoriteService } from '~core/list-page';
import { FilterType } from '~shared/filters';
import { CommonDialogService } from '~common/dialog';

@Component({
	selector: 'my-sample-page-app',
	templateUrl: './my-sample-page.component.html',
	styleUrls: ['./my-sample-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageDataService,
		ListPageViewService,
		SelectionWithFavoriteService,
		CommonDialogService
	]
})
export class MySamplePageComponent implements OnInit {

	filterTypes = [
		FilterType.SUPPLIER,
		FilterType.PRODUCT
	];

	constructor(
		protected featureSrv: SampleService,
		protected viewSrv: ListPageViewService<Sample>,
		public dataSrv: ListPageDataService<Sample, SampleService>,
		protected selectionSrv: SelectionService,
	) { }

	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.featureSrv,
			searchedFields: ['name', 'assignee.firstName', 'assignee.lastName', 'product.name', 'supplier.name']
		});
		this.dataSrv.init();
	}

}
