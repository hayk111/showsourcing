import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { SmartSearch } from '~shared/filters';

@Component({
	selector: 'filter-smart-panel-app',
	templateUrl: './filter-smart-panel.component.html',
	styleUrls: ['./filter-smart-panel.component.scss']
})
export class FilterSmartPanelComponent implements OnInit {
	@Input() smartSearch: Array<SmartSearch> = [];
	@Output() itemAdded = new EventEmitter<any>();
	@Output() itemRemoved = new EventEmitter<any>();
	constructor() { }

	ngOnInit() {
	}

}
