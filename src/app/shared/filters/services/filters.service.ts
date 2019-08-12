import { Injectable, NgZone } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FiltersService {

	constructor() {}

	private _showArchivedProds$ = new Subject<undefined>();
	showArchivedProds$ = this._showArchivedProds$.asObservable();

	onShowArchivedProds() {
		console.log('service func called');
		this._showArchivedProds$.next();
	}
}
