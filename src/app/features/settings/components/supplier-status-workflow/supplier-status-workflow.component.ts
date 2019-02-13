import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { SupplierStatusService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, SupplierStatus } from '~core/models';
import { AbstractStatusWorkflowComponent } from '~features/settings/containers/abstract-status-workflow.component';

@Component({
	selector: 'supplier-status-workflow-app',
	templateUrl: '../../../../common/workflow/common-status-workflow.component.html',
	styleUrls: ['./supplier-status-workflow.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})

// tslint:disable-next-line:max-line-length
export class SupplierStatusWorkflowComponent extends AbstractStatusWorkflowComponent<SupplierStatus, SupplierStatusService> implements OnInit {

	constructor(
		private supplierStatusSrv: SupplierStatusService,
		public listSrv: ListPageService<SupplierStatus, SupplierStatusService>,
		public commonModalSrv: CommonModalService
	) { super(supplierStatusSrv, listSrv, commonModalSrv, ListPageKey.SUPPLIER_STATUS, ERM.SUPPLIER_STATUS); }

}
