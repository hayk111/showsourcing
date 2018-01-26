import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Entity } from '../../../../store/utils/entities.utils';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

@Component({
	selector: 'data-management-table-app',
	templateUrl: './data-mananagement-table.component.html',
	styleUrls: ['./data-mananagement-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataMananagementTableComponent implements OnInit {
	@Input() items = [];
	@Output() itemRemoved = new EventEmitter<Entity>();
	@Output() update = new EventEmitter<any>();

	searchStr = '';

	constructor() { }

	ngOnInit() {

	}

	onUpdate(item, event) {
		this.update.emit({ propName: 'name', value: event, itemId: item.id });
	}

	search(value) {
		this.searchStr = value;
	}

	delete(item) {
		this.itemRemoved.emit(item);
	}

	get availableItems() {
		if (!this.searchStr)
			return this.items;
		return this.items.filter(item => item.name.startsWith(this.searchStr));
	}

}
