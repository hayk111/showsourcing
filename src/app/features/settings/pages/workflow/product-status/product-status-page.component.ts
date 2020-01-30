import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProductStatusService } from '~core/erm/services';
import { ListPageService } from '~core/list-page';
import { ERM, ProductStatus } from '~core/erm/models';
import { AbstractStatusWorkflowComponent } from '../shared/abstract-status-workflow.component';

@Component({
	selector: 'product-status-page-app',
	templateUrl: '../shared/status-page.component.html',
	styleUrls: ['./product-status-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductStatusPageComponent extends AbstractStatusWorkflowComponent<ProductStatus, ProductStatusService> implements OnInit {

	constructor(
		protected productStatusSrv: ProductStatusService,
		public listSrv: ListPageService<ProductStatus, ProductStatusService>,
		public dialogCommonSrv: DialogCommonService
	) { super(productStatusSrv, listSrv, dialogCommonSrv, ERM.PRODUCT_STATUS); }

}
