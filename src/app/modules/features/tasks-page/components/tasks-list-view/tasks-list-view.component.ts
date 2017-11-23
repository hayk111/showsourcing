import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState, entityStateToArray } from '../../../../store/utils/entities.utils';
import { Product } from '../../../../store/model/product.model';
import { MatTableDataSource } from '@angular/material';

@Component({
	selector: 'tasks-list-view',
	templateUrl: './tasks-list-view.component.html',
	styleUrls: ['./tasks-list-view.component.scss']
})
export class TasksListViewComponent implements OnInit {

	tasks = [];
	displayedColumns = ['description', 'type', 'product', 'supplier', 'status'];
	dataSource;
	suppliers$;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.suppliers$ = this.store.select('suppliers');
	}

	@Input() set tasksEntities(pe: EntityState<Product>) {
		this.tasks = entityStateToArray(pe);
		this.dataSource = new MatTableDataSource(this.tasks);
	}

}
