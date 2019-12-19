import { Injectable } from '@angular/core';
import { Entity } from '~core/models';
import { KanbanColumn } from '../interfaces';


@Injectable({
	providedIn: 'root'
})
export class KanbanSelectionService {
	columns: KanbanColumn[];
	columnInSelection: KanbanColumn;

	selectOne(item: Entity, column: KanbanColumn) {
		this.columnInSelection = column;
		this.columns
			.filter(col => col.id !== this.columnInSelection.id)
			.forEach(col => col.unselectAll());
		this.columnInSelection.selectOne(item);
	}

	unselectOne(item: Entity, column: KanbanColumn) {
		column.unselectOne(item);
		if (column.selection.size === 0) {
			this.columnInSelection = undefined;
		}
	}

	selectAll(column?: KanbanColumn) {
		if (column) {
			this.columnInSelection = column;
		}
		this.columnInSelection.selectAll();
	}

	unselectAll() {
		this.columnInSelection.unselectAll();
		this.columnInSelection = undefined;
	}

	get selection() {
		return this.columnInSelection ? this.columnInSelection.selection : new Map();

	}

	get selectableItems() {
		return this.columnInSelection ? this.columnInSelection.data : [];
	}
}
