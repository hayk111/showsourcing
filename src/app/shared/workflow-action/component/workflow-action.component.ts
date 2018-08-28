import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityMetadata, ProductStatus, ProductStatusType, SupplierStatus } from '~models';
import { WorkflowActionService } from '~shared/workflow-action/service/workflow-action.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'workflow-action-app',
	templateUrl: './workflow-action.component.html',
	styleUrls: ['./workflow-action.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [WorkflowActionService],
})
export class WorkflowActionComponent extends AutoUnsub implements OnInit {

	@Input() typeEntity: EntityMetadata;
	/** In this case its always going to be a Product or Supplier */
	@Input() entity: any;
	@Input() xPosition = 16;
	@Input() yPosition = 30;
	@Input() selectSize = 'm';
	status$: Observable<ProductStatusType[] | SupplierStatus[]>;

	constructor(
		private workflowSrv: WorkflowActionService
	) {
		super();
	}

	ngOnInit() {
		this.status$ = this.workflowSrv.getTableStatus(this.typeEntity);
	}

	updateStatus(status) {
		if (status.id !== this.entity.status.status.id) { // we dont update if we click the same
			const tempS = new ProductStatus({ status });
			this.workflowSrv.updateStatus({ id: this.entity.id, status: tempS }, this.typeEntity).subscribe();
		}
	}

	setStatus(status) {
		const tempS = new ProductStatus({ status });
		this.workflowSrv.updateStatus({ id: this.entity.id, status: tempS }, this.typeEntity).subscribe();
	}
}
