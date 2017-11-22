import { Component, OnInit } from '@angular/core';
import { FilterGroupName } from '../../../../store/model/filter.model';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-event-page',
	templateUrl: './event-page.component.html',
	styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {
	filterGroupName = FilterGroupName.EVENTS_PAGE;
	targets = [];
	events$;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.events$ = this.store.select('events');
	}

}
