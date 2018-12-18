import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { AbstractSampleCommonComponent } from '~common/sample/containers/abstract-sample-common.component';
import { ListPageService } from '~core/list-page';
import { SampleService, UserService } from '~entity-services';
import { ERM, Sample } from '~models';
import { FilterType } from '~shared/filters';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'product-samples-app',
	templateUrl: './product-samples.component.html',
	styleUrls: ['./product-samples.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class ProductSamplesComponent extends AbstractSampleCommonComponent implements OnInit {
	private productId: string;
	constructor(
		private route: ActivatedRoute,
		protected router: Router,
		protected userSrv: UserService,
		protected sampleSrv: SampleService,
		public listSrv: ListPageService<Sample, SampleService>,
		public commonModalSrv: CommonModalService
	) {
		super(router, route, userSrv, sampleSrv, listSrv, commonModalSrv);
	}

	ngOnInit() {
		this.productId = this.route.parent.snapshot.params.id;
		super.setup([
			{
				type: FilterType.PRODUCT,
				value: this.productId
			}
		]);
	}

	createSample(name: string) {
		const sample = new Sample({
			name,
			product: { id: this.productId },
			assignee: this.userSrv.userSync
		});
		this.sampleSrv.create(sample).pipe(
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}
}
