import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { AbstractSampleCommonComponent } from '~common/sample/containers/abstract-sample-common.component';
import { ListPageService } from '~core/list-page';
import { UserService } from '~entity-services';
import { SampleService } from '~entity-services/sample/sample.service';
import { Sample } from '~models';
import { FilterType } from '~shared/filters';
import { switchMap, takeUntil, map } from 'rxjs/operators';


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
	private supplierId: string;

	constructor(
		protected route: ActivatedRoute,
		protected router: Router,
		protected userSrv: UserService,
		protected sampleSrv: SampleService,
		public listSrv: ListPageService<Sample, SampleService>,
		public commonModalSrv: CommonModalService
	) {
		super(router, route, userSrv, sampleSrv, listSrv, commonModalSrv);
	}

	ngOnInit() {
		super.setup([
			{
				type: FilterType.SUPPLIER,
				value: this.supplierId
			}
		]);
		this.route.parent.params.pipe(
			takeUntil(this._destroy$),
			map(params => params.id)
		).subscribe(id => this.supplierId = id);
	}


	createSample(name: string) {
		const sample = new Sample({
			name,
			supplier: { id: this.supplierId },
			assignee: { id: this.userSrv.userSync.id }
		});
		this.sampleSrv.create(sample).pipe(
			switchMap(_ => this.listSrv.refetch())
		).subscribe();
	}

}
