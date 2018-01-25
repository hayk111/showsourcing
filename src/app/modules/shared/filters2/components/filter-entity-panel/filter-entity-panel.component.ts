import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { SelectableItem } from '../../../select/components/input-select-one/input-select-one.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { FilterEntityClass, Filter } from '../../../../store/model/misc/filter.model';

@Component({
	selector: 'filter-entity-panel-app',
	templateUrl: './filter-entity-panel.component.html',
	styleUrls: ['./filter-entity-panel.component.scss']
})
export class FilterEntityPanelComponent {
	@Input() choices: Array<any> = [];
	@Input() filterClass: FilterEntityClass;
	@Output() filterAdded = new EventEmitter<Filter>();
	@Output() filterRemoved = new EventEmitter<Filter>();
	@Output() entitySearch = new EventEmitter<string>();
	values: Array<Filter> = [];

	search(value: string) {
		this.entitySearch.emit(value);
	}

	onItemAdded({id, name}) {
		const filter = this.filterClass.newInstance(id, name);
		this.filterAdded.emit(filter);
	}

	onItemRemoved({id, name}) {
		const filter = this.filterClass.newInstance(id, name);
		this.filterRemoved.emit(filter);
	}

	@Input()
	set selected(filters: Array<Filter>) {
		this.values = filters.map(f => f.value);
	}

}
