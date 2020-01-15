import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class PreviewService {

	private _selectedTab$ = new Subject<number>();
	selectedTab$ = this._selectedTab$.asObservable();

	constructor() { }

	onSelectedTab(number: number) {
		this._selectedTab$.next(number);
	}

}
