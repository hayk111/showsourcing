import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable()
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
