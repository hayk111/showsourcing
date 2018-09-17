import { Component, NgModuleRef } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, zip } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { NewSupplierDlgComponent } from '~features/supplier/containers/new-supplier-dlg/new-supplier-dlg.component';
import { SupplierFeatureService } from '~features/supplier/services';
import { ERM, Supplier } from '~models';
import { DialogService } from '~shared/dialog';
import { SearchService, FilterType } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';


@Component({
	selector: 'supplier-page-app',
	templateUrl: './suppliers-page.component.html',
	styleUrls: ['./suppliers-page.component.scss'],
	providers: [
		SelectionService
	]
})
export class SuppliersPageComponent extends ListPageComponent<Supplier, SupplierFeatureService> {
	filterTypes = [
		FilterType.CATEGORIES,
		FilterType.TAGS,
		FilterType.EVENT,
		FilterType.SUPPLIER_STATUS,
		FilterType.CREATED_BY,
		FilterType.FAVORITE,
	];
	constructor(
		protected router: Router,
		protected featureSrv: SupplierFeatureService,
		protected selectionSrv: SelectionService,
		protected searchSrv: SearchService,
		protected dlgSrv: DialogService,
		protected moduleRef: NgModuleRef<any>
	) {
		super(router, featureSrv, selectionSrv, searchSrv, dlgSrv, moduleRef, ERM.SUPPLIER);
	}

}
