import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModalService } from '~common/modals';
import { SupplierStatusService } from '~core/entity-services';
import { ListPageKey, ListPageService } from '~core/list-page';
import { ERM, SupplierStatus } from '~core/models';

@Component({
	selector: 'supplier-status-workflow-app',
	templateUrl: '../common-status-workflow.component.html',
	styleUrls: ['./supplier-status-workflow.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierStatusWorkflowComponent implements OnInit {

	constructor(
		private supplierStatusSrv: SupplierStatusService,
		private listSrv: ListPageService<SupplierStatus, SupplierStatusService>,
		public commonModalSrv: CommonModalService
	) { }

	ngOnInit() {
		this.listSrv.setup({
			key: ListPageKey.SUPPLIER_STATUS,
			entitySrv: this.supplierStatusSrv,
			selectParams: { sortBy: 'step', descending: false },
			entityMetadata: ERM.SUPPLIER_STATUS
		});
	}
}
