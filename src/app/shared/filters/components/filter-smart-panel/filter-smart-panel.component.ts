import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityRepresentation, EntityTarget, Entity } from '~entity/store/entity.model';
import { Filter } from '~app/shared/filters';

@Component({
	selector: 'filter-smart-panel-app',
	templateUrl: './filter-smart-panel.component.html',
	styleUrls: ['./filter-smart-panel.component.scss'],
})
export class FilterSmartPanelComponent implements OnInit {
	@Input() smartSearch: Map<string, Array<Entity>> = new Map();
	@Input() selection: Map<string, Map<string, Filter>> = new Map();
	@Output() filterAdded = new EventEmitter<Filter>();
	@Output() filterRemoved = new EventEmitter<Filter>();
	constructor() { }

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
