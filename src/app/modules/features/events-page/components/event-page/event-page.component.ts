import { Component, OnInit } from '@angular/core';
import { FilterGroupName } from '../../../../store/model/misc/filter.model';
import { Store } from '@ngrx/store';
import { EntityState } from '../../../../store/utils/entities.utils';
import { Event } from '../../../../store/model/entities/event.model';
import { Observable } from 'rxjs/Observable';
import { selectEvents } from '../../../../store/selectors/entities/events.selector';

@Component({
	selector: 'app-event-page',
	templateUrl: './event-page.component.html',
	styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {
	filterGroupName = FilterGroupName.EVENTS_PAGE;
	filterRepr = [];
	events$: Observable<EntityState<Event>>;
	pending = true;

	constructor(private store: Store<any>) { }

	ngOnInit() {
		this.events$ = this.store.select(selectEvents);
		this.events$.subscribe(e => this.onItemsReceived(e));
	}

	onItemsReceived(items: EntityState<Event>) {
		this.pending = items.pending;
	}

}
