import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';
import { KanbanService } from '../../services/kanban.service';

/** Drag'n drop workflow */

@Component({
	selector: 'workflow-kanban-app',
	templateUrl: './workflow-kanban.component.html',
	styleUrls: ['./workflow-kanban.component.scss']
})
export class WorkflowKanbanComponent {
	/** The list of statuses included associated products */
	@Input() statuses;
	/** The dropped item event including data associated with the target and the element */
	@Output() itemDropped = new EventEmitter<{ target: any, droppedElement: any }>();

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

}
