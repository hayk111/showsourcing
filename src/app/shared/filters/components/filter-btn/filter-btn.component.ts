import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filter } from '~shared/filters/models';

@Component({
	selector: 'filter-btn-app',
	templateUrl: './filter-btn.component.html',
	styleUrls: ['./filter-btn.component.scss']
})
export class FilterBtnComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
