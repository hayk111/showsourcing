import { Component, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, zip } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { NewSupplierDlgComponent } from '~features/supplier/containers/new-supplier-dlg/new-supplier-dlg.component';
import { SupplierFeatureService } from '~features/supplier/services';
import { ERM, Supplier } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService, SearchService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { StoreKey } from '~utils/store/store';
import { CreationDialogComponent } from '~shared/generic-dialog';


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
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>
	) {
		super(router, featureSrv, selectionSrv, filterSrv, searchSrv, dlgSrv, moduleRef, ERM.SUPPLIER);
	}

}
