import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogName } from '~shared/dialog/models';


@Injectable({
	providedIn: 'root'
})
export class DialogService {
	private _toOpen$ = new Subject<{ component: any, props: any }>();
	toOpen$ = this._toOpen$.asObservable();
	private _toClose$ = new Subject<any>();
	toClose$ = this._toClose$.asObservable();

	open(component: any, props?: any) {
		this._toOpen$.next({ component, props });
	}

	close(component: any) {
		this._toClose$.next(name);
	}
}
