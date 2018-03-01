import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from '~shared/filters';

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
