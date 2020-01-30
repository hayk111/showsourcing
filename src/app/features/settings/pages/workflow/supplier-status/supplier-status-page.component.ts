import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SupplierStatusService } from '~core/ORM/services';
import { ListPageService } from '~core/list-page';
import { ERM, SupplierStatus } from '~core/ORM/models';
import { AbstractStatusWorkflowComponent } from '../shared/abstract-status-workflow.component';

@Component({
	selector: 'supplier-status-page-app',
	templateUrl: '../shared/status-page.component.html',
	styleUrls: ['./supplier-status-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

export class SupplierStatusPageComponent
	extends AbstractStatusWorkflowComponent<SupplierStatus, SupplierStatusService>
	implements OnInit {

	constructor(
		protected supplierStatusSrv: SupplierStatusService,
		public listSrv: ListPageService<SupplierStatus, SupplierStatusService>,
		public dialogCommonSrv: DialogCommonService
	) { super(supplierStatusSrv, listSrv, dialogCommonSrv, ERM.SUPPLIER_STATUS); }

}
