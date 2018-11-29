import { NgModuleRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SampleService, UserService } from '~global-services';
import { ERM, Sample } from '~models';
import { DialogService } from '~shared/dialog/services';
import { SearchService } from '~shared/filters';
import { ListPageComponent } from '~core/list-page/list-page.component';
import { SelectionService } from '~core/list-page/selection.service';

/** since we use the sample component on different pages, this page will keep the methods clean */
export abstract class AbstractSampleCommonComponent extends ListPageComponent<Sample, SampleService> implements OnInit {

	constructor(
		protected router: Router,
		protected userSrv: UserService,
		protected featureSrv: SampleService,
		protected searchSrv: SearchService,
		protected selectionSrv: SelectionService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.SAMPLE, null);
	}

	createSample(name: string) {
		const newSample = new Sample({ name });
		this.featureSrv.create(newSample).subscribe(_ => this.refetch());
	}

	openProduct(id: string) {
		this.router.navigate([ERM.PRODUCT.singular, 'details', id]);
	}

	openSupplier(id: string) {
		this.router.navigate([ERM.SUPPLIER.singular, 'details', id]);
	}
}
