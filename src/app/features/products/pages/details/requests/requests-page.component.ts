import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ListHelper2Service } from '~core/list-page2';
import { ProductService, SupplierRequestService } from '~core/erm';
import { ERM, Product, SupplierRequest } from '~core/erm';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'requests-page-app',
	templateUrl: './requests-page.component.html',
	styleUrls: ['./requests-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		ListHelper2Service
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
		public listSrv: ListHelper2Service,
		private productSrv: ProductService
	) {
		super();
	}

	ngOnInit() {
		const id$ = this.route.snapshot.params.pipe(
			map(params => params.id),
		);

		id$.subscribe(id => {
			// this.listSrv.setup('Quote');
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
