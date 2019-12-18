import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class SelectionService {
	selection = new Map<string, any>();
	/** added selection columns because the board view selection partial selection works differently */
	selectedColumns: Map<string, string> = new Map();
	private _selection$ = new BehaviorSubject<Map<string, any>>(this.selection);
	selection$ = this._selection$.asObservable();

	selectOne(item: { id?: string }, column?: any) {
		// we do this so change detection, detects the change
		this.selection = new Map(this.selection);
		this.selection.set(item.id, item);

		if (column) {
			if (column.data.every(elem => this.selection.has(elem.id))) {
				this.selectedColumns.set(column.id, 'selectedAll');
			} else {
				this.selectedColumns.set(column.id, 'selectedPartial');
			}
		}

		this.emit();
	}

	unselectOne(item: { id?: string }) {
		this.selection = new Map(this.selection);
		this.selection.delete(item.id);
		this.emit();
	}

	selectColumn(column: any) {
		this.selection = new Map(this.selection);

		column.data.forEach(item => {
			this.selection.set(item.id, item);
		});

		this.selectedColumns.set(column.id, 'selectedAll');
		this.emit();
	}

	unselectColumn(column: any) {
		this.selection = new Map(this.selection);

		column.data.forEach(item => {
			this.selection.delete(item.id);
		});

		this.selectedColumns.set(column.id, 'unchecked');
		this.emit();
	}

	selectAll(items: { id: string }[]) {
		this.selection = new Map(this.selection);
		items.forEach(item => this.selection.set(item.id, item));
		this.emit();
	}

	unselectMany(items: { id: string }[]) {
		this.selection = new Map(this.selection);
		items.forEach(item => this.selection.delete(item.id));
		this.emit();
	}

	unselectAll() {
		this.selection = new Map();
		this.emit();
	}

	getSelectionValues() {
		return Array.from(this.selection.values());
	}

	getSelectionIds() {
		return Array.from(this.selection.keys());
	}

	private emit() {
		this._selection$.next(this.selection);
	}

}
