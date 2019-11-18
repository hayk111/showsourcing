import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ListPageService } from '~core/list-page';
import { SupplierRequestService, TaskService } from '~entity-services';
import { ProductFeatureService } from '~features/products/services';
import { ERM, Product, SupplierRequest, Task } from '~models';
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
		protected requestSrv: SupplierRequestService,
		public dialogCommonSrv: DialogCommonService,
		public listSrv: ListPageService<Task, TaskService>,
		private productSrv: ProductFeatureService
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

}
