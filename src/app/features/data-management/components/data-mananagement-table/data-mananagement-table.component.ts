import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { Entity } from '~entity';

@Component({
	selector: 'data-management-table-app',
	templateUrl: './data-mananagement-table.component.html',
	styleUrls: ['./data-mananagement-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataMananagementTableComponent implements OnInit {
	@Input() items = [];
	@Output() itemRemoved = new EventEmitter<Entity>();
	@Output() update = new EventEmitter<any>();
	@Output() selection = new EventEmitter<any>();

	selected = [];
	searchStr = '';
	constructor() {}

	ngOnInit() {}

	onUpdate(item, event) {
		this.update.emit({ propName: 'name', value: event, itemId: item.id });
	}

	search(value) {
		this.searchStr = value;
	}

	delete(item) {
		this.itemRemoved.emit(item.id);
	}

	onCheckChange(event, item) {
		if (event.target.checked) {
			this.selected.push(item.id);
		} else {
			this.selected = this.selected.filter(f => f === item.id);
		}
		this.selection.emit(this.selected);
	}

	get availableItems() {
		if (!this.searchStr) return this.items;
		return this.items.filter(item => item.name.startsWith(this.searchStr));
	}
}
