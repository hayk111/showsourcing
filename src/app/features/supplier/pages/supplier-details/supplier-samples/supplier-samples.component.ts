import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { CommonModalService } from '~common/modals/services/common-modal.service';
import { AbstractSampleCommonComponent } from '~common/sample/containers/abstract-sample-common.component';
import { ListPageService } from '~core/list-page';
import { UserService } from '~entity-services';
import { SampleService } from '~entity-services/sample/sample.service';
import { SupplierFeatureService } from '~features/supplier/services';
import { ERM, Sample, Supplier } from '~models';
import { DialogService } from '~shared/dialog';
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
		protected featureSrv: SupplierFeatureService,
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
		).subscribe(supplier => this.supplier = supplier);
		this.supplierId = this.route.parent.snapshot.params.id;
		super.setup([
			{
				type: FilterType.SUPPLIER,
				value: this.supplierId
			}
		]);
		super.ngOnInit();
	}

	onExport() {
		this.commonModalSrv.openExportDialog(this.listSrv.getSelectedValues());
	}
}
