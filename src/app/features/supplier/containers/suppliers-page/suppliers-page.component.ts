import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, zip } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { NewSupplierDlgComponent } from '~features/supplier/containers/new-supplier-dlg/new-supplier-dlg.component';
import { SupplierFeatureService, SearchService } from '~features/supplier/services';
import { ERM, Supplier } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService } from '~shared/filters';
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
	searchFilterElements$: Observable<any[]>;

	constructor(
		protected router: Router,
		protected featureSrv: SupplierFeatureService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected dlgSrv: DialogService,
		protected searchSrv: SearchService
	) {
		super(router, featureSrv, selectionSrv, filterSrv, dlgSrv, ERM.SUPPLIER);
	}

	get selectionArray() {
		return Array.from(this.selectionSrv.selection.keys());
	}

	/** Search within filters */
	searchFilters(str: string) {
		this.searchFilterElements$ = this.searchSrv.searchFilterElements(str, this.filterSrv);
	}

	onCheckSearchElement(element) {
		this.filterSrv.addFilter({
			type: element.type,
			value: element.id,
			raw: element
		});
	}

	onUncheckSearchElement(element) {
		this.filterSrv.removeFilter({
			type: element.type,
			value: element.id,
			raw: element
		});
	}

	getFiltersNumber() {
		return this.filterSrv.filtersNumber();
	}
}
