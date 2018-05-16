import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class SelectionService {

	private _selection$ = new Subject<Map<string, boolean>>();
	subject$ = this._selection$.asObservable();
	selection = new Map<string, boolean>();

	emit() {
		this._selection$.next(this.selection);
	}

	selectOne(id: string) {
		this.selection.set(id, true);
		this.emit();
	}

	unselectOne(id: string) {
		this.selection.delete(id);
		this.emit();
	}

	selectAll(ids: string[]) {
		ids.forEach(id => this.selection.set(id, true));
		this.emit();
	}

	unselectAll() {
		this.selection = new Map();
		this.emit();
	}
}