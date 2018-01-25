import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filter, FilterClass } from '../../../../store/model/filter.model';

@Component({
	selector: 'filter-btn-app',
	templateUrl: './filter-btn.component.html',
	styleUrls: ['./filter-btn.component.scss']
})
export class FilterBtnComponent implements OnInit {
	@Input() filterClass: FilterClass;
	@Input() filters: Array<Filter>;
	@Output() filterRemove = new EventEmitter<Filter>();
	@Output() btnClicked = new EventEmitter<FilterClass>();

 	constructor() { }

	ngOnInit() {
	}

	onBtnClick() {
		this.btnClicked.emit(this.filterClass);
	}

	onFilterClick(index: number) {
		this.filterRemove.emit(this.filters[index]);
	}

}
