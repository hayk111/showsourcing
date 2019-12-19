import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Entity } from '~core/models';



@Injectable({
	providedIn: 'root'
})
export class SelectionService {
	selection = new Map<string, Entity>();
	private _selection$ = new BehaviorSubject<Map<string, Entity>>(this.selection);
	selection$ = this._selection$.asObservable();

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
