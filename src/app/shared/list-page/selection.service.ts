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
		this.selection.set(item.id, item);
		this.emit();
	}

	unselectOne(item: { id: string }) {
		this.selection.delete(item.id);
		this.emit();
	}

	selectAll(items: { id: string }[]) {
		items.forEach(item => this.selection.set(item.id, item));
		this.emit();
	}

	unselectAll() {
		this.selection = new Map();
		this.emit();
	}
}
