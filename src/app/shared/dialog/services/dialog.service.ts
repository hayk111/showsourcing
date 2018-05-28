import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DialogName } from '~shared/dialog/models';


@Injectable({
	providedIn: 'root'
})
export class DialogService {
	private _toOpen$ = new Subject<{ name: DialogName, props: any }>();
	toOpen$ = this._toOpen$.asObservable();
	private _toClose$ = new Subject<DialogName>();
	toClose$ = this._toClose$.asObservable();

	open(name: DialogName, props?: any) {
		this._toOpen$.next({ name, props });
	}

	close(name: DialogName) {
		this._toClose$.next(name);
	}
}
