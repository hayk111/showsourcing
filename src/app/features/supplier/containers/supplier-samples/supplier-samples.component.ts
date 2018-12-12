import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { AbstractSampleCommonComponent } from '~common/sample/containers/abstract-sample-common.component';
import { ListPageService } from '~core/list-page';
import { UserService } from '~entity-services';
import { SampleService } from '~entity-services/sample/sample.service';
import { Sample } from '~models';
import { FilterType } from '~shared/filters';


@Component({
	selector: 'supplier-samples-app',
	templateUrl: './supplier-samples.component.html',
	styleUrls: ['./supplier-samples.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})

export class SupplierSamplesComponent extends AbstractSampleCommonComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		protected router: Router,
		protected userSrv: UserService,
		protected sampleSrv: SampleService,
		public listSrv: ListPageService<Sample, SampleService>,
		public commonModalSrv: CommonModalService
	) {
		super(router, userSrv, sampleSrv, listSrv, commonModalSrv);
	}

	ngOnInit() {
		super.ngOnInit();
		this.listSrv.addFilter({
			type: FilterType.SUPPLIER,
			value: this.route.parent.snapshot.params.id
		});
	}

}
