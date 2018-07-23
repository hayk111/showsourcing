import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

import { Observable } from 'rxjs';

// drag and drop workflow
@Component({
	selector: 'workflow-kanban-app',
	templateUrl: './workflow-kanban.component.html',
	styleUrls: ['./workflow-kanban.component.scss']
})
export class WorkflowKanbanComponent {
	@Input() statuses;
	@Output() productSelect = new EventEmitter<string>();
	@Output() itemDropped = new EventEmitter<{ target: any, droppedElement: any }>();
	productsByStatus$: Observable<Array<any>>;

	constructor() {
	}

	selectProduct(id: string) {
		this.productSelect.emit(id);
	}

	trackByFn(index, product) {
		return product.id;
	}

	getCurrentStatusId(product) {
		if (product.statuses) {
			return product.statuses[0].status.id;
		}
		return null;
	}

	onItemDropped(event) {
		
	}
}
