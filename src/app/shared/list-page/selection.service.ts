import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class SelectionService {
	selection = new Map<string, any>();
	private _selection$ = new BehaviorSubject<Map<string, any>>(this.selection);
	selection$ = this._selection$.asObservable();

	emit() {
		this._selection$.next(this.selection);
	}

	selectOne(item: { id: string }) {
		// we do this so change detection, detects the change
		this.selection = new Map(this.selection);
		this.selection.set(item.id, item);
		console.log(this.selection);
		this.emit();
	}

	unselectOne(item: { id: string }) {
		this.selection = new Map(this.selection);
		this.selection.delete(item.id);
		console.log(this.selection);
		this.emit();
	}

	selectAll(items: { id: string }[]) {
		this.selection = new Map(this.selection);
		items.forEach(item => this.selection.set(item.id, item));
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

}
