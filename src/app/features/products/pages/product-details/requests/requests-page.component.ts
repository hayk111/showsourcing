import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ListPageService } from '~core/list-page';
import { RequestElementService, TaskService } from '~entity-services';
import { ERM, RequestElement, Task, Product } from '~models';
import { AutoUnsub } from '~utils';
import { ProductFeatureService } from '~features/products/services';

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
	requestElements$: Observable<RequestElement[]>;
	private product: Product;

	constructor(
		protected route: ActivatedRoute,
		protected reqElemSrv: RequestElementService,
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
				entitySrv: this.reqElemSrv,
				selectParams: { sortBy: 'name', query: `targetedEntityType == "Product" && targetId == "${id}"` },
				entityMetadata: ERM.REQUEST_ELEMENT,
				searchedFields: ['name'],
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
