import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filter, FilterClass } from '~store/model/misc/filter.model';


// display buttons used for filtering.
@Component({
	selector: 'filter-btns-panel-app',
	templateUrl: './filter-btns-panel.component.html',
	styleUrls: ['./filter-btns-panel.component.scss']
})
export class FilterBtnsPanelComponent implements OnInit {
	// array of filter class, we use this to display buttons
	@Input() filterClasses: Array<FilterClass>;
	// when a button is displayed we still need to show the active filters
	// so the map can be thought as <Button, ActiveFilters>
	@Input() filterMap: Map<FilterClass, Array<Filter>> = new Map();

	@Output() filterBtnClicked = new EventEmitter<FilterClass>();
	@Output() filterRemove = new EventEmitter<Filter>();

	constructor() { }

	ngOnInit() {
	}

}
