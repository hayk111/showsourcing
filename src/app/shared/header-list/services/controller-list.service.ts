import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ControllerListService {

	private filtersClear$ = new Subject();
	filtersClear = this.filtersClear$.asObservable();

	onFiltersClear() {
		this.filtersClear$.next();
	}
}
