import { Component, NgModuleRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, zip } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { NewSupplierDlgComponent } from '~features/supplier/containers/new-supplier-dlg/new-supplier-dlg.component';
import { SupplierFeatureService } from '~features/supplier/services';
import { ERM, Supplier } from '~models';
import { FilterType } from '~shared/filters';
import { ListPageDataService } from '~shared/list-page/list-page-data.service';
import { ListPageViewService } from '~shared/list-page/list-page-view.service';
import { SelectionService } from '~shared/list-page/selection.service';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';
import { CommonDialogService } from '~shared/custom-dialog/services/common-dialog.service';
@Component({
	selector: 'supplier-page-app',
	templateUrl: './suppliers-page.component.html',
	styleUrls: ['./suppliers-page.component.scss']
})
export class SuppliersPageComponent extends TrackingComponent
	implements OnInit {
	filterTypes = [
		FilterType.CATEGORIES,
		FilterType.TAGS,
		FilterType.EVENT,
		FilterType.SUPPLIER_STATUS,
		FilterType.CREATED_BY,
		FilterType.FAVORITE
	];

	constructor(
		protected router: Router,
		protected featureSrv: SupplierFeatureService,
		protected selectionSrv: SelectionService,
		protected commonDlgSrv: CommonDialogService,
		protected viewSrv: ListPageViewService<Supplier>,
		protected dataSrv: ListPageDataService<Supplier, SupplierFeatureService>
	) {
		super();
	}

	ngOnInit() {
		this.dataSrv.setup({
			featureSrv: this.featureSrv,
			searchedFields: ['name', 'tag.name', 'category.name'],
			initialSortBy: 'name'
		});
		this.dataSrv.init();
	}
}
