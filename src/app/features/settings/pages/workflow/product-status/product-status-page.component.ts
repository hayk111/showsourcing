import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { ProductStatusService } from '~core/entity-services';
import { ListPageService } from '~core/list-page';
import { ERM, ProductStatus } from '~core/models';
import { AbstractStatusWorkflowComponent } from '../shared/abstract-status-workflow.component';

@Component({
	selector: 'product-status-page-app',
	templateUrl: '../shared/status-workflow.component.html',
	styleUrls: ['./product-status-workflow.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductStatusPageComponent extends AbstractStatusWorkflowComponent<ProductStatus, ProductStatusService> implements OnInit {

	constructor(
		protected productStatusSrv: ProductStatusService,
		public listSrv: ListPageService<ProductStatus, ProductStatusService>,
		public commonModalSrv: CommonModalService
	) { super(productStatusSrv, listSrv, commonModalSrv, ERM.PRODUCT_STATUS); }

}
