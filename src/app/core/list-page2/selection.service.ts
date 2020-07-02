import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// TODO: the id shouldn't be optional, I'm putting it optional during the migration else too much change is required
export interface Selectable { id?: string; }
export type SelectionMap = Map<string, Selectable>;

@Injectable({
	providedIn: 'root'
})
export class SelectionService {
	selection: SelectionMap = new Map();
	private _selection$ = new BehaviorSubject<SelectionMap>(this.selection);
	selection$ = this._selection$.asObservable().pipe();

	selectOne(item: Selectable) {
		// we do this so change detection, detects the change
		this.selection = new Map(this.selection);
		this.selection.set(item.id, item);
		this.emit();
	}

	unselectOne(item: Selectable) {
		this.selection = new Map(this.selection);
		this.selection.delete(item.id);
		this.emit();
	}

	selectAll(items: Selectable[]) {
		this.selection = new Map(this.selection);
		items.forEach(item => this.selection.set(item.id, item));
		this.emit();
	}

	unselectMany(items: Selectable[]) {
		this.selection = new Map(this.selection);
		items.forEach(item => this.selection.delete(item.id));
		this.emit();
	}

	unselectAll() {
		this.selection = new Map();
		this.emit();
	}

	getSelectedValues(): Selectable[] {
		return Array.from(this.selection.values());
	}


	getSelectedIds(): string[] {
		return Array.from(this.selection.keys());
	}

	private emit() {
		this._selection$.next(this.selection);
	}
}
