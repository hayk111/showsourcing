import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Filter } from '~shared/filters';
import { Entity } from '~models';
import { BaseComponent } from '~shared/base-component/base-component';

@Component({
	selector: 'filter-smart-panel-app',
	templateUrl: './filter-smart-panel.component.html',
	styleUrls: ['./filter-smart-panel.component.scss'],
})
export class FilterSmartPanelComponent extends BaseComponent implements OnInit {
	@Input() smartSearch: Map<string, Array<Entity>> = new Map();
	@Input() selection: Map<string, Map<string, Filter>> = new Map();
	@Output() filterAdded = new EventEmitter<Filter>();
	@Output() filterRemoved = new EventEmitter<Filter>();
	constructor() {
    super();
  }

	ngOnInit() { }

	onCheck(entityName: string, value: any) {
		// this.filterAdded.emit({ type: entityName, value });
	}

	onUncheck(entityName: string, value: any) {
		// this.filterRemoved.emit({ type: entityName, value });
	}

	getFilterMap(entityName: string) {
		return this.selection.get(entityName) || new Map();
	}
}
