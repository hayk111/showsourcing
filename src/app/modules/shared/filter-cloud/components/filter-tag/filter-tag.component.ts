import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Filter } from '../../../../store/model/misc/filter.model';

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
