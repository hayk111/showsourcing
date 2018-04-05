import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from '~shared/filters';

@Component({
	selector: 'filter-tag-app',
	templateUrl: './filter-tag.component.html',
	styleUrls: ['./filter-tag.component.scss']
})
export class FilterTagComponent implements OnInit {
	@Input() title: string;
	@Output() filterRemoved = new EventEmitter<null>();
	constructor() { }

	ngOnInit() { }

	removeFilter() {
		this.filterRemoved.emit();
	}
}
