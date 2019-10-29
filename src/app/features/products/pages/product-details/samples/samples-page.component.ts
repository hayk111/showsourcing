import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { AbstractSampleCommonComponent } from '~common/abstracts/abstract-sample-common.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ListPageService } from '~core/list-page';
import { SampleService, UserService } from '~entity-services';
import { ProductFeatureService } from '~features/products/services';
import { Product, Sample } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterType } from '~shared/filters';

@Component({
	selector: 'samples-page-app',
	templateUrl: './samples-page.component.html',
	styleUrls: ['./samples-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class SamplesPageComponent extends AbstractSampleCommonComponent implements OnInit {
	private productId: string;
	product: Product;
	constructor(
		protected route: ActivatedRoute,
		protected router: Router,
		protected userSrv: UserService,
		protected sampleSrv: SampleService,
		protected dlgSrv: DialogService,
		protected featureSrv: ProductFeatureService,
		public listSrv: ListPageService<Sample, SampleService>,
		public dialogCommonSrv: DialogCommonService
	) {
		super(router, route, userSrv, sampleSrv, dlgSrv, listSrv, dialogCommonSrv);
	}

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id),
			takeUntil(this._destroy$)
		);

		id$.pipe(
			switchMap(id => this.featureSrv.selectOne(id)),
			takeUntil(this._destroy$)
		).subscribe(product => this.product = product);
		this.productId = this.route.parent.snapshot.params.id;
		super.setup([
			{
				type: FilterType.PRODUCT,
				value: this.productId
			}
		]);
		super.ngOnInit();
	}
}
