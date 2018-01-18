import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FilterClass, Filter, FilterEntityClass } from '../../../../store/model/filter.model';
import { SelectableItem } from '../../../select/components/input-select-one/input-select-one.component';
import { Store } from '@ngrx/store';
import { selectEntityArray } from '../../../../store/selectors/utils.selector';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'filter-entity-panel-app',
	templateUrl: './filter-entity-panel.component.html',
	styleUrls: ['./filter-entity-panel.component.scss']
})
export class FilterEntityPanelComponent {
	@Input() choices: Array<any> = [];
	@Input() selected: Array<string> = [];
	@Input() filterClass: FilterEntityClass;
	@Output() filterAdded = new EventEmitter<Filter>();
	@Output() filterRemoved = new EventEmitter<Filter>();
	@Output() entitySearch = new EventEmitter<string>();

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

}
