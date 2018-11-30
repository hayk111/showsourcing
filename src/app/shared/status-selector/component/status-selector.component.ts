import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityMetadata, ProductStatus, ProductStatusType, SupplierStatus, SampleStatus, ERM } from '~models';
import { ContextMenuComponent } from '~shared/context-menu/components/context-menu/context-menu.component';
import { AutoUnsub } from '~utils';

import { StatusSelectorService } from '../service/status-selector.service';

@Component({
	selector: 'status-selector-app',
	templateUrl: './status-selector.component.html',
	styleUrls: ['./status-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusSelectorComponent extends AutoUnsub implements OnInit {

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
	/** string[] since tasks does not have a status entity */
	status$: Observable<ProductStatusType[] | SupplierStatus[] | SampleStatus[]>;
	erm = ERM;

	constructor(
		private statusSlctSrv: StatusSelectorService
	) {
		super();
	}

	ngOnInit() {
		this.status$ = this.statusSlctSrv.getTableStatus(this.typeEntity);
	}
	updateStatus(status) {
		if (status.id !== this.entity.status.status.id) { // we dont update if we click the same
			const tempS = new ProductStatus({ status });
			if (this.internalUpdate) {
				this.statusSlctSrv.updateStatus({ id: this.entity.id, status: tempS }, this.typeEntity).subscribe();
			} else {
				this.statusUpdated.emit(status);
			}
		}
	}

	setStatus(status) {
		const tempS = new ProductStatus({ status });
		if (this.internalUpdate) {
			this.statusSlctSrv.updateStatus({ id: this.entity.id, status: tempS }, this.typeEntity).subscribe();
		} else {
			this.statusUpdated.emit(status);
		}
	}

	getTaskStatus() {
		let taskStatus = 'pending';
		if (this.entity.done)
			taskStatus = 'done';
		else if (this.entity.dueDate && (new Date().getTime() >= Date.parse(this.entity.dueDate.toString())))
			taskStatus = 'overdue';
		return taskStatus;
	}

	getTaskColor() {
		let taskStatusColor = 'secondary'; // pending
		if (this.entity.done)
			taskStatusColor = 'success'; // done
		else if (this.entity.dueDate && (new Date().getTime() >= Date.parse(this.entity.dueDate.toString())))
			taskStatusColor = 'warn'; // overdue
		return taskStatusColor;
	}

	updateTask() {
		const done = !this.entity.done;
		this.statusSlctSrv.updateTask({ id: this.entity.id, done });
	}

	closeMenu() {
		if (this.menus && this.menus.length > 0) {
			const contextualMenu = this.menus.first;
			contextualMenu.closeMenu();
		}
	}
}
