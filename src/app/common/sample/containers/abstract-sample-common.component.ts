import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { SampleService, UserService } from '~entity-services';
import { ERM, Sample } from '~models';
import { TrackingComponent } from '~utils/tracking-component';

/** since we use the sample component on different pages, this page will keep the methods clean */
export abstract class AbstractSampleCommonComponent extends TrackingComponent implements OnInit {
	constructor(
		protected router: Router,
		protected userSrv: UserService,
		protected featureSrv: SampleService,
		protected viewSrv: ListPageViewService<Sample>,
		public dataSrv: ListPageDataService<Sample, SampleService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService
	) {
		super();
	}
	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.featureSrv,
			searchedFields: ['name'],
			initialSortBy: 'name'
		});
		this.dataSrv.init();
	}

	createSample(name: string) {
		const newSample = new Sample({ name });
		this.featureSrv.create(newSample).subscribe(_ => this.dataSrv.refetch());
	}

	openProduct(id: string) {
		this.router.navigate([ERM.PRODUCT.singular, 'details', id]);
	}

	openSupplier(id: string) {
		this.router.navigate([ERM.SUPPLIER.singular, 'details', id]);
	}
}
