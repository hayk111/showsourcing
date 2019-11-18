import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


// TODO: Thiery what is this ?
@Injectable({
	providedIn: 'root'
})
export class MenuService {
	private _collapsed$ = new BehaviorSubject<boolean>(false);
	collapsed$ = this._collapsed$.asObservable();

	collapseMenu() {
		this._collapsed$.next(true);
	}

	expandMenu() {
		this._collapsed$.next(false);
	}
}
