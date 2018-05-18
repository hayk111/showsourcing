import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// drag and drop workflow
@Component({
	selector: 'workflow-kanban-app',
	templateUrl: './workflow-kanban.component.html',
	styleUrls: ['./workflow-kanban.component.scss'],
})
export class WorkflowKanbanComponent implements OnInit {
	@Output() productSelect = new EventEmitter<string>();
	productsByStatus$: Observable<Array<any>>;
	constructor() { }

	ngOnInit() {
		// this.productsByStatus$ = this.store.select(selectProductByStatus);
	}

	changeStatus(event) {
		const patch = { propName: 'status', value: event.enteringBag, id: event.data };
		// this.store.dispatch(productActions.patch(patch));
	}

	selectProduct(id: string) {
		this.productSelect.emit(id);
	}

	trackByFn(index, product) {
		return product.id;
	}
}
