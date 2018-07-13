import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityMetadata, Product, ProductStatus, Supplier, SupplierStatus } from '~models';
import { WorkflowActionService } from '~shared/workflow-action/service/workflow-action.service';

@Component({
	selector: 'workflow-action-app',
	templateUrl: './workflow-action.component.html',
	styleUrls: ['./workflow-action.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [WorkflowActionService]
})
export class WorkflowActionComponent implements OnInit {

	@Input() typeStatus: EntityMetadata;
	@Input() entity: Supplier | Product;
	status$: Observable<SupplierStatus[] | ProductStatus[]>;

	constructor(
		private workflowSrv: WorkflowActionService
	) { }

	ngOnInit() {
		this.status$ = this.workflowSrv.getStatus(this.typeStatus);
	}

}
