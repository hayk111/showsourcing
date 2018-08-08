import { Component, OnInit, Output, Input, EventEmitter, TemplateRef } from '@angular/core';

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
	@Input() contextualMenu: TemplateRef<any>;
	/** The dropped item event including data associated with the target and the element */
	@Output() itemDropped = new EventEmitter<{ target: any, droppedElement: any }>();
	/** Triggers when the item is selected */
	@Output() selectItem = new EventEmitter<any>();
	/** Triggers when the item is unselected */
	@Output() unselectItem = new EventEmitter<any>();

	constructor(private kanbanSrv: KanbanService) {
	}

	trackByFn(index, product) {
		return product.id;
	}

	/** The current status id for a product */
	getCurrentStatusId(product) {
		if (product.statuses) {
			return product.statuses[0].status.id;
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
		this.itemDropped.next({ target, droppedElement });
	}

	/** Simulate the optimistic cache to directly update the UI */
	refreshStatusesInternally(target, droppedElement) {
		const newStatus = new ProductStatus({ status: { id: target.id } });
		const updatedProduct = { ...droppedElement, statuses: [ newStatus, ...droppedElement.statuses ] };

		const currentStatusId = this.getCurrentStatusId(droppedElement);

		// Remove for old status
		const currentStatus = this.statuses.find(status => status.id === currentStatusId);
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
		if (targetStatus) {
			const products = targetStatus.products;
			const productIndex = products.findIndex(p => p.id === droppedElement);
			targetStatus.products = targetStatus.products.concat([ updatedProduct ]);
		}
	}
}
