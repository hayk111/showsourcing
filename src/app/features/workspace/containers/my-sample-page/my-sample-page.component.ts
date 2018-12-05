import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonDialogService } from '~common/dialog';
import { AbstractSampleCommonComponent } from '~common/sample/containers/abstract-sample-common.component';
import { SampleService, UserService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { Sample } from '~core/models';
import { FilterType } from '~shared/filters';

@Component({
	selector: 'my-sample-page-app',
	templateUrl: './my-sample-page.component.html',
	styleUrls: ['./my-sample-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class MySamplePageComponent extends AbstractSampleCommonComponent implements OnInit {

	filterTypes = [
		FilterType.SUPPLIER,
		FilterType.PRODUCT
	];

	constructor(
		protected router: Router,
		protected userSrv: UserService,
		protected sampleSrv: SampleService,
		public listSrv: ListPageService<Sample, SampleService>,
		public commonDlgSrv: CommonDialogService,
	) {
		super(router, userSrv, sampleSrv, listSrv, commonDlgSrv);
	}
}
