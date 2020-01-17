import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { AbstractSampleCommonComponent } from '~common/abstracts/abstract-sample-common.component';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ListPageService } from '~core/list-page';
import { SupplierService, UserService } from '~entity-services';
import { SampleService } from '~entity-services/sample/sample.service';
import { ERM, Sample, Supplier } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterType } from '~shared/filters';



@Component({
	selector: 'samples-page-app',
	templateUrl: './samples-page.component.html',
	styleUrls: ['./samples-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [ListPageService],
	host: { class: 'table-page' }
})

export class SamplesPageComponent extends AbstractSampleCommonComponent implements OnInit {
	private supplierId: string;
	supplier: Supplier;
	erm = ERM;

	filterTypes = [
		FilterType.PRODUCT,
		FilterType.SAMPLE_STATUS,
	];

	constructor(
		protected route: ActivatedRoute,
		protected router: Router,
		protected userSrv: UserService,
		protected sampleSrv: SampleService,
		protected dlgSrv: DialogService,
		protected supplierSrv: SupplierService,
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
			switchMap(id => this.supplierSrv.selectOne(id)),
			takeUntil(this._destroy$)
		).subscribe(supplier => this.supplier = supplier);
		this.supplierId = this.route.parent.snapshot.params.id;
		super.setup([
			{
				type: FilterType.SUPPLIER,
				value: this.supplierId
			}
		], null, false);
		super.ngOnInit();
	}

}
