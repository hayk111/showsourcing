import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonDialogService } from '~common/dialog/services/common-dialog.service';
import { AbstractSampleCommonComponent } from '~common/sample/containers/abstract-sample-common.component';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageProviders, ProviderKey } from '~core/list-page/list-page-providers.class';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { UserService } from '~entity-services';
import { SampleService } from '~entity-services/sample/sample.service';
import { ERM, ERM_TOKEN, Sample } from '~models';
import { FilterType } from '~shared/filters';


@Component({
	selector: 'supplier-samples-app',
	templateUrl: './supplier-samples.component.html',
	styleUrls: ['./supplier-samples.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageProviders.getProviders(ProviderKey.SUPPLIER_SAMPLE, ERM.PRODUCT),
		CommonDialogService,
		{ provide: ERM_TOKEN, useValue: ERM.PRODUCT }
	]
})
export class SupplierSamplesComponent extends AbstractSampleCommonComponent implements OnInit {

	constructor(
		protected route: ActivatedRoute,
		protected router: Router,
		protected userSrv: UserService,
		protected featureSrv: SampleService,
		protected viewSrv: ListPageViewService<Sample>,
		public dataSrv: ListPageDataService<Sample, SampleService>,
		protected selectionSrv: SelectionWithFavoriteService,
		protected commonDlgSrv: CommonDialogService
	) {
		super(router, userSrv, featureSrv, viewSrv, dataSrv, selectionSrv, commonDlgSrv);
	}

	ngOnInit() {
		super.ngOnInit();
		this.dataSrv.filterList.addFilter({
			type: FilterType.SUPPLIER,
			value: this.route.parent.snapshot.params.id
		});
	}

}
