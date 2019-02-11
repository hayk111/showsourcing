import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { ProductStatusService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, ProductStatus } from '~core/models';

@Component({
	selector: 'product-status-workflow-app',
	templateUrl: '../../../../common/workflow/common-status-workflow.component.html',
	styleUrls: ['./product-status-workflow.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductStatusWorkflowComponent implements OnInit {

	constructor(
		private productStatusSrv: ProductStatusService,
		public listSrv: ListPageService<ProductStatus, ProductStatusService>,
		public commonModalSrv: CommonModalService
	) { }

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.PRODUCT_STATUS,
			entitySrv: this.productStatusSrv,
			selectParams: { sortBy: 'step', descending: false },
			entityMetadata: ERM.PRODUCT_STATUS
		});
	}

}
