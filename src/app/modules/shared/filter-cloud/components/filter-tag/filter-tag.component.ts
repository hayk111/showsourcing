import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Filter, FilterGroupName, FilterClass } from '../../../../store/model/misc/filter.model';
import { Store } from '@ngrx/store';
import { FilterActions } from '../../../../store/action/misc/filter.action';

@Component({
	selector: 'filter-tag-app',
	templateUrl: './filter-tag.component.html',
	styleUrls: ['./filter-tag.component.scss']
})
export class FilterTagComponent implements OnInit {
	@Input() filter: Filter;
	@Output() filterRemoved = new EventEmitter<Filter>();
	constructor() { }

	ngOnInit() {}

	removeFilter(filter: Filter) {
		this.filterRemoved.emit(filter);
	}
}
