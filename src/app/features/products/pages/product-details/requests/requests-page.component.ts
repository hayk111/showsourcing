import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ListPageService } from '~core/list-page';
import { ProductService, SupplierRequestService } from '~core/orm/services';
import { ERM, Product, SupplierRequest } from '~core/orm/models';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'requests-page-app',
	templateUrl: './requests-page.component.html',
	styleUrls: ['./requests-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListPageService
	]
})
export class RequestsPageComponent extends AutoUnsub implements OnInit {

	erm = ERM;
	supplierRequests$: Observable<SupplierRequest[]>;
	private product: Product;

	constructor(
		protected route: ActivatedRoute,
		private router: Router,
		protected requestSrv: SupplierRequestService,
		public dialogCommonSrv: DialogCommonService,
		public listSrv: ListPageService<SupplierRequest, SupplierRequestService>,
		private productSrv: ProductService
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.parent.params.pipe(
			map(params => params.id),
		);

		id$.subscribe(id => {
			this.listSrv.setup({
				entitySrv: this.requestSrv,
				selectParams: { sortBy: 'title', query: `requestElements.targetedEntityType == "Product" && requestElements.targetId == "${id}"` },
				entityMetadata: ERM.SUPPLIER_REQUEST,
				searchedFields: ['title'],
				originComponentDestroy$: this._destroy$
			});
		});

		id$.pipe(
			switchMap(id => this.productSrv.queryOne(id)),
			takeUntil(this._destroy$)
		).subscribe(product => this.product = product);
	}

	openSupplierRequest() {
		this.dialogCommonSrv.openSupplierRequest([this.product]);
	}

	goToRequest(request: SupplierRequest) {
		this.router.navigate(['requests', request && request.id]);
	}

}
