import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityRepresentation, EntityTarget } from '~entity/store/entity.model';
import { SearchedEntities } from '~app/shared/filters/store/selectors/search-entities.selector';

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
		// const filter = this.makeFilter(repr, value);
		// if (event.target.checked) this.itemAdded.emit(filter);
		// else this.itemRemoved.emit(filter);
	}

	makeFilter(repr: EntityRepresentation, value) {

	}
}
