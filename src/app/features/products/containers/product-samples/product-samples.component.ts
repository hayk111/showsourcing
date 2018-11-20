import { Component, OnInit, ChangeDetectionStrategy, NgModuleRef } from '@angular/core';
import { AbstractSampleCommonComponent } from '~shared/sample-common/containers/abstract-sample-common.component';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, SampleService } from '~global-services';
import { SearchService, FilterType } from '~shared/filters';
import { SelectionService } from '~shared/list-page/selection.service';
import { DialogService } from '~shared/dialog';

@Component({
	selector: 'product-samples-app',
	templateUrl: './product-samples.component.html',
	styleUrls: ['./product-samples.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSamplesComponent extends AbstractSampleCommonComponent implements OnInit {

	constructor(
		protected route: ActivatedRoute,
		protected userSrv: UserService,
		protected router: Router,
		protected featureSrv: SampleService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>) {
		super(router, userSrv, featureSrv, searchSrv, selectionSrv, dlgSrv, moduleRef);
	}
	ngOnInit() {
		super.ngOnInit();
		this.filterList.addFilter({
			type: FilterType.PRODUCT,
			value: this.route.parent.snapshot.params.id
		});
	}

}
