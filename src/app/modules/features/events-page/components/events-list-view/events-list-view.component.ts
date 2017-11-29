import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState, entityStateToArray } from '../../../../store/utils/entities.utils';
import { MatTableDataSource } from '@angular/material';
import { Event } from '../../../../store/model/event.model';
import { selectSuppliers } from '../../../../store/selectors/suppliers.selector';

@Component({
	selector: 'events-list-view-app',
	templateUrl: './events-list-view.component.html',
	styleUrls: ['./events-list-view.component.scss']
})
export class EventsListViewComponent implements OnInit {
	displayedColumns = ['name', 'creationDate'];
	dataSource;
	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.store.select(selectSuppliers)
		.subscribe((sups: EntityState<Event>) => {
			const arr = entityStateToArray(sups);
			this.dataSource = new MatTableDataSource(arr);
		});
	}
}
