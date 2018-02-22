import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { EntityState, entityStateToArray } from '../../../../store/utils/entities.utils';
import { Event } from '../../../../store/model/entities/event.model';
import { selectSuppliers } from '../../../../suppliers/store/selectors/suppliers.selector';

@Component({
	selector: 'events-list-view-app',
	templateUrl: './events-list-view.component.html',
	styleUrls: ['./events-list-view.component.scss']
})
export class EventsListViewComponent implements OnInit {
	displayedColumns = ['name', 'creationDate'];
	constructor(private store: Store<any>) { }

	ngOnInit() {
	}
}
