import { Component, OnInit, ChangeDetectionStrategy, NgModuleRef } from '@angular/core';
import { AbstractSampleCommonComponent } from '~common/sample/containers/abstract-sample-common.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, SampleService } from '~global-services';
import { SearchService, FilterType } from '~shared/filters';
import { SelectionService } from '~core/list-page/selection.service';
import { DialogService } from '~shared/dialog';
import { Product, ERM_TOKEN, ERM, Sample } from '~models';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';
import { ListPageDataService } from '~core/list-page/list-page-data.service';
import { ListPageViewService } from '~core/list-page/list-page-view.service';
import { SelectionWithFavoriteService } from '~core/list-page/selection-with-favorite.service';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { ListPageProviders, ProviderKey } from '~core/list-page/list-page-providers.class';


@Component({
	selector: 'product-samples-app',
	templateUrl: './product-samples.component.html',
	styleUrls: ['./product-samples.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageProviders.getProviders(ProviderKey.PRODUCT_SAMPLE, ERM.PRODUCT),
		CommonDialogService,
		{ provide: ERM_TOKEN, useValue: ERM.PRODUCT }
	]
})
export class ProductSamplesComponent extends AbstractSampleCommonComponent implements OnInit {

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
			type: FilterType.PRODUCT,
			value: this.route.parent.snapshot.params.id
		});
	}

}
