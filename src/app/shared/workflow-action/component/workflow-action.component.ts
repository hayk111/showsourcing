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

	updateStatusProd(status) {
		if (status.id !== this.entity.statuses[0].status.id) { // we dont update if we click the same
			const tempS = new ProductStatus({ status });
			this.workflowSrv.updateStatus({ id: this.entity.id, statuses: [tempS, ...this.entity.statuses] }, this.typeEntity).subscribe();
		}
	}

	updateStatusSup(status) {
		this.workflowSrv.updateStatus({ id: this.entity.id, status }, this.typeEntity).subscribe();
	}

}
