import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filter, FilterClass } from '~store/model/misc/filter.model';


// display buttons used for filtering.
// if someday we want to display something else than buttons in the filter-panel
// we should use inclusion instead.

// I'm not doing it now because this is cleaner
@Component({
	selector: 'filter-btns-panel-app',
	templateUrl: './filter-btns-panel.component.html',
	styleUrls: ['./filter-btns-panel.component.scss']
})
export class FilterBtnsPanelComponent implements OnInit {
	@Input() filterMap: Map<FilterClass, Array<Filter>> = new Map();
	@Input() filterClasses: Array<FilterClass>;
	@Output() filterBtnClicked = new EventEmitter<FilterClass>();
	@Output() filterRemove = new EventEmitter<Filter>();

	constructor() { }

	ngOnInit() {
	}

}
