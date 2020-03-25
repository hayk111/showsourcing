import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Entity } from '~core/erm3/models/_entity.model';

export type SelectionMap = Map<string, Entity>;

@Injectable({
	providedIn: 'root'
})
export class SelectionService {
	selection: SelectionMap = new Map();
	private _selection$ = new BehaviorSubject<SelectionMap>(this.selection);
	selection$ = this._selection$.asObservable().pipe();

	selectOne(item: Entity) {
		// we do this so change detection, detects the change
		this.selection = new Map(this.selection);
		this.selection.set(item.id, item);
		this.emit();
	}

	unselectOne(item: Entity) {
		this.selection = new Map(this.selection);
		this.selection.delete(item.id);
		this.emit();
	}

	selectAll(items: Entity[]) {
		this.selection = new Map(this.selection);
		items.forEach(item => this.selection.set(item.id, item));
		this.emit();
	}

	unselectMany(items: Entity[]) {
		this.selection = new Map(this.selection);
		items.forEach(item => this.selection.delete(item.id));
		this.emit();
	}

	unselectAll() {
		this.selection = new Map();
		this.emit();
	}

	getSelectedValues(): Entity[] {
		return Array.from(this.selection.values());
	}


	getSelectedIds(): string[] {
		return Array.from(this.selection.keys());
	}

	private emit() {
		this._selection$.next(this.selection);
	}
}
