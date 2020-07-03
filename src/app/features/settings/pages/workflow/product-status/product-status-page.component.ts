import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { ProductStatusService } from '~core/erm';
import { ListHelper2Service } from '~core/list-page2';
import { ERM, ProductStatus } from '~core/erm';
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
		public listHelper: ListHelper2Service,
		public dialogCommonSrv: DialogCommonService
	) { super(productStatusSrv, listHelper, dialogCommonSrv, ERM.PRODUCT_STATUS); }

}
