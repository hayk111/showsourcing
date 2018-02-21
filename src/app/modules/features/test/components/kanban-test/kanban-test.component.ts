import { Component, OnInit } from '@angular/core';
import { selectProductByStatus, Product } from '../../../../products';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'kanban-test-app',
	templateUrl: './kanban-test.component.html',
	styleUrls: ['./kanban-test.component.scss']
})
export class KanbanTestComponent implements OnInit {
	itemMatrix = [['first', 'second', 'third'], ['A', 'B', 'C'], ['1', '2', '3']];

	productsByStatus$: Observable<any>;

	event;
	constructor(private store: Store<any>) {}

	ngOnInit() {
		this.productsByStatus$ = this.store.select(selectProductByStatus);
	}

	onEvent(event) {
		const leaving: number = event.leavingBag;
		const entering = event.enteringBag;
		const data = event.data;
		this.itemMatrix[leaving] = this.itemMatrix[leaving].filter(x => x !== data);
		this.itemMatrix[entering].push(data);
		this.event = event;
	}

	changeStatus(event) {}
}
