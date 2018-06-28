import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class DialogService {
	private _toOpen$ = new Subject<{ component: any, props: any }>();
	toOpen$ = this._toOpen$.asObservable();
	private _toClose$ = new Subject<any>();
	toClose$ = this._toClose$.asObservable();

	open(component: new (...args: any[]) => any, props?: Object) {
		console.log(component);
		console.log(props);
		this._toOpen$.next({ component, props });
	}

	close() {
		this._toClose$.next();
	}
}
