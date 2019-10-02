import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { AbstractSampleCommonComponent } from '~common/sample/containers/abstract-sample-common.component';
import { ListPageService } from '~core/list-page';
import { SampleService, UserService } from '~entity-services';
import { Sample, Product } from '~models';
import { FilterType } from '~shared/filters';
import { switchMap, map, takeUntil } from 'rxjs/operators';
import { DialogService } from '~shared/dialog';
import { ProductFeatureService } from '~features/products/services';

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
	product: Product;
	constructor(
		protected route: ActivatedRoute,
		protected router: Router,
		protected userSrv: UserService,
		protected sampleSrv: SampleService,
		protected dlgSrv: DialogService,
		protected featureSrv: ProductFeatureService,
		public listSrv: ListPageService<Sample, SampleService>,
		public commonModalSrv: CommonModalService
	) {
		super(router, route, userSrv, sampleSrv, dlgSrv, listSrv, commonModalSrv);
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
