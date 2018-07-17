import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityMetadata, Product, ProductStatus, Supplier, SupplierStatus, ProductStatusType } from '~models';
import { WorkflowActionService } from '~shared/workflow-action/service/workflow-action.service';
import { AutoUnsub } from '~utils';
import { map } from '../../../../../node_modules/rxjs/operators';

@Component({
	selector: 'workflow-action-app',
	templateUrl: './workflow-action.component.html',
	styleUrls: ['./workflow-action.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [WorkflowActionService]
})
export class WorkflowActionComponent extends AutoUnsub implements OnInit {

	@Input() typeEntity: EntityMetadata;
	@Input() entity: Supplier | Product;
	@Input() xPosition = 16;
	@Input() yPosition = 30;
	status$: Observable<SupplierStatus[] | ProductStatusType[]>;

	constructor(
		private workflowSrv: WorkflowActionService
	) {
		super();
	}

	ngOnInit() {
		this.status$ = this.workflowSrv.getTableStatus(this.typeEntity);
	}
	updateStatus(status) {
		this.workflowSrv.updateStatus({ id: this.entity.id, status }, this.typeEntity).subscribe();
	}

}
