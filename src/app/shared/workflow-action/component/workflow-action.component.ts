import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChildren, QueryList, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityMetadata, ProductStatus, ProductStatusType, SupplierStatus } from '~models';
import { WorkflowActionService } from '~shared/workflow-action/service/workflow-action.service';
import { AutoUnsub } from '~utils';
import { ContextMenuComponent } from '~shared/context-menu/components/context-menu/context-menu.component';

@Component({
	selector: 'workflow-action-app',
	templateUrl: './workflow-action.component.html',
	styleUrls: ['./workflow-action.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [WorkflowActionService],
})
export class WorkflowActionComponent extends AutoUnsub implements OnInit {

	@Input() typeEntity: EntityMetadata;
	/** In this case its always going to be a Product or Supplier */
	@Input() entity: any;
	@Input() xPosition = 16;
	@Input() yPosition = 30;
	@Input() selectSize = 'm';
	@Input() isSendToWorkFlow = false;
	@Input() internalUpdate = true;
	@Output() statusUpdated = new EventEmitter<any>();
	@ViewChildren(ContextMenuComponent) menus: QueryList<ContextMenuComponent>;
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
			if (this.internalUpdate) {
				this.workflowSrv.updateStatus({ id: this.entity.id, status: tempS }, this.typeEntity).subscribe();
			} else {
				this.statusUpdated.emit(tempS);
			}
		}
	}

	setStatus(status) {
		const tempS = new ProductStatus({ status });
		if (this.internalUpdate) {
			this.workflowSrv.updateStatus({ id: this.entity.id, status: tempS }, this.typeEntity).subscribe();
		} else {
			this.statusUpdated.emit(tempS);
		}
	}

	closeMenu() {
		if (this.menus && this.menus.length > 0) {
			const contextualMenu = this.menus.first;
			contextualMenu.closeMenu();
		}
	}
}
