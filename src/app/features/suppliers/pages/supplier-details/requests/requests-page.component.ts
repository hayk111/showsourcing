import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SupplierRequestService, SupplierService } from '~core/ORM/services';
import { ListPageService } from '~core/list-page';
import { ERM, Supplier, SupplierRequest } from '~core/ORM/models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'requests-page-app',
	templateUrl: './requests-page.component.html',
	styleUrls: ['./requests-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'table-page' }
})
export class RequestsPageComponent extends AutoUnsub implements OnInit {

	erm = ERM;
	supplierRequests$: Observable<SupplierRequest[]>;
	supplier: Supplier;

	constructor(
		protected route: ActivatedRoute,
		protected requestSrv: SupplierRequestService,
		public dialogCommonSrv: DialogCommonService,
		public listSrv: ListPageService<SupplierRequest, SupplierRequestService>,
		private supplierSrv: SupplierService
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id),
		);

		// TODO backend currently we don't save any information of the supplier, not even the id, therefore we cannot check the requests of it
		// id$.subscribe(id => {
		// this.listSrv.setup({
		// 	entitySrv: this.requestSrv,
		// 	selectParams: { sortBy: 'title', query: `supplierId == "${id}"` },
		// 	entityMetadata: ERM.SUPPLIER_REQUEST,
		// 	searchedFields: ['title'],
		// 	originComponentDestroy$: this._destroy$
		// });
		// });

		id$.pipe(
			switchMap(id => this.supplierSrv.queryOne(id)),
			takeUntil(this._destroy$)
		).subscribe(supplier => this.supplier = supplier);
	}

	openSupplierRequest() {
		this.dialogCommonSrv.openSupplierRequest([], this.supplier);
	}


}
