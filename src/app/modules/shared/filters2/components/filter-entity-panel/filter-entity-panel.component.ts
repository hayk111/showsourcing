import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FilterClass, Filter } from '../../../../store/model/filter.model';
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
	@Input() filterClass: FilterClass;
	@Output() filterAdded = new EventEmitter<Filter>();
	@Output() filterRemoved = new EventEmitter<Filter>();
	@Output() entitySearch = new EventEmitter<string>();

	search(value: string) {
		this.entitySearch.emit(value);
	}

	onItemAdded(filter: Filter) {
		this.filterAdded.emit(filter);
	}

	onItemRemoved(filter: Filter) {
		this.filterRemoved.emit(filter);
	}

}
