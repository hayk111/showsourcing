import { Injectable } from '@angular/core';
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
