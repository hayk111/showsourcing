import { Component, OnInit } from '@angular/core';
import { ProductStatus } from '../../../../store/model/entities/product.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { selectProductByStatus } from '../../../../store/selectors/entities/products.selector';
import { ProductActions } from '../../../../store/action/entities/product.action';

@Component({
	selector: 'kanban-test-app',
	templateUrl: './kanban-test.component.html',
	styleUrls: ['./kanban-test.component.scss']
})
export class KanbanTestComponent implements OnInit {
	itemMatrix = [
		['first', 'second', 'third'],
		['A', 'B', 'C'],
		['1', '2', '3' ]
	];

	productsByStatus$: Observable<any>;

	event;
	constructor(private store: Store<any>) {

	}

	ngOnInit() {
		this.productsByStatus$ = this.store.select(selectProductByStatus);
		// this.store.dispatch(ProductActions.load());
	}

	onEvent(event) {
		const leaving: number = event.leavingBag;
		const entering = event.enteringBag;
		const data = event.data;
		this.itemMatrix[leaving] = this.itemMatrix[leaving].filter(x => x !== data);
		this.itemMatrix[entering].push(data);
		this.event = event;
	}

	changeStatus(event) {
	}


}
