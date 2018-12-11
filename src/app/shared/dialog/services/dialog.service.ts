import { Injectable, NgModuleRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { CloseEvent, CloseEventType } from '../interfaces';

@Injectable({
	providedIn: 'root'
})
export class DialogService {
	private _toOpen$ = new Subject<{ component: any, moduleRef: NgModuleRef<any>, props: any }>();
	toOpen$ = this._toOpen$.asObservable();
	private _toClose$ = new Subject<CloseEvent>();
	toClose$ = this._toClose$.asObservable();

	/** opens a dialog, returns an observable that emits when it closes */
	open(component: new (...args: any[]) => any, props?: Object): Observable<CloseEvent> {
		this.openFromModule(component, null, props);
		return this.toClose$;
	}

	openFromModule(component: new (...args: any[]) => any, moduleRef?: NgModuleRef<any>, props?: Object) {
		this._toOpen$.next({ component, props, moduleRef });
	}

	close(event: CloseEvent = { type: CloseEventType.CANCEL }) {
		this._toClose$.next(event);
	}
}
