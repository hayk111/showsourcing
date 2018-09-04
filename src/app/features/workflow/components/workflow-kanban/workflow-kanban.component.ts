import { Component, OnInit, Output, Input, EventEmitter, TemplateRef, HostBinding } from '@angular/core';

import { Observable } from 'rxjs';
import { KanbanService } from '~features/workflow/services/kanban.service';
import { ProductStatus } from '~models';

/** Drag'n drop workflow */

@Component({
	selector: 'workflow-kanban-app',
	templateUrl: './workflow-kanban.component.html',
	styleUrls: ['./workflow-kanban.component.scss']
})
export class WorkflowKanbanComponent {
	/** The list of statuses included associated products */
	@Input() statuses;
	/** A reference to the contextual menu template */
	@Input() contextualMenu: TemplateRef<any>;
	/** The selected items */
	@Input() selectedItems: any[];
	/** Whether the kaban takes the full width */
	@Input() @HostBinding('class.full-width') fullWidth: boolean;
	/** The dropped item event including data associated with the target and the element */
	@Output() itemDropped = new EventEmitter<{ target: any, droppedElement: any }>();
	/** Triggers when the item is selected */
	@Output() selectItem = new EventEmitter<any>();
	/** Triggers when the item is unselected */
	@Output() unselectItem = new EventEmitter<any>();
	/** Triggers when all items are selected for a status*/
	@Output() selectAllItems = new EventEmitter<any[]>();
	/** Triggers when all items are unselected for a status */
	@Output() unselectAllItems = new EventEmitter<any[]>();



	separatorColor: string;
	dragInProgress = false;

	constructor(private kanbanSrv: KanbanService) {
	}

	trackByFn(index, product) {
		return product.id;
	}

	/** The current status id for a product */
	getCurrentStatusTypeId(product) {
		if (product.status) {
			return product.status.status.id;
		}
		return null;
	}

	/** Detect when an item (through namespace) enters a dropzone */
	onItemEntered(namespace: string) {
		this.kanbanSrv.itemEntered$.next({ namespace });
	}

	/** Detect when an item (through namespace) leaves a dropzone */
	onItemLeft(namespace: string) {
		this.kanbanSrv.itemLeft$.next({ namespace });
	}

	/**
	 * Detect when an item is dropped and locally update ui (optimistic ui)
	 * before the request completes
	*/
	onItemDropped({ target, droppedElement }) {
		this.refreshStatusesInternally(target, droppedElement);
		console.log('>> this.statuses = ', this.statuses);
		this.itemDropped.next({ target, droppedElement });
	}

	/** Simulate the optimistic cache to directly update the UI */
	refreshStatusesInternally(target, droppedElement) {
		console.log('>> refreshStatusesInternally');
		console.log('  statuses = ', this.statuses);
		console.log('  droppedElement = ', droppedElement);
		console.log('  target = ', target);
		const newStatus = new ProductStatus({ status: { id: target.id } });
		const updatedProduct = { ...droppedElement, status: newStatus };

		let currentStatusTypeId = this.getCurrentStatusTypeId(droppedElement);
		if (!currentStatusTypeId) {
			currentStatusTypeId = -1;
		}
		console.log('  >> currentStatusTypeId = ', currentStatusTypeId);

		// Remove for old status
		const currentStatus = this.statuses.find(status => status.id === currentStatusTypeId);
		console.log('  >> currentStatus = ', currentStatus);
		if (currentStatus) {
			const products = currentStatus.products;
			const productIndex = products.findIndex(p => p.id === droppedElement.id);
			if (productIndex !== -1) {
				products.splice(productIndex, 1);
				currentStatus.products = products.slice();
			}

		}

		// Add to new status
		const targetStatus = this.statuses.find(status => status.id === target.id);
		console.log('  >> targetStatus = ', targetStatus);
		if (targetStatus) {
			// const products = targetStatus.products;
			// const productIndex = products.findIndex(p => p.id === droppedElement);
			targetStatus.products = targetStatus.products.concat([updatedProduct]);
		}
	}

	onCheckItemsChange(status: any, checked: boolean) {
		if (checked) {
			this.selectAllItems.emit(status.products);
		} else {
			this.unselectAllItems.emit(status.products);
		}
	}

	isSelected(selectedItems, id) {
		return selectedItems.has(id);
	}

	hasAllItemsSelected(selectedItems, status) {
		if (!status || !status.products || status.products.length === 0) {
			return false;
		}

		let allSelected = true;
		status.products.forEach(product => {
			if (!this.isSelected(selectedItems, product.id)) {
				allSelected = false;
			}
		});
		return allSelected;
	}

	dragStart() {
		this.dragInProgress = true;
	}

	dragEnd() {
		this.dragInProgress = false;
	}
}
