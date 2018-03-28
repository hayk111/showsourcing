import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FilterEvent } from '~app/shared/filters/models';
import { SearchedEntities } from '~app/shared/filters/store/selectors';
import { EntityRepresentation, EntityTarget } from '~entity/store/entity.model';
import { FilterCategory, FilterProjects, FilterSupplier } from '~shared/filters/models';

@Component({
	selector: 'filter-smart-panel-app',
	templateUrl: './filter-smart-panel.component.html',
	styleUrls: ['./filter-smart-panel.component.scss'],
})
export class FilterSmartPanelComponent implements OnInit {
	@Input() smartSearch: Array<SearchedEntities> = [];
	@Input() selection: Array<string> = [];
	@Output() itemAdded = new EventEmitter<EntityTarget>();
	@Output() itemRemoved = new EventEmitter<EntityTarget>();
	constructor() { }

	ngOnInit() { }

	onCheck(event, repr: EntityRepresentation, value: any) {
		const filter = this.makeFilter(repr, value);
		if (event.target.checked) this.itemAdded.emit(filter);
		else this.itemRemoved.emit(filter);
	}

	makeFilter(repr: EntityRepresentation, value) {
		switch (repr.entityName) {
			case 'supplier':
				return FilterSupplier.newInstance(value, value);
			case 'event':
				return FilterEvent.newInstance(value, value);
			case 'categories':
				return FilterCategory.newInstance(value, value);
			case 'projects':
				return FilterProjects.newInstance(value, value);
		}
	}
}
