import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SupplierFeatureService } from '~features/supplier/services/supplier-feature.service';
import { Supplier } from '~models';
import { DialogName, DialogService } from '~shared/dialog';
import { FilterService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { StoreKey } from '~utils/store/store';

import { SelectionService } from '~shared/list-page/selection.service';


@Component({
	selector: 'supplier-page-app',
	templateUrl: './suppliers-page.component.html',
	styleUrls: ['./suppliers-page.component.scss'],
	providers: [
		FilterService,
		{ provide: 'storeKey', useValue: StoreKey.FILTER_SUPPLIER },
		SelectionService
	]
})
export class SuppliersPageComponent extends ListPageComponent<Supplier, SupplierFeatureService> {

	constructor(
		protected router: Router,
		protected featureSrv: SupplierFeatureService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected dlgSrv: DialogService,
	) {
		super(router, featureSrv, selectionSrv, filterSrv, dlgSrv, 'supplier', DialogName.NEW_SUPPLIER);
	}

}
