import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { ProductStatusService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, ProductStatus } from '~core/models';
import { AbstractStatusWorkflowComponent } from '~features/settings/containers/abstract-status-workflow.component';

@Component({
	selector: 'product-status-workflow-app',
	templateUrl: '../../../../common/workflow/common-status-workflow.component.html',
	styleUrls: ['./product-status-workflow.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductStatusWorkflowComponent extends AbstractStatusWorkflowComponent<ProductStatus, ProductStatusService> implements OnInit {

	constructor(
		private productStatusSrv: ProductStatusService,
		public listSrv: ListPageService<ProductStatus, ProductStatusService>,
		public commonModalSrv: CommonModalService
	) { super(productStatusSrv, listSrv, commonModalSrv, ListPageKey.PRODUCT_STATUS, ERM.PRODUCT_STATUS); }

}
