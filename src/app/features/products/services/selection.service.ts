import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable()
export class SelectionService {
	selection = new Map<string, boolean>();
	private _selection$ = new BehaviorSubject<Map<string, boolean>>(this.selection);
	selection$ = this._selection$.asObservable();

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
