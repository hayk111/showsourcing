import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Filter } from '~shared/filters/models';
import { Store } from '@ngrx/store';
import { selectEntityArray } from '~entity/store/entity.selector';
import { Observable } from 'rxjs/Observable';

// this is the entity panel that appears once a filter button has been clicked
// a list of choices is displayed and the user can pick through those choices
@Component({
	selector: 'filter-entity-panel-app',
	templateUrl: './filter-entity-panel.component.html',
	styleUrls: ['./filter-entity-panel.component.scss'],
})
export class FilterEntityPanelComponent {
	// choices displayed
	@Input() choices: Array<any> = [];

	@Output() filterAdded = new EventEmitter<Filter>();
	@Output() filterRemoved = new EventEmitter<Filter>();
	// when we search through those choices
	@Output() entitySearch = new EventEmitter<string>();

	// selected values
	values: Array<Filter> = [];

	@Input()
	set selected(filters: Array<Filter>) {
		this.values = filters.map(filter => filter.value);
	}

	search(value: string) {
		this.entitySearch.emit(value);
	}

	onItemAdded({ id, name }) {
		// this.filterAdded.emit(filter);
	}

	onItemRemoved({ id, name }) {
		// this.filterRemoved.emit(filter);
	}
}
