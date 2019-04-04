import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class TemplateService {

	private _bottomReached$ = new Subject<any>();
	bottomReached$ = this._bottomReached$.asObservable();

	bottomReached() {
		this._bottomReached$.next();
	}
}
