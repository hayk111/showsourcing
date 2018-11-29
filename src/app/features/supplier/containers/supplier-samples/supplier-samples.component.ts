import { ChangeDetectionStrategy, Component, NgModuleRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '~global-services';
import { SampleService } from '~global-services/sample/sample.service';
import { DialogService } from '~shared/dialog';
import { FilterType, SearchService } from '~shared/filters';
import { SelectionService } from '~core/list-page/selection.service';
import { AbstractSampleCommonComponent } from '~shared/sample-common/containers/abstract-sample-common.component';

@Component({
	selector: 'supplier-samples-app',
	templateUrl: './supplier-samples.component.html',
	styleUrls: ['./supplier-samples.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierSamplesComponent extends AbstractSampleCommonComponent implements OnInit {

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
			type: FilterType.SUPPLIER,
			value: this.route.parent.snapshot.params.id
		});
	}

}
