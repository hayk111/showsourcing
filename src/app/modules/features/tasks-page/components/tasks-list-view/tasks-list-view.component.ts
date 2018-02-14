import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState, entityStateToArray } from '../../../../store/utils/entities.utils';
import { Product } from '../../../../store/model/entities/product.model';
import { MatTableDataSource } from '@angular/material';
import { selectSuppliers } from '../../../../store/selectors/entities/suppliers.selector';

@Component({
	selector: 'tasks-list-view-app',
	templateUrl: './tasks-list-view.component.html',
	styleUrls: ['./tasks-list-view.component.scss']
})
export class TasksListViewComponent implements OnInit {

	@Input() tasks = [];
	constructor() { }

	ngOnInit() {
	}

}
