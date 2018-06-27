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
		this._toOpen$.next({ component, props });
	}

	close(component: new (...args: any[]) => any) {
		this._toClose$.next(name);
	}
}
