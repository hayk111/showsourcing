import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DialogCommonService } from '~common/dialogs/services/dialog-common.service';
import { SupplierStatusService } from '~core/erm';
import { ListHelper2Service } from '~core/list-page2';
import { ERM, SupplierStatus } from '~core/erm';
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
		public listHelper: ListHelper2Service,
		public dialogCommonSrv: DialogCommonService
	) { super(supplierStatusSrv, listHelper, dialogCommonSrv, ERM.SUPPLIER_STATUS); }

}
